#!/bin/bash

# 🚀 Deploy to Netlify - Get ogbar.in Live NOW!

echo "🚀 DEPLOYING TO NETLIFY - Getting ogbar.in Live!"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
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

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_status "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Build the project
print_status "Building project..."
npm run build

if [ ! -d "build" ]; then
    echo "❌ Build failed!"
    exit 1
fi

print_success "Build completed!"

# Deploy to Netlify
print_status "Deploying to Netlify..."

# Check if already logged in
if ! netlify status &> /dev/null; then
    print_status "Please login to Netlify..."
    netlify login
fi

# Deploy
netlify deploy --prod --dir=build

print_success "🎉 Your website is now LIVE!"
print_warning "Add ogbar.in as custom domain in Netlify dashboard"
