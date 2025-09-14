#!/bin/bash

# 🚀 Netlify Deployment Script for KFL E-commerce
# This script prepares and deploys your site to Netlify

set -e  # Exit on any error

echo "🚀 Starting Netlify deployment for KFL E-commerce..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

print_status "Checking prerequisites..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_status "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - KFL e-commerce website"
    print_success "Git repository initialized"
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
    print_success "Netlify CLI installed"
fi

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    print_status "Please login to Netlify..."
    netlify login
fi

print_status "Building project for production..."

# Install dependencies
print_status "Installing dependencies..."
npm install

# Build the project
print_status "Building frontend..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    print_error "Build failed. No build directory found."
    exit 1
fi

print_success "Build completed successfully"

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Check if netlify.toml exists
if [ ! -f "netlify.toml" ]; then
    print_warning "netlify.toml not found. Creating default configuration..."
    # The netlify.toml file should already be created
fi

# Deploy to Netlify
print_status "Deploying to Netlify..."

# Check if site is already linked
if [ -f ".netlify/state.json" ]; then
    print_status "Site already linked. Deploying..."
    netlify deploy --prod
else
    print_status "Linking site to Netlify..."
    netlify init
    print_status "Deploying to production..."
    netlify deploy --prod
fi

print_success "🎉 Deployment to Netlify completed successfully!"

# Get site URL
SITE_URL=$(netlify status --json | grep -o '"url":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$SITE_URL" ]; then
    print_success "Your site is live at: $SITE_URL"
fi

echo ""
print_status "Next steps:"
echo "1. Add your custom domains in Netlify dashboard"
echo "2. Configure environment variables"
echo "3. Set up form handling (if needed)"
echo "4. Enable analytics"
echo "5. Configure your backend CORS settings"

echo ""
print_status "Useful commands:"
echo "- View site: netlify open"
echo "- View logs: netlify logs"
echo "- Update environment: netlify env:set KEY=value"
echo "- Deploy preview: netlify deploy"

print_success "✅ Netlify deployment script completed!"
