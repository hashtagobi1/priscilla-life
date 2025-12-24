/**
 * Combined script to upload images and populate Sanity CMS
 * This uploads placeholder images first, then creates entries with those images
 * 
 * Usage: pnpm populate-with-images
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load env vars
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

// Placeholder image URLs from Unsplash
const imageUrls = {
  'wedding-1': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  'wedding-2': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  'wedding-3': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  'corporate-1': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'corporate-2': 'https://images.unsplash.com/photo-1556911220-bff31c812d0d?w=800&q=80',
  'private-1': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  'private-2': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'private-3': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
  'charity-1': 'https://images.unsplash.com/photo-1556911220-e15b29be8b8d?w=800&q=80',
  'charity-2': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  'bg-1': 'https://images.unsplash.com/photo-1556911220-bff31c812d0d?w=600&q=80',
  'bg-2': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  'bg-3': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80',
  // Brand logos - using placeholder logo images
  'brand-1': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80',
  'brand-2': 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80',
  'brand-3': 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&q=80',
  'brand-4': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80',
  'brand-5': 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80',
  'brand-6': 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&q=80',
}

async function uploadImage(imageId, imageUrl) {
  try {
    console.log(`   📤 Uploading ${imageId}...`)
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const asset = await client.assets.upload('image', buffer, {
      filename: `${imageId}.jpg`,
    })
    
    console.log(`   ✅ Uploaded ${imageId}`)
    return asset._id
  } catch (error) {
    console.error(`   ❌ Error uploading ${imageId}:`, error.message)
    return null
  }
}

async function populateWithImages() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is required')
    process.exit(1)
  }

  console.log('🚀 Starting to upload images and populate Sanity CMS...\n')

  try {
    // Step 1: Upload all images
    console.log('🖼️  Step 1: Uploading placeholder images...\n')
    const imageMap = {}

    for (const [imageId, imageUrl] of Object.entries(imageUrls)) {
      const assetId = await uploadImage(imageId, imageUrl)
      if (assetId) {
        imageMap[imageId] = assetId
      }
    }

    console.log(`\n✅ Uploaded ${Object.keys(imageMap).length} images\n`)

    // Step 2: Create food entries with images
    console.log('🍽️  Step 2: Creating Food Portfolio entries with images...\n')
    
    const foodEntries = [
      {
        _type: 'food',
        title: 'Elegant Wedding Catering',
        description: 'A beautiful spread for a 200-guest wedding featuring modern fusion cuisine with African and European influences.',
        eventType: 'Wedding',
        date: '2024-11-15',
        media: [
          ...(imageMap['wedding-1'] ? [{
            _key: 'wedding-1',
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['wedding-1'] },
            },
            caption: 'Elegant wedding table setting',
          }] : []),
          ...(imageMap['wedding-2'] ? [{
            _key: 'wedding-2',
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['wedding-2'] },
            },
            caption: 'Fusion cuisine platter',
          }] : []),
          ...(imageMap['wedding-3'] ? [{
            _key: 'wedding-3',
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['wedding-3'] },
            },
            caption: 'Dessert display',
          }] : []),
        ],
      },
      {
        _type: 'food',
        title: 'Corporate Event Menu',
        description: 'Sophisticated canapés and plated dinner service for a tech company launch event.',
        eventType: 'Corporate',
        date: '2024-10-20',
        media: [
          ...(imageMap['corporate-1'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['corporate-1'] },
            },
            caption: 'Canapé selection',
          }] : []),
          ...(imageMap['corporate-2'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['corporate-2'] },
            },
            caption: 'Plated dinner service',
          }] : []),
        ],
      },
      {
        _type: 'food',
        title: 'Private Chef Experience',
        description: 'Intimate 8-course tasting menu for a private dinner party, showcasing seasonal ingredients.',
        eventType: 'Private',
        date: '2024-12-05',
        media: [
          ...(imageMap['private-1'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['private-1'] },
            },
            caption: 'Tasting menu course',
          }] : []),
          ...(imageMap['private-2'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['private-2'] },
            },
            caption: 'Seasonal ingredients',
          }] : []),
          ...(imageMap['private-3'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['private-3'] },
            },
            caption: 'Chef presentation',
          }] : []),
        ],
      },
      {
        _type: 'food',
        title: 'Charity Gala Dinner',
        description: 'Multi-course fine dining experience for 150 guests at an annual charity fundraising event.',
        eventType: 'Charity',
        date: '2024-09-30',
        media: [
          ...(imageMap['charity-1'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['charity-1'] },
            },
            caption: 'Gala dinner setup',
          }] : []),
          ...(imageMap['charity-2'] ? [{
            _type: 'object',
            type: 'image',
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageMap['charity-2'] },
            },
            caption: 'Fine dining presentation',
          }] : []),
        ],
      },
    ]

    for (const food of foodEntries) {
      const existing = await client.fetch(
        `*[_type == "food" && title == $title && eventType == $eventType][0]`,
        { title: food.title, eventType: food.eventType || '' }
      )
      
      if (existing) {
        await client.patch(existing._id).set(food).commit()
        console.log(`   ✅ Updated: ${food.title}`)
      } else {
        await client.create(food)
        console.log(`   ✅ Created: ${food.title}`)
      }
    }

    // Step 3: Create brand entries with logos
    console.log('\n🏢 Step 3: Creating Brand entries with logos...\n')
    
    const brandEntries = [
      {
        _type: 'brand',
        name: 'Netflix',
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageMap['brand-1'] },
        },
        url: 'https://netflix.com',
        order: 1,
      },
      {
        _type: 'brand',
        name: 'Spotify',
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageMap['brand-2'] },
        },
        url: 'https://spotify.com',
        order: 2,
      },
      {
        _type: 'brand',
        name: 'BBC',
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageMap['brand-3'] },
        },
        url: 'https://bbc.com',
        order: 3,
      },
      {
        _type: 'brand',
        name: 'Amazon',
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageMap['brand-4'] },
        },
        url: 'https://amazon.com',
        order: 4,
      },
      {
        _type: 'brand',
        name: 'Google',
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageMap['brand-5'] },
        },
        url: 'https://google.com',
        order: 5,
      },
      {
        _type: 'brand',
        name: 'Apple',
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageMap['brand-6'] },
        },
        url: 'https://apple.com',
        order: 6,
      },
    ]

    for (const brand of brandEntries) {
      // Only create if logo was uploaded successfully
      if (!imageMap[brand.name.toLowerCase().replace(' ', '-')] && !imageMap[`brand-${brand.order}`]) {
        // Try to find the uploaded brand logo
        const brandKey = Object.keys(imageMap).find(key => key.startsWith('brand-'))
        if (!brandKey) {
          console.log(`   ⚠️  Skipping ${brand.name} - logo not uploaded`)
          continue
        }
      }
      
      const existing = await client.fetch(
        `*[_type == "brand" && name == $name][0]`,
        { name: brand.name }
      )
      
      // Only use uploaded logo if available
      const logoRef = imageMap[`brand-${brand.order}`] || imageMap[`brand-1`]
      if (!logoRef) {
        console.log(`   ⚠️  Skipping ${brand.name} - no logo available`)
        continue
      }
      
      const brandData = {
        ...brand,
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: logoRef },
        },
      }
      
      if (existing) {
        await client.patch(existing._id).set(brandData).commit()
        console.log(`   ✅ Updated: ${brand.name}`)
      } else {
        await client.create(brandData)
        console.log(`   ✅ Created: ${brand.name}`)
      }
    }

    // Step 4: Update global settings with background images
    console.log('\n🌐 Step 4: Updating Global Settings with background images...\n')
    
    const existingGlobal = await client.fetch(`*[_type == "global"][0]`)
    const globalSettings = {
      _type: 'global',
      siteName: 'Priscilla Dina Toko',
      backgroundImages: [
        {
          _key: 'bg-1',
          _type: 'object',
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageMap['bg-1'] },
          },
          layer: 'background',
          position: 'top-left',
          opacity: 15,
          size: 'medium',
        },
        {
          _key: 'bg-2',
          _type: 'object',
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageMap['bg-2'] },
          },
          layer: 'background',
          position: 'bottom-right',
          opacity: 20,
          size: 'large',
        },
        {
          _key: 'bg-3',
          _type: 'object',
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageMap['bg-3'] },
          },
          layer: 'foreground',
          position: 'center',
          opacity: 10,
          size: 'small',
        },
      ],
      socialLinks: [
        { _key: 'instagram', platform: 'Instagram', url: 'https://instagram.com/priscilladinatoko' },
        { _key: 'tiktok', platform: 'TikTok', url: 'https://tiktok.com/@priscilladinatoko' },
      ],
    }

    if (existingGlobal) {
      await client.patch(existingGlobal._id).set(globalSettings).commit()
      console.log('   ✅ Updated: Global Settings')
    } else {
      await client.create(globalSettings)
      console.log('   ✅ Created: Global Settings')
    }

    console.log('\n🎉 Successfully populated Sanity CMS with images!')
    console.log(`📊 Created ${foodEntries.length} food entries with images`)
    console.log(`📊 Created ${brandEntries.length} brand entries with logos`)
    console.log('💡 Background images added to Global Settings')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

populateWithImages()

