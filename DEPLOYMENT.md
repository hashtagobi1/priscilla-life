# Deployment Instructions

## GitHub Setup

### Option 1: Using GitHub CLI (Recommended)
1. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

2. Create and push the repository:
   ```bash
   gh repo create priscilla-life --public --source=. --remote=origin --push
   ```

### Option 2: Manual GitHub Setup
1. Go to https://github.com/new
2. Create a new repository named `priscilla-life`
3. Don't initialize with README, .gitignore, or license (we already have these)
4. Run these commands:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/priscilla-life.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

### Step 1: Connect to GitHub
1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your `priscilla-life` repository

### Step 2: Configure Project Settings
The `vercel.json` file is already configured, but if you need to set manually:
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Install Command**: `cd ../.. && pnpm install` (installs from monorepo root)
- **Build Command**: `pnpm build` (runs from apps/web directory)
- **Output Directory**: `.next` (default, auto-detected by Next.js)

### Step 3: Add Environment Variables
In Vercel project settings, add these environment variables:

**For Next.js App:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = your_sanity_project_id
- `NEXT_PUBLIC_SANITY_DATASET` = production

### Step 4: Deploy
Click "Deploy" and Vercel will build and deploy your site!

Your site will be available at: `https://priscilla-life.vercel.app` (or a custom domain if you set one up)

## Sanity Studio Deployment

To deploy Sanity Studio separately:

```bash
cd apps/studio
pnpm install
pnpm build
pnpm deploy
```

This will deploy your Sanity Studio to `https://your-project.sanity.studio`

