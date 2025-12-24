/**
 * Script to populate Sanity CMS with dummy data for Priscilla Dina Toko
 * 
 * Usage:
 * 1. Create a Sanity API token with Editor permissions at https://sanity.io/manage
 * 2. Set SANITY_API_TOKEN in your .env file (root or apps/studio/.env)
 * 3. Run: pnpm populate
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load env vars from root or studio directory
dotenv.config({ path: resolve(__dirname, '../apps/studio/.env.local') })
dotenv.config({ path: resolve(__dirname, '../apps/studio/.env') })
dotenv.config({ path: resolve(__dirname, '../.env') })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kalx5g57',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

// Function to fetch follower count from Instagram
async function fetchInstagramFollowers(username) {
  try {
    // Remove @ if present
    const cleanUsername = username.replace('@', '')
    const url = `https://www.instagram.com/${cleanUsername}/`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) {
      console.log(`   ⚠️  Could not fetch Instagram data (status: ${response.status})`)
      return null
    }
    
    const html = await response.text()
    
    // Try to extract follower count from JSON-LD or meta tags
    // Instagram embeds data in script tags
    const jsonMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[1])
        if (data.mainEntityOfPage && data.mainEntityOfPage.interactionStatistic) {
          const followers = data.mainEntityOfPage.interactionStatistic.find(
            stat => stat.interactionType === 'https://schema.org/FollowAction'
          )
          if (followers && followers.userInteractionCount) {
            return parseInt(followers.userInteractionCount)
          }
        }
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Alternative: Look for follower count in meta tags or embedded JSON
    const followerMatch = html.match(/"edge_followed_by":\s*{\s*"count":\s*(\d+)/)
    if (followerMatch) {
      return parseInt(followerMatch[1])
    }
    
    // Another pattern Instagram uses
    const patternMatch = html.match(/"followers":\s*(\d+)/)
    if (patternMatch) {
      return parseInt(patternMatch[1])
    }
    
    return null
  } catch (error) {
    console.log(`   ⚠️  Error fetching Instagram followers: ${error.message}`)
    return null
  }
}

// Function to fetch follower count from TikTok
async function fetchTikTokFollowers(username) {
  try {
    // Remove @ if present
    const cleanUsername = username.replace('@', '')
    const url = `https://www.tiktok.com/@${cleanUsername}`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) {
      console.log(`   ⚠️  Could not fetch TikTok data (status: ${response.status})`)
      return null
    }
    
    const html = await response.text()
    
    // TikTok embeds data in script tags with __UNIVERSAL_DATA_FOR_REHYDRATION__
    const dataMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/s)
    if (dataMatch) {
      try {
        const data = JSON.parse(dataMatch[1])
        // Navigate through TikTok's data structure
        const userInfo = data?.__DEFAULT_SCOPE__?.['webapp.user-detail']?.userInfo
        if (userInfo?.stats?.followerCount) {
          return parseInt(userInfo.stats.followerCount)
        }
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Alternative pattern
    const followerMatch = html.match(/"followerCount":\s*(\d+)/)
    if (followerMatch) {
      return parseInt(followerMatch[1])
    }
    
    return null
  } catch (error) {
    console.log(`   ⚠️  Error fetching TikTok followers: ${error.message}`)
    return null
  }
}

async function populateSanity() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is required')
    console.error('\n💡 Create a token:')
    console.error('   1. Go to https://sanity.io/manage')
    console.error('   2. Select your project')
    console.error('   3. Go to API → Tokens')
    console.error('   4. Create token with Editor permissions')
    console.error('   5. Add to .env: SANITY_API_TOKEN=your_token')
    process.exit(1)
  }

  console.log('🚀 Starting to populate Sanity CMS...\n')

  try {
    // Music entries
    console.log('🎵 Creating Music entries...')
    const musicEntries = [
      {
        _type: 'music',
        title: 'Midnight Dreams',
        artist: 'Priscilla Dina Toko',
        streamingLinks: [
          { platform: 'Spotify', url: 'https://open.spotify.com/track/example1' },
          { platform: 'Apple Music', url: 'https://music.apple.com/track/example1' },
          { platform: 'YouTube', url: 'https://youtube.com/watch?v=example1' },
        ],
      },
      {
        _type: 'music',
        title: 'City Lights',
        artist: 'Priscilla Dina Toko',
        streamingLinks: [
          { platform: 'Spotify', url: 'https://open.spotify.com/track/example2' },
          { platform: 'Apple Music', url: 'https://music.apple.com/track/example2' },
        ],
      },
      {
        _type: 'music',
        title: 'Soulful Journey',
        artist: 'Priscilla Dina Toko',
        streamingLinks: [
          { platform: 'Spotify', url: 'https://open.spotify.com/track/example3' },
          { platform: 'SoundCloud', url: 'https://soundcloud.com/priscilla/soulful-journey' },
        ],
      },
    ]

    for (const music of musicEntries) {
      // Check if entry already exists
      const existing = await client.fetch(
        `*[_type == "music" && title == $title && artist == $artist][0]`,
        { title: music.title, artist: music.artist }
      )
      
      if (existing) {
        await client
          .patch(existing._id)
          .set(music)
          .commit()
        console.log(`   ✅ Updated: ${music.title}`)
      } else {
        const result = await client.create(music)
        console.log(`   ✅ Created: ${music.title}`)
      }
    }

    // Food entries
    console.log('\n🍽️ Creating Food Portfolio entries...')
    const foodEntries = [
      {
        _type: 'food',
        title: 'Elegant Wedding Catering',
        description: 'A beautiful spread for a 200-guest wedding featuring modern fusion cuisine with African and European influences.',
        eventType: 'Wedding',
        date: '2024-11-15',
      },
      {
        _type: 'food',
        title: 'Corporate Event Menu',
        description: 'Sophisticated canapés and plated dinner service for a tech company launch event.',
        eventType: 'Corporate',
        date: '2024-10-20',
      },
      {
        _type: 'food',
        title: 'Private Chef Experience',
        description: 'Intimate 8-course tasting menu for a private dinner party, showcasing seasonal ingredients.',
        eventType: 'Private',
        date: '2024-12-05',
      },
      {
        _type: 'food',
        title: 'Charity Gala Dinner',
        description: 'Multi-course fine dining experience for 150 guests at an annual charity fundraising event.',
        eventType: 'Charity',
        date: '2024-09-30',
      },
    ]

    for (const food of foodEntries) {
      // Check if entry already exists
      const existing = await client.fetch(
        `*[_type == "food" && title == $title && eventType == $eventType][0]`,
        { title: food.title, eventType: food.eventType || '' }
      )
      
      if (existing) {
        await client
          .patch(existing._id)
          .set(food)
          .commit()
        console.log(`   ✅ Updated: ${food.title}`)
      } else {
        const result = await client.create(food)
        console.log(`   ✅ Created: ${food.title}`)
      }
    }

    // Host entries
    console.log('\n🎤 Creating Hosting & Events entries...')
    const hostEntries = [
      {
        _type: 'host',
        title: 'Awards Ceremony Host',
        description: 'Hosted the prestigious Annual Arts & Culture Awards, engaging with nominees and keeping the audience entertained throughout the evening.',
        videoUrl: 'https://youtube.com/watch?v=host-example1',
        eventDate: '2024-11-10',
        testimonial: 'Priscilla brought incredible energy and professionalism to our event. Her natural charisma and ability to connect with the audience made the evening unforgettable. - Event Organizer',
      },
      {
        _type: 'host',
        title: 'TV Show Presenter',
        description: 'Regular presenter on a lifestyle and culture show, covering food, travel, and entertainment segments.',
        videoUrl: 'https://youtube.com/watch?v=host-example2',
        eventDate: '2024-10-01',
        testimonial: 'Priscilla is a natural on camera. Her warmth and expertise shine through in every segment. - Production Director',
      },
      {
        _type: 'host',
        title: 'Conference Keynote Moderator',
        description: 'Moderated panel discussions at a major business conference, facilitating conversations between industry leaders.',
        videoUrl: 'https://youtube.com/watch?v=host-example3',
        eventDate: '2024-09-15',
        testimonial: 'Professional, engaging, and insightful. Priscilla elevated our panel discussions with her thoughtful questions and smooth facilitation. - Conference Director',
      },
    ]

    for (const host of hostEntries) {
      // Check if entry already exists
      const existing = await client.fetch(
        `*[_type == "host" && title == $title && eventDate == $eventDate][0]`,
        { title: host.title, eventDate: host.eventDate || '' }
      )
      
      if (existing) {
        await client
          .patch(existing._id)
          .set(host)
          .commit()
        console.log(`   ✅ Updated: ${host.title}`)
      } else {
        const result = await client.create(host)
        console.log(`   ✅ Created: ${host.title}`)
      }
    }

    // Social entries
    console.log('\n📱 Creating Social Media entries...')
    console.log('   Fetching follower counts...')
    
    const instagramHandle = '@priscilladinatoko'
    const tiktokHandle = '@priscilladinatoko'
    
    console.log(`   📸 Fetching Instagram followers for ${instagramHandle}...`)
    const instagramFollowers = await fetchInstagramFollowers(instagramHandle)
    
    console.log(`   🎵 Fetching TikTok followers for ${tiktokHandle}...`)
    const tiktokFollowers = await fetchTikTokFollowers(tiktokHandle)
    
    const socialEntries = [
      {
        _type: 'social',
        platform: 'Instagram',
        handle: instagramHandle,
        url: 'https://instagram.com/priscilladinatoko',
        followers: instagramFollowers || 0,
        achievements: [
          '100K+ followers milestone',
          'Featured in Instagram\'s "Creators to Watch"',
          'Top Food & Lifestyle Content Creator',
          'Verified Creator Account',
          'Collaborated with major brands',
        ],
        recentPosts: [
          {
            caption: 'Behind the scenes at today\'s cooking shoot! 🎬✨ Can\'t wait to share this new recipe with you all. What dish should I make next? 👨‍🍳',
            url: 'https://instagram.com/p/recent1',
          },
          {
            caption: 'New music project coming soon! 🎵 Working on something special that combines my love for food, music, and storytelling. Stay tuned! ✨',
            url: 'https://instagram.com/p/recent2',
          },
          {
            caption: 'Hosted an amazing event last night! The energy was incredible. Grateful for every opportunity to connect with amazing people. 🙏✨',
            url: 'https://instagram.com/p/recent3',
          },
          {
            caption: 'Quick cooking tip that changed everything! 🔥 Sometimes the simplest techniques make the biggest difference. Try this at home!',
            url: 'https://instagram.com/p/recent4',
          },
          {
            caption: 'From the kitchen to the stage - this is my journey. Food, music, hosting, and everything in between. What inspires you? 💫',
            url: 'https://instagram.com/p/recent5',
          },
        ],
      },
      {
        _type: 'social',
        platform: 'TikTok',
        handle: tiktokHandle,
        url: 'https://tiktok.com/@priscilladinatoko',
        followers: tiktokFollowers || 0,
        achievements: [
          '100K+ followers milestone',
          'Viral video: 2M+ views',
          'Featured on TikTok\'s Discover page',
          'Top Food & Culture Creator',
          'Trending multiple times',
        ],
        recentPosts: [
          {
            caption: 'Quick cooking tip that changed everything! 🔥 #cookingtips #chef #foodtok',
            url: 'https://tiktok.com/@priscilladinatoko/video/recent1',
          },
          {
            caption: 'POV: You\'re a multi-talented creator trying to explain what you do 😅 #multitalented #creator #food #music #host',
            url: 'https://tiktok.com/@priscilladinatoko/video/recent2',
          },
          {
            caption: 'Behind the scenes of hosting an event! The prep work is REAL 🎤✨ #hosting #events #behindthescenes',
            url: 'https://tiktok.com/@priscilladinatoko/video/recent3',
          },
          {
            caption: 'New recipe alert! This one is going to blow your mind 🍽️✨ #recipe #cooking #foodie',
            url: 'https://tiktok.com/@priscilladinatoko/video/recent4',
          },
          {
            caption: 'When someone asks what I do for a living... 😂 #multihyphenate #creator #food #music',
            url: 'https://tiktok.com/@priscilladinatoko/video/recent5',
          },
        ],
      },
    ]

    for (const social of socialEntries) {
      // Check if entry already exists
      const existing = await client.fetch(
        `*[_type == "social" && platform == $platform][0]`,
        { platform: social.platform }
      )
      
      if (existing) {
        // Update existing entry, preserving follower count if it was manually set
        const updateData = {
          ...social,
          followers: existing.followers || social.followers || 0, // Keep existing follower count if set
        }
        await client
          .patch(existing._id)
          .set(updateData)
          .commit()
        const followerText = updateData.followers > 0 
          ? ` (${updateData.followers.toLocaleString()} followers)`
          : ' (count unavailable - update manually)'
        console.log(`   ✅ Updated: ${social.platform}${followerText}`)
      } else {
        // Create new entry
        const result = await client.create(social)
        const followerText = social.followers > 0 
          ? ` (${social.followers.toLocaleString()} followers)`
          : ' (count unavailable - update manually)'
        console.log(`   ✅ Created: ${social.platform}${followerText}`)
      }
    }

    // Global settings
    console.log('\n🌐 Creating/Updating Global Settings...')
    const globalSettings = {
      _type: 'global',
      siteName: 'Priscilla Dina Toko',
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/priscilladinatoko' },
        { platform: 'TikTok', url: 'https://tiktok.com/@priscilladinatoko' },
      ],
    }

    const existingGlobal = await client.fetch(`*[_type == "global"][0]`)
    
    if (existingGlobal) {
      await client
        .patch(existingGlobal._id)
        .set(globalSettings)
        .commit()
      console.log('   ✅ Updated: Global Settings')
    } else {
      await client.create(globalSettings)
      console.log('   ✅ Created: Global Settings')
    }

    console.log('\n🎉 Successfully populated Sanity CMS!')
    console.log(`📊 Created ${musicEntries.length + foodEntries.length + hostEntries.length + socialEntries.length + 1} documents`)
    console.log('\n💡 You can now view the data in Sanity Studio: pnpm studio')
  } catch (error) {
    console.error('\n❌ Error populating Sanity:', error.message)
    if (error.message.includes('token') || error.message.includes('unauthorized')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has Editor permissions')
    }
    process.exit(1)
  }
}

populateSanity()


