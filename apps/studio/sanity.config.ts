import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { config } from 'dotenv'

// Load .env.local file
config({ path: '.env.local' })

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing SANITY_PROJECT_ID. Please create a .env.local file in apps/studio/ with SANITY_PROJECT_ID=your_project_id'
  )
}

export default defineConfig({
  name: 'default',
  title: 'Priscilla Life CMS',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})


