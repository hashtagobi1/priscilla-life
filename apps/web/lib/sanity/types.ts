// Sanity Image type
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

// Music Types
export interface StreamingLink {
  platform: string
  url: string
}

export interface Music {
  _id: string
  title: string
  artist: string
  coverImage?: SanityImage
  audioUrl?: string
  streamingLinks?: StreamingLink[]
}

// Food Types
export interface Food {
  _id: string
  title: string
  description?: string
  images?: SanityImage[]
  eventType?: string
  date?: string
}

// Host Types
export interface Host {
  _id: string
  title: string
  description?: string
  videoUrl?: string
  eventDate?: string
  testimonial?: string
}

// Social Types
export interface SocialPost {
  image?: SanityImage
  caption?: string
  url?: string
}

export interface Social {
  _id: string
  platform: string
  followers?: number
  achievements?: string[]
  recentPosts?: SocialPost[]
}

// Global Types
export interface SocialLink {
  platform: string
  url: string
}

export interface GlobalSettings {
  _id: string
  siteName?: string
  socialLinks?: SocialLink[]
}

