# Deployment Instructions

## Overview

This monorepo has **2 separate applications** that need separate deployments:

1. **`apps/web`** - Next.js website (deploy to Vercel)
2. **`apps/studio`** - Sanity Studio CMS (deploy to Sanity hosting OR Vercel)

---

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

---

## Deployment 1: Next.js Web App (apps/web) → Vercel

This is your **main public website** that visitors will see.

### Step 1: Import to Vercel
1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your `priscilla-life` repository

### Step 2: Configure Project Settings
**Important:** Set these in Vercel Dashboard (not in vercel.json):
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `apps/web` ⚠️ **Set this in Vercel Dashboard → Settings → General**
- **Install Command**: `cd ../.. && pnpm install` (auto from vercel.json)
- **Build Command**: `pnpm build` (auto from vercel.json)
- **Output Directory**: `.next` (default, auto-detected by Next.js)

### Step 3: Add Environment Variables
In Vercel project settings → Environment Variables, add:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = your_sanity_project_id
- `NEXT_PUBLIC_SANITY_DATASET` = production

### Step 4: Deploy
Click "Deploy" and Vercel will build and deploy your site!

**Your website will be live at:** `https://priscilla-life.vercel.app` (or custom domain)

---

## Deployment 2: Sanity Studio (apps/studio) → Sanity Hosting (Recommended)

This is your **CMS admin panel** where you manage content.

### Option A: Sanity Hosting (Recommended - Free & Easy)

```bash
cd apps/studio
pnpm install
pnpm build
pnpm deploy
```

This will:
- Deploy to `https://your-project.sanity.studio`
- Handle authentication automatically
- Update automatically when you push changes

**Your CMS will be live at:** `https://your-project.sanity.studio`

### Option B: Deploy Studio to Vercel (Alternative)

If you prefer to host Studio on Vercel:

1. **Create a SECOND Vercel project:**
   - Go to Vercel → Add New Project
   - Import the same `priscilla-life` repository
   - Name it: `priscilla-life-studio`

2. **Configure Settings:**
   - **Root Directory**: `apps/studio`
   - **Framework Preset**: Other (or Sanity if available)
   - **Build Command**: `pnpm build` (runs `sanity build`)
   - **Install Command**: `cd ../.. && pnpm install`
   - **Output Directory**: `dist`

3. **Add Environment Variables:**
   - `SANITY_PROJECT_ID` = your_sanity_project_id
   - `SANITY_DATASET` = production

4. **Deploy**

**Your CMS will be live at:** `https://priscilla-life-studio.vercel.app`

---

## Summary: Two Deployments

| App | Location | URL | Purpose |
|-----|----------|-----|---------|
| **Web App** | Vercel | `priscilla-life.vercel.app` | Public website |
| **Studio** | Sanity Hosting | `your-project.sanity.studio` | CMS admin panel |

---

## Quick Deploy Commands

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy Web App (automatic via Vercel GitHub integration)

# 3. Deploy Studio
cd apps/studio
pnpm install
pnpm deploy
```

---

## Troubleshooting

### Web App Build Fails
- Check that Root Directory is set to `apps/web` in Vercel
- Verify environment variables are set correctly
- Check build logs in Vercel dashboard

### Studio Deployment Fails
- Make sure `.env.local` exists in `apps/studio/` with `SANITY_PROJECT_ID`
- Run `pnpm install` from the studio directory first
- Check that your Sanity project exists and you have access
