/**
 * Script to remove duplicate entries from Sanity CMS
 * 
 * Usage:
 * 1. Make sure SANITY_API_TOKEN is set in your .env file
 * 2. Run: node cleanup-duplicates.js
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

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

async function cleanupDuplicates() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is required')
    process.exit(1)
  }

  console.log('🧹 Starting cleanup of duplicate entries...\n')

  try {
    // Clean up Music duplicates
    console.log('🎵 Cleaning Music entries...')
    const musicEntries = await client.fetch(`*[_type == "music"] | order(_createdAt asc)`)
    const musicGroups = new Map()
    
    for (const entry of musicEntries) {
      const key = `${entry.title}-${entry.artist}`
      if (!musicGroups.has(key)) {
        musicGroups.set(key, [])
      }
      musicGroups.get(key).push(entry)
    }
    
    let musicDeleted = 0
    for (const [key, entries] of musicGroups) {
      if (entries.length > 1) {
        // Keep the first (oldest) entry, delete the rest
        for (let i = 1; i < entries.length; i++) {
          await client.delete(entries[i]._id)
          musicDeleted++
          console.log(`   🗑️  Deleted duplicate: ${entries[i].title}`)
        }
      }
    }
    console.log(`   ✅ Cleaned ${musicDeleted} duplicate music entries\n`)

    // Clean up Food duplicates
    console.log('🍽️ Cleaning Food entries...')
    const foodEntries = await client.fetch(`*[_type == "food"] | order(_createdAt asc)`)
    const foodGroups = new Map()
    
    for (const entry of foodEntries) {
      const key = `${entry.title}-${entry.eventType || ''}`
      if (!foodGroups.has(key)) {
        foodGroups.set(key, [])
      }
      foodGroups.get(key).push(entry)
    }
    
    let foodDeleted = 0
    for (const [key, entries] of foodGroups) {
      if (entries.length > 1) {
        for (let i = 1; i < entries.length; i++) {
          await client.delete(entries[i]._id)
          foodDeleted++
          console.log(`   🗑️  Deleted duplicate: ${entries[i].title}`)
        }
      }
    }
    console.log(`   ✅ Cleaned ${foodDeleted} duplicate food entries\n`)

    // Clean up Host duplicates
    console.log('🎤 Cleaning Host entries...')
    const hostEntries = await client.fetch(`*[_type == "host"] | order(_createdAt asc)`)
    const hostGroups = new Map()
    
    for (const entry of hostEntries) {
      const key = `${entry.title}-${entry.eventDate || ''}`
      if (!hostGroups.has(key)) {
        hostGroups.set(key, [])
      }
      hostGroups.get(key).push(entry)
    }
    
    let hostDeleted = 0
    for (const [key, entries] of hostGroups) {
      if (entries.length > 1) {
        for (let i = 1; i < entries.length; i++) {
          await client.delete(entries[i]._id)
          hostDeleted++
          console.log(`   🗑️  Deleted duplicate: ${entries[i].title}`)
        }
      }
    }
    console.log(`   ✅ Cleaned ${hostDeleted} duplicate host entries\n`)

    // Clean up Social duplicates (keep one per platform)
    console.log('📱 Cleaning Social entries...')
    const socialEntries = await client.fetch(`*[_type == "social"] | order(_createdAt asc)`)
    const socialGroups = new Map()
    
    for (const entry of socialEntries) {
      const key = entry.platform
      if (!socialGroups.has(key)) {
        socialGroups.set(key, [])
      }
      socialGroups.get(key).push(entry)
    }
    
    let socialDeleted = 0
    for (const [platform, entries] of socialGroups) {
      if (entries.length > 1) {
        // Keep the one with the most data (most fields filled)
        const sorted = entries.sort((a, b) => {
          const aFields = Object.keys(a).filter(k => a[k] !== null && a[k] !== undefined && a[k] !== '').length
          const bFields = Object.keys(b).filter(k => b[k] !== null && b[k] !== undefined && b[k] !== '').length
          return bFields - aFields
        })
        
        // Delete all except the best one
        for (let i = 1; i < sorted.length; i++) {
          await client.delete(sorted[i]._id)
          socialDeleted++
          console.log(`   🗑️  Deleted duplicate: ${sorted[i].platform}`)
        }
      }
    }
    console.log(`   ✅ Cleaned ${socialDeleted} duplicate social entries\n`)

    // Clean up Global Settings (should only be one)
    console.log('🌐 Cleaning Global Settings...')
    const globalEntries = await client.fetch(`*[_type == "global"] | order(_createdAt asc)`)
    
    let globalDeleted = 0
    if (globalEntries.length > 1) {
      // Keep the first one, delete the rest
      for (let i = 1; i < globalEntries.length; i++) {
        await client.delete(globalEntries[i]._id)
        globalDeleted++
        console.log(`   🗑️  Deleted duplicate global settings`)
      }
    }
    console.log(`   ✅ Cleaned ${globalDeleted} duplicate global settings\n`)

    const totalDeleted = musicDeleted + foodDeleted + hostDeleted + socialDeleted + globalDeleted
    console.log(`🎉 Cleanup complete!`)
    console.log(`📊 Total duplicates removed: ${totalDeleted}`)
    console.log(`   - Music: ${musicDeleted}`)
    console.log(`   - Food: ${foodDeleted}`)
    console.log(`   - Host: ${hostDeleted}`)
    console.log(`   - Social: ${socialDeleted}`)
    console.log(`   - Global: ${globalDeleted}`)
  } catch (error) {
    console.error('\n❌ Error cleaning up duplicates:', error.message)
    process.exit(1)
  }
}

cleanupDuplicates()

