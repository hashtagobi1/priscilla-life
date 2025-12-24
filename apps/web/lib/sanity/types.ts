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
export interface FoodMedia {
  _type?: string
  type: 'image' | 'video'
  image?: SanityImage
  videoUrl?: string
  caption?: string
}

export interface Food {
  _id: string
  title: string
  description?: string
  media?: FoodMedia[]
  eventType?: string
  date?: string
}

// Host Types
export interface Host {
  _id: string
  title: string
  description?: string
  videoUrl?: string
  isShowreel?: boolean
  eventDate?: string
  testimonial?: string
}

// Social Types
export interface SocialPost {
  image?: SanityImage
  caption?: string
  url?: string
}

export interface Achievement {
  _key: string
  _type: string
  value: string
}

export interface Social {
  _id: string
  platform: string
  handle?: string
  url?: string
  followers?: number
  achievements?: Achievement[]
  recentPosts?: SocialPost[]
}

// Global Types
export interface SocialLink {
  platform: string
  url: string
}

export interface BackgroundImage {
  _type?: string
  image: SanityImage
  layer: 'background' | 'foreground'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  opacity?: number
  size?: 'small' | 'medium' | 'large'
}

export interface BackgroundVideo {
  videoUrl: string
  posterImage?: SanityImage
  opacity?: number
}

export interface GlobalSettings {
  _id: string
  siteName?: string
  bio?: string
  backgroundVideo?: BackgroundVideo
  backgroundImages?: BackgroundImage[]
  socialLinks?: SocialLink[]
}

// Brand Types
export interface Brand {
  _id: string
  name: string
  logo: SanityImage
  url?: string
  order?: number
}


