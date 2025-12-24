/**
 * Helper script to upload placeholder images to Sanity
 * This creates image assets that can be referenced in the populate script
 * 
 * Usage: node upload-images.js
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

// Placeholder image URLs from Unsplash (food-related)
const imageUrls = {
  'image-wedding-1': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  'image-wedding-2': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  'image-wedding-3': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  'image-corporate-1': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'image-corporate-2': 'https://images.unsplash.com/photo-1556911220-bff31c812d0d?w=800&q=80',
  'image-private-1': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  'image-private-2': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'image-private-3': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
  'image-charity-1': 'https://images.unsplash.com/photo-1556911220-e15b29be8b8d?w=800&q=80',
  'image-charity-2': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  'image-bg-1': 'https://images.unsplash.com/photo-1556911220-bff31c812d0d?w=600&q=80',
  'image-bg-2': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  'image-bg-3': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80',
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
    
    console.log(`   ✅ Uploaded ${imageId} (${asset._id})`)
    return asset._id
  } catch (error) {
    console.error(`   ❌ Error uploading ${imageId}:`, error.message)
    return null
  }
}

async function uploadAllImages() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is required')
    process.exit(1)
  }

  console.log('🖼️  Starting to upload placeholder images...\n')

  const imageMap = {}

  for (const [imageId, imageUrl] of Object.entries(imageUrls)) {
    const assetId = await uploadImage(imageId, imageUrl)
    if (assetId) {
      imageMap[imageId] = assetId
    }
  }

  console.log('\n📝 Image Asset IDs:')
  console.log(JSON.stringify(imageMap, null, 2))
  console.log('\n💡 Copy these IDs and update the populate script with the actual asset IDs')
}

uploadAllImages()

