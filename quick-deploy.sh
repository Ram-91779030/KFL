#!/bin/bash

# 🚀 Quick Deploy Script - Get ogbar.in Live NOW!
# This script helps you deploy your KFL website immediately

set -e

echo "🚀 QUICK DEPLOYMENT - Getting ogbar.in Live!"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_status "Building project for production..."
npm run build

if [ ! -d "build" ]; then
    print_error "Build failed. No build directory found."
    exit 1
fi

print_success "Build completed successfully"

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Commit and push changes
print_status "Pushing latest changes to GitHub..."
git add .
git commit -m "Quick deploy: Ready for live deployment" || echo "No changes to commit"
git push origin main

print_success "✅ Code pushed to GitHub successfully!"

echo ""
print_warning "🚨 ogbar.in is not opening because it's not deployed yet!"
echo ""
print_status "🎯 IMMEDIATE SOLUTIONS (Choose One):"
echo ""
echo "1. 🌐 NETLIFY (RECOMMENDED - 5 minutes):"
echo "   - Go to: https://netlify.com"
echo "   - Sign up with GitHub"
echo "   - Click 'New site from Git'"
echo "   - Select: Ram-91779030/KFL"
echo "   - Build command: npm run build"
echo "   - Publish directory: build"
echo "   - Deploy!"
echo ""
echo "2. ⚡ VERCEL (5 minutes):"
echo "   - Go to: https://vercel.com"
echo "   - Import GitHub repository"
echo "   - Deploy!"
echo ""
echo "3. 📱 GITHUB PAGES (FREE):"
echo "   - Go to: https://github.com/Ram-91779030/KFL/settings/pages"
echo "   - Deploy from main branch"
echo "   - Your site: https://ram-91779030.github.io/KFL"
echo ""
echo "4. 🧪 TEST LOCALLY:"
echo "   npx serve -s build -l 3000"
echo "   Visit: http://localhost:3000"
echo ""

print_status "📋 After deployment:"
echo "- You'll get a live URL (e.g., https://random-name.netlify.app)"
echo "- Add ogbar.in as custom domain in hosting settings"
echo "- Update DNS records to point to your hosting provider"
echo ""

print_success "✅ Your website is ready for deployment!"
print_warning "⚠️  ogbar.in will work once you deploy to a hosting service!"
