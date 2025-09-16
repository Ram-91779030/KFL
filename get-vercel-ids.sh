#!/bin/bash

# 🔍 Get Vercel Organization ID and Project ID
# This script helps you get the required IDs for GitHub Actions

echo "🔍 Getting Vercel IDs for GitHub Actions setup..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "🔑 Your Vercel Token: BFfwtZhDH01eIlxfH4AR9Sa5"
echo ""

# Login to Vercel
echo "🔐 Logging into Vercel..."
vercel login --token BFfwtZhDH01eIlxfH4AR9Sa5

echo ""
echo "📋 Getting Organization ID..."
vercel teams list

echo ""
echo "📁 Getting Project ID..."
vercel projects list

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the Organization ID (team_xxxxxxxxx)"
echo "2. Copy the Project ID (prj_xxxxxxxxx)"
echo "3. Add both to GitHub Secrets"
echo "4. Push to main branch for automatic deployment"
echo ""
echo "🌐 GitHub Secrets URL:"
echo "https://github.com/Ram-91779030/KFL/settings/secrets/actions"
