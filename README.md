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

**Quick Setup (Recommended):**
```bash
./setup-env.sh YOUR_SANITY_PROJECT_ID
```

**Manual Setup:**
Create these files with your Sanity project credentials:

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**`apps/studio/.env.local`**
```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

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

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

The project is set up for deployment on Vercel. Make sure to set environment variables in your deployment platform.

## Troubleshooting

### Sanity Studio Error: "Configuration must contain `projectId`"
- Make sure you've created `apps/studio/.env.local` with your `SANITY_PROJECT_ID`
- Run `./setup-env.sh YOUR_PROJECT_ID` to create the files automatically

### Next.js can't connect to Sanity
- Verify `apps/web/.env.local` exists with `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Restart the dev server after creating/updating env files
