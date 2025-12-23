import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'kalx5g57',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to create a token in Sanity
  apiVersion: '2024-01-01',
})

async function populateSanity() {
  console.log('🎵 Populating Music...')
  
  // Music entries
  const musicEntries = [
    {
      _type: 'music',
      title: 'Midnight Dreams',
      artist: 'Priscilla Dina Toko',
      audioUrl: 'https://example.com/audio/midnight-dreams.mp3',
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
      audioUrl: 'https://example.com/audio/city-lights.mp3',
      streamingLinks: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/example2' },
        { platform: 'Apple Music', url: 'https://music.apple.com/track/example2' },
      ],
    },
    {
      _type: 'music',
      title: 'Soulful Journey',
      artist: 'Priscilla Dina Toko',
      audioUrl: 'https://example.com/audio/soulful-journey.mp3',
      streamingLinks: [
        { platform: 'Spotify', url: 'https://open.spotify.com/track/example3' },
        { platform: 'SoundCloud', url: 'https://soundcloud.com/priscilla/soulful-journey' },
      ],
    },
  ]

  console.log('🍽️ Populating Food Portfolio...')
  
  // Food entries
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

  console.log('🎤 Populating Hosting & Events...')
  
  // Host entries
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

  console.log('📱 Populating Social Media...')
  
  // Social entries
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

  console.log('🌐 Populating Global Settings...')
  
  // Global settings
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

  try {
    // Create all documents
    const allDocuments = [
      ...musicEntries,
      ...foodEntries,
      ...hostEntries,
      ...socialEntries,
      globalSettings,
    ]

    for (const doc of allDocuments) {
      await client.create(doc)
      console.log(`✅ Created ${doc._type}: ${doc.title || doc.platform || 'Global Settings'}`)
    }

    console.log('\n🎉 Successfully populated Sanity CMS with dummy data!')
    console.log(`📊 Created ${allDocuments.length} documents`)
  } catch (error: any) {
    console.error('❌ Error populating Sanity:', error.message)
    if (error.message.includes('token')) {
      console.error('\n💡 You need to create a Sanity API token with write access:')
      console.error('   1. Go to https://sanity.io/manage')
      console.error('   2. Select your project')
      console.error('   3. Go to API → Tokens')
      console.error('   4. Create a new token with Editor permissions')
      console.error('   5. Set it as SANITY_API_TOKEN in your .env file')
    }
    process.exit(1)
  }
}

populateSanity()

