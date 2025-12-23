import { sanityClient, imageUrlBuilder } from '../sanity'

// Helper to get image URL
export const urlFor = (source: any) => {
  if (!source) return null
  return imageUrlBuilder.image(source).url()
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
    images[],
    eventType,
    date
  }`,
  
  getById: `*[_type == "food" && _id == $id][0] {
    _id,
    title,
    description,
    images[],
    eventType,
    date
  }`,
  
  getByEventType: `*[_type == "food" && eventType == $eventType] | order(date desc) {
    _id,
    title,
    description,
    images[],
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
  
  getShowreel: `*[_type == "host"] | order(eventDate desc)[0] {
    _id,
    title,
    description,
    videoUrl,
    eventDate,
    testimonial
  }`,
}

// Social Queries
export const socialQueries = {
  getAll: `*[_type == "social"] | order(_createdAt desc) {
    _id,
    platform,
    followers,
    achievements,
    recentPosts[] {
      image,
      caption,
      url
    }
  }`,
  
  getByPlatform: `*[_type == "social" && platform == $platform][0] {
    _id,
    platform,
    followers,
    achievements,
    recentPosts[] {
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
    socialLinks[] {
      platform,
      url
    }
  }`,
}

// Query execution functions
export async function fetchMusic() {
  return await sanityClient.fetch(musicQueries.getAll)
}

export async function fetchMusicById(id: string) {
  return await sanityClient.fetch(musicQueries.getById, { id })
}

export async function fetchFood() {
  return await sanityClient.fetch(foodQueries.getAll)
}

export async function fetchFoodById(id: string) {
  return await sanityClient.fetch(foodQueries.getById, { id })
}

export async function fetchFoodByEventType(eventType: string) {
  return await sanityClient.fetch(foodQueries.getByEventType, { eventType })
}

export async function fetchHost() {
  return await sanityClient.fetch(hostQueries.getAll)
}

export async function fetchHostById(id: string) {
  return await sanityClient.fetch(hostQueries.getById, { id })
}

export async function fetchShowreel() {
  return await sanityClient.fetch(hostQueries.getShowreel)
}

export async function fetchSocial() {
  return await sanityClient.fetch(socialQueries.getAll)
}

export async function fetchSocialByPlatform(platform: string) {
  return await sanityClient.fetch(socialQueries.getByPlatform, { platform })
}

export async function fetchGlobalSettings() {
  return await sanityClient.fetch(globalQueries.getSettings)
}

