import { createClient as createSanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const sanityClient = projectId
  ? createSanityClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null

// Image URL builder
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null
export { builder as imageUrlBuilder }


