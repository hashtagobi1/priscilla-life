# Priscilla Life

A multi-domain portfolio website showcasing Music, Hosting, Food, and Social media presence.

## Tech Stack

- **Next.js 15** - React framework
- **Sanity CMS** - Content management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching

## Project Structure

```
priscilla-life/
├── apps/
│   ├── web/          # Next.js frontend
│   └── studio/       # Sanity Studio
└── packages/         # Shared packages (future)
```

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Copy the example env files and add your Sanity project credentials:

```bash
# For Next.js app
cp apps/web/.env.local.example apps/web/.env.local

# For Sanity Studio
cp apps/studio/.env.local.example apps/studio/.env.local
```

Then update the files with your Sanity project ID and dataset.

### 3. Run Development Servers

```bash
# Start Next.js dev server (port 3000)
pnpm dev

# In another terminal, start Sanity Studio (port 3333)
pnpm studio
```

## Routes

- `/` - Home page
- `/music` - Music portfolio
- `/host` - Hosting & presenting
- `/food` - Food & catering
- `/social` - Social media presence

## Deployment

The project is set up for deployment on Vercel. Make sure to set environment variables in your deployment platform.


