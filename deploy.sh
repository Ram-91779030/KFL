#!/bin/bash

# 🚀 KFL E-commerce Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting KFL E-commerce deployment..."

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

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_status "Checking system requirements..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

print_success "Python version: $(python3 --version)"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Install/update Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r server/requirements-prod.txt

# Install/update Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build frontend
print_status "Building frontend for production..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    print_error "Build failed. No build directory found."
    exit 1
fi

print_success "Frontend build completed successfully"

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Run database migrations (if Django is configured)
if [ -f "server/manage.py" ]; then
    print_status "Running database migrations..."
    cd server
    python manage.py migrate --noinput
    python manage.py collectstatic --noinput
    cd ..
    print_success "Database migrations completed"
fi

# Create deployment info file
print_status "Creating deployment info..."
cat > build/deployment-info.txt << EOF
Deployment Date: $(date)
Build Version: $(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
Node Version: $(node -v)
Python Version: $(python3 --version)
Build Size: $BUILD_SIZE
Environment: Production
EOF

print_success "Deployment info created"

# Check for PM2 (if available)
if command -v pm2 &> /dev/null; then
    print_status "PM2 detected. You can restart your backend service with:"
    print_warning "pm2 restart kfl-backend"
else
    print_warning "PM2 not found. Install it with: npm install -g pm2"
fi

# Check for Nginx (if available)
if command -v nginx &> /dev/null; then
    print_status "Nginx detected. You can reload configuration with:"
    print_warning "sudo systemctl reload nginx"
else
    print_warning "Nginx not found. Please install and configure Nginx."
fi

# Final status
print_success "🎉 Deployment preparation completed successfully!"
echo ""
print_status "Next steps:"
echo "1. Copy the 'build' directory to your web server"
echo "2. Configure Nginx to serve the static files"
echo "3. Start/restart your backend service"
echo "4. Test all endpoints"
echo ""
print_status "Build files are ready in the 'build' directory"
print_status "Total build size: $BUILD_SIZE"

# List build contents
echo ""
print_status "Build contents:"
ls -la build/

echo ""
print_success "✅ Deployment script completed successfully!"
