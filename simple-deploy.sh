#!/bin/bash

# 🚀 Simple Deployment Script for KFL E-commerce
# This script prepares your site for manual deployment

set -e

echo "🚀 Preparing KFL E-commerce for deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Build the project
print_status "Building project for production..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed. No build directory found."
    exit 1
fi

print_success "Build completed successfully"

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Commit and push changes
print_status "Committing and pushing changes to GitHub..."
git add .
git commit -m "Deploy: Navigation bar fix and production build" || echo "No changes to commit"
git push origin main

print_success "✅ Code pushed to GitHub successfully!"

echo ""
print_status "🎯 Next Steps for Live Deployment:"
echo ""
echo "1. 🌐 Go to https://netlify.com"
echo "2. 📝 Sign up/Login with GitHub"
echo "3. 🔗 Click 'New site from Git'"
echo "4. 📂 Select your repository: Ram-91779030/KFL"
echo "5. ⚙️  Configure build settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: build"
echo "6. 🚀 Click 'Deploy site'"
echo ""
echo "Your site will be live in 2-3 minutes! 🎉"
echo ""
print_success "✅ Deployment preparation completed!"
