#!/bin/bash

# Setup script for environment variables

echo "🔧 Setting up environment variables for Priscilla Life"
echo ""

# Check if project ID is provided
if [ -z "$1" ]; then
  echo "Usage: ./setup-env.sh YOUR_SANITY_PROJECT_ID"
  echo ""
  echo "Example: ./setup-env.sh abc123xyz"
  exit 1
fi

PROJECT_ID=$1
DATASET=${2:-production}

echo "📝 Creating environment files..."
echo ""

# Create .env.local for Next.js app
cat > apps/web/.env.local << EOF
NEXT_PUBLIC_SANITY_PROJECT_ID=$PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=$DATASET
EOF

# Create .env.local for Sanity Studio
cat > apps/studio/.env.local << EOF
SANITY_PROJECT_ID=$PROJECT_ID
SANITY_DATASET=$DATASET
EOF

echo "✅ Environment files created!"
echo ""
echo "📁 Created:"
echo "   - apps/web/.env.local"
echo "   - apps/studio/.env.local"
echo ""
echo "🚀 You can now run:"
echo "   - pnpm dev (for Next.js)"
echo "   - pnpm studio (for Sanity Studio)"
echo ""

