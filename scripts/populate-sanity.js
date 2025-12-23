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
      const result = await client.create(music)
      console.log(`   ✅ Created: ${music.title}`)
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
      const result = await client.create(food)
      console.log(`   ✅ Created: ${food.title}`)
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
      const result = await client.create(host)
      console.log(`   ✅ Created: ${host.title}`)
    }

    // Social entries
    console.log('\n📱 Creating Social Media entries...')
    const socialEntries = [
      {
        _type: 'social',
        platform: 'Instagram',
        followers: 125000,
        achievements: [
          '100K followers milestone',
          'Featured in Instagram\'s "Creators to Watch"',
          'Top 10 Food Content Creator',
        ],
        recentPosts: [
          {
            caption: 'Behind the scenes at today\'s shoot! 🎬✨',
            url: 'https://instagram.com/p/example1',
          },
          {
            caption: 'New recipe coming soon! Can you guess what it is? 👨‍🍳',
            url: 'https://instagram.com/p/example2',
          },
        ],
      },
      {
        _type: 'social',
        platform: 'Twitter',
        followers: 45000,
        achievements: [
          'Verified account',
          'Top Food & Culture Influencer',
        ],
        recentPosts: [
          {
            caption: 'Excited to announce my new music project! 🎵',
            url: 'https://twitter.com/status/example1',
          },
        ],
      },
      {
        _type: 'social',
        platform: 'TikTok',
        followers: 280000,
        achievements: [
          '250K followers milestone',
          'Viral video: 2M+ views',
          'Featured on TikTok\'s Discover page',
        ],
        recentPosts: [
          {
            caption: 'Quick cooking tip that changed everything! 🔥',
            url: 'https://tiktok.com/@priscilla/video/example1',
          },
        ],
      },
    ]

    for (const social of socialEntries) {
      const result = await client.create(social)
      console.log(`   ✅ Created: ${social.platform}`)
    }

    // Global settings
    console.log('\n🌐 Creating Global Settings...')
    const globalSettings = {
      _type: 'global',
      siteName: 'Priscilla Dina Toko',
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/priscilladinatoko' },
        { platform: 'Twitter', url: 'https://twitter.com/priscilladinatoko' },
        { platform: 'TikTok', url: 'https://tiktok.com/@priscilladinatoko' },
        { platform: 'YouTube', url: 'https://youtube.com/@priscilladinatoko' },
        { platform: 'Spotify', url: 'https://open.spotify.com/artist/priscilladinatoko' },
      ],
    }

    await client.create(globalSettings)
    console.log('   ✅ Created: Global Settings')

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


