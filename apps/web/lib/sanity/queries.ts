import { sanityClient, imageUrlBuilder } from '../sanity'

// Helper to get image URL
export const urlFor = (source: any) => {
  if (!source || !imageUrlBuilder) return null
  // Check if source has a valid asset reference
  if (source.asset && (!source.asset._ref || source.asset._ref === '')) {
    return null
  }
  try {
    return imageUrlBuilder.image(source).url()
  } catch (error) {
    console.warn('Error generating image URL:', error)
    return null
  }
}

// Music Queries
export const musicQueries = {
  getAll: `*[_type == "music"] | order(_createdAt desc) {
    _id,
    title,
    artist,
    coverImage,
    audioUrl,
    streamingLinks[] {
      platform,
      url
    }
  }`,
  
  getById: `*[_type == "music" && _id == $id][0] {
    _id,
    title,
    artist,
    coverImage,
    audioUrl,
    streamingLinks[] {
      platform,
      url
    }
  }`,
}

// Food Queries
export const foodQueries = {
  getAll: `*[_type == "food"] | order(date desc) {
    _id,
    title,
    description,
    media[] {
      _type,
      type,
      image,
      videoUrl,
      caption
    },
    eventType,
    date
  }`,
  
  getById: `*[_type == "food" && _id == $id][0] {
    _id,
    title,
    description,
    media[] {
      _type,
      type,
      image,
      videoUrl,
      caption
    },
    eventType,
    date
  }`,
  
  getByEventType: `*[_type == "food" && eventType == $eventType] | order(date desc) {
    _id,
    title,
    description,
    media[] {
      _type,
      type,
      image,
      videoUrl,
      caption
    },
    eventType,
    date
  }`,
}

// Host Queries
export const hostQueries = {
  getAll: `*[_type == "host"] | order(eventDate desc) {
    _id,
    title,
    description,
    videoUrl,
    eventDate,
    testimonial
  }`,
  
  getById: `*[_type == "host" && _id == $id][0] {
    _id,
    title,
    description,
    videoUrl,
    eventDate,
    testimonial
  }`,
  
  getShowreel: `*[_type == "host" && isShowreel == true][0] {
    _id,
    title,
    description,
    videoUrl,
    isShowreel,
    eventDate,
    testimonial
  }`,
}

// Social Queries
export const socialQueries = {
  getAll: `*[_type == "social"] | order(_createdAt desc) {
    _id,
    platform,
    handle,
    url,
    followers,
    achievements[] {
      _key,
      _type,
      value
    },
    recentPosts[] {
      _key,
      image,
      caption,
      url
    }
  }`,
  
  getByPlatform: `*[_type == "social" && platform == $platform][0] {
    _id,
    platform,
    handle,
    url,
    followers,
    achievements[] {
      _key,
      _type,
      value
    },
    recentPosts[] {
      _key,
      image,
      caption,
      url
    }
  }`,
}

// Global Queries
export const globalQueries = {
  getSettings: `*[_type == "global"][0] {
    _id,
    siteName,
    bio,
    backgroundVideo {
      videoUrl,
      posterImage {
        asset -> {
          _id,
          _type,
          url
        }
      },
      opacity
    },
    backgroundImages[] {
      _type,
      _key,
      image {
        asset -> {
          _id,
          _type,
          url
        }
      },
      layer,
      position,
      opacity,
      size
    },
    socialLinks[] {
      _key,
      platform,
      url
    }
  }`,
}

// Brand Queries
export const brandQueries = {
  getAll: `*[_type == "brand"] | order(order asc, _createdAt asc) {
    _id,
    name,
    logo,
    url,
    order
  }`,
}

// Query execution functions
export async function fetchMusic() {
  if (!sanityClient) {
    console.warn('Sanity client not initialized')
    return []
  }
  return await sanityClient.fetch(musicQueries.getAll)
}

export async function fetchMusicById(id: string) {
  if (!sanityClient) return null
  return await sanityClient.fetch(musicQueries.getById, { id })
}

export async function fetchFood() {
  if (!sanityClient) return []
  return await sanityClient.fetch(foodQueries.getAll)
}

export async function fetchFoodById(id: string) {
  if (!sanityClient) return null
  return await sanityClient.fetch(foodQueries.getById, { id })
}

export async function fetchFoodByEventType(eventType: string) {
  if (!sanityClient) return []
  return await sanityClient.fetch(foodQueries.getByEventType, { eventType })
}

export async function fetchHost() {
  if (!sanityClient) return []
  return await sanityClient.fetch(hostQueries.getAll)
}

export async function fetchHostById(id: string) {
  if (!sanityClient) return null
  return await sanityClient.fetch(hostQueries.getById, { id })
}

export async function fetchShowreel() {
  if (!sanityClient) return null
  // First try to get the marked showreel
  const showreel = await sanityClient.fetch(hostQueries.getShowreel)
  
  // If no showreel is marked, fallback to the most recent event with a video
  if (!showreel) {
    const fallback = await sanityClient.fetch(
      `*[_type == "host" && defined(videoUrl)] | order(eventDate desc)[0] {
        _id,
        title,
        description,
        videoUrl,
        isShowreel,
        eventDate,
        testimonial
      }`
    )
    return fallback || null
  }
  
  return showreel
}

export async function fetchSocial() {
  if (!sanityClient) return []
  return await sanityClient.fetch(socialQueries.getAll)
}

export async function fetchSocialByPlatform(platform: string) {
  if (!sanityClient) return null
  return await sanityClient.fetch(socialQueries.getByPlatform, { platform })
}

export async function fetchGlobalSettings() {
  if (!sanityClient) return null
  return await sanityClient.fetch(globalQueries.getSettings)
}

export async function fetchBrands() {
  if (!sanityClient) return []
  return await sanityClient.fetch(brandQueries.getAll)
}

