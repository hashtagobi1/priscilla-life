import { createClient } from '@sanity/client'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env') })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kalx5g57',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

async function fixMissingKeys() {
  console.log('🔧 Fixing missing _key properties in Sanity CMS...\n')

  try {
    // Get global settings
    const global = await client.fetch(`*[_type == "global"][0]`)
    
    if (global) {
      console.log('📝 Fixing Global Settings...')
      
      const updates = {}
      
      // Fix backgroundImages
      if (global.backgroundImages && Array.isArray(global.backgroundImages)) {
        updates.backgroundImages = global.backgroundImages.map((item, index) => ({
          ...item,
          _key: item._key || `bg-${index + 1}`,
        }))
        console.log(`   ✅ Fixed ${updates.backgroundImages.length} background images`)
      }
      
      // Fix socialLinks
      if (global.socialLinks && Array.isArray(global.socialLinks)) {
        updates.socialLinks = global.socialLinks.map((item, index) => ({
          ...item,
          _key: item._key || (item.platform === 'Instagram' ? 'instagram' : item.platform === 'TikTok' ? 'tiktok' : `social-${index + 1}`),
        }))
        console.log(`   ✅ Fixed ${updates.socialLinks.length} social links`)
      }
      
      if (Object.keys(updates).length > 0) {
        await client.patch(global._id).set(updates).commit()
        console.log('   ✅ Updated Global Settings with keys\n')
      }
    }

    // Fix social entries
    const socialEntries = await client.fetch(`*[_type == "social"]`)
    
    for (const social of socialEntries) {
      console.log(`📝 Fixing ${social.platform}...`)
      const updates = {}
      
      // Fix achievements - check if they're strings or objects
      if (social.achievements && Array.isArray(social.achievements)) {
        // Check if first item is a string (needs conversion) or already an object
        if (social.achievements.length > 0 && typeof social.achievements[0] === 'string') {
          // Convert string array to object array with _key
          updates.achievements = social.achievements.map((achievement, index) => ({
            _key: `achievement-${index + 1}`,
            _type: 'string',
            value: achievement,
          }))
          console.log(`   ✅ Fixed ${updates.achievements.length} achievements (converted from strings)`)
        } else {
          // Already objects, just ensure they have _key
          updates.achievements = social.achievements.map((achievement, index) => ({
            ...achievement,
            _key: achievement._key || `achievement-${index + 1}`,
          }))
          console.log(`   ✅ Fixed ${updates.achievements.length} achievements (added keys)`)
        }
      }
      
      // Fix recentPosts
      if (social.recentPosts && Array.isArray(social.recentPosts)) {
        updates.recentPosts = social.recentPosts.map((post, index) => ({
          ...post,
          _key: post._key || `post-${index + 1}`,
        }))
        console.log(`   ✅ Fixed ${updates.recentPosts.length} recent posts`)
      }
      
      if (Object.keys(updates).length > 0) {
        await client.patch(social._id).set(updates).commit()
        console.log(`   ✅ Updated ${social.platform}\n`)
      }
    }

    // Fix food entries
    const foodEntries = await client.fetch(`*[_type == "food"]`)
    
    for (const food of foodEntries) {
      if (food.media && Array.isArray(food.media)) {
        console.log(`📝 Fixing ${food.title} media...`)
        const updates = {
          media: food.media.map((item, index) => ({
            ...item,
            _key: item._key || `media-${index + 1}`,
          })),
        }
        await client.patch(food._id).set(updates).commit()
        console.log(`   ✅ Fixed ${updates.media.length} media items\n`)
      }
    }

    // Fix music entries
    const musicEntries = await client.fetch(`*[_type == "music"]`)
    
    for (const music of musicEntries) {
      if (music.streamingLinks && Array.isArray(music.streamingLinks)) {
        console.log(`📝 Fixing ${music.title} streaming links...`)
        const updates = {
          streamingLinks: music.streamingLinks.map((link, index) => ({
            ...link,
            _key: link._key || `link-${index + 1}`,
          })),
        }
        await client.patch(music._id).set(updates).commit()
        console.log(`   ✅ Fixed ${updates.streamingLinks.length} streaming links\n`)
      }
    }

    // Fix host entries - check for any arrays (media, images, videos, etc.)
    const hostEntries = await client.fetch(`*[_type == "host"]`)
    
    for (const host of hostEntries) {
      const updates = {}
      
      // Check for media array (Images & Videos)
      if (host.media && Array.isArray(host.media)) {
        updates.media = host.media.map((item, index) => ({
          ...item,
          _key: item._key || `media-${index + 1}`,
        }))
        console.log(`📝 Fixing ${host.title} media...`)
        console.log(`   ✅ Fixed ${updates.media.length} media items\n`)
      }
      
      // Check for images array
      if (host.images && Array.isArray(host.images)) {
        updates.images = host.images.map((item, index) => ({
          ...item,
          _key: item._key || `image-${index + 1}`,
        }))
        console.log(`📝 Fixing ${host.title} images...`)
        console.log(`   ✅ Fixed ${updates.images.length} images\n`)
      }
      
      // Check for videos array
      if (host.videos && Array.isArray(host.videos)) {
        updates.videos = host.videos.map((item, index) => ({
          ...item,
          _key: item._key || `video-${index + 1}`,
        }))
        console.log(`📝 Fixing ${host.title} videos...`)
        console.log(`   ✅ Fixed ${updates.videos.length} videos\n`)
      }
      
      if (Object.keys(updates).length > 0) {
        await client.patch(host._id).set(updates).commit()
        console.log(`   ✅ Updated ${host.title}\n`)
      }
    }

    console.log('🎉 Successfully fixed all missing keys!')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

fixMissingKeys()

