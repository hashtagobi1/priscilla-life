# Populate Sanity CMS Script

This script populates your Sanity CMS with dummy data for Priscilla Dina Toko.

## Setup

1. **Create a Sanity API Token:**
   - Go to https://sanity.io/manage
   - Select your project (`kalx5g57`)
   - Navigate to **API** → **Tokens**
   - Click **Add API token**
   - Name it: `Populate Script`
   - Select **Editor** permissions
   - Copy the token

2. **Add Token to Environment:**
   Add the token to your `.env` file (in `apps/studio/.env.local` or root `.env`):
   ```env
   SANITY_API_TOKEN=your_token_here
   ```

## Run the Script

From the project root:
```bash
pnpm populate
```

Or manually:
```bash
cd scripts
pnpm install
pnpm populate
```

## What It Creates

- **3 Music entries** - Songs with streaming links
- **4 Food Portfolio entries** - Catering events (weddings, corporate, private, charity)
- **3 Host entries** - Events with testimonials and video URLs
- **3 Social Media entries** - Instagram, Twitter, TikTok with follower counts and achievements
- **1 Global Settings** - Site name and social links

## Notes

- The script will skip if documents already exist (you may need to delete them first in Sanity Studio)
- All data is realistic dummy data based on Priscilla Dina Toko's profile
- You can edit the data in `populate-sanity.js` to customize it


