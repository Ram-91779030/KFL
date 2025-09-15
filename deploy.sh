#!/bin/bash

# Deployment script for React Frontend + Django Backend
# Make sure to run this script with appropriate permissions

set -e

echo "🚀 Starting deployment process..."

# Configuration
APP_DIR="/opt/your-app"
FRONTEND_DIR="$APP_DIR/frontend"
BACKEND_DIR="$APP_DIR/backend"
VENV_DIR="$APP_DIR/backend-env"
SERVICE_NAME="your-app-backend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as correct user
if [ "$USER" != "your-app" ]; then
    print_warning "This script should be run as 'your-app' user. Switching to your-app user..."
    sudo -u your-app bash -c "$0 $@"
    exit $?
fi

# Check if directories exist
if [ ! -d "$FRONTEND_DIR" ] || [ ! -d "$BACKEND_DIR" ]; then
    print_error "Application directories not found. Please run initial setup first."
    exit 1
fi

# Frontend deployment
print_status "Deploying frontend..."
cd "$FRONTEND_DIR"

# Pull latest changes
print_status "Pulling latest changes from repository..."
git pull origin main

# Install dependencies
print_status "Installing frontend dependencies..."
npm install

# Build frontend
print_status "Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Frontend build completed successfully!"
else
    print_error "Frontend build failed!"
    exit 1
fi

# Backend deployment
print_status "Deploying backend..."
cd "$BACKEND_DIR"

# Pull latest changes
print_status "Pulling latest changes from repository..."
git pull origin main

# Activate virtual environment
print_status "Activating Python virtual environment..."
source "$VENV_DIR/bin/activate"

# Install/update dependencies
print_status "Installing backend dependencies..."
pip install -r server/requirements.txt

# Set production environment
export DJANGO_SETTINGS_MODULE=server.settings_prod

# Run database migrations
print_status "Running database migrations..."
cd server
python manage.py migrate

# Collect static files
print_status "Collecting static files..."
python manage.py collectstatic --noinput

# Deactivate virtual environment
deactivate

# Restart backend service
print_status "Restarting backend service..."
sudo systemctl restart "$SERVICE_NAME"

# Check service status
if systemctl is-active --quiet "$SERVICE_NAME"; then
    print_status "Backend service is running successfully!"
else
    print_error "Backend service failed to start!"
    sudo systemctl status "$SERVICE_NAME"
    exit 1
fi

# Reload Nginx configuration
print_status "Reloading Nginx configuration..."
sudo nginx -t && sudo systemctl reload nginx

if [ $? -eq 0 ]; then
    print_status "Nginx configuration reloaded successfully!"
else
    print_error "Nginx configuration test failed!"
    exit 1
fi

# Health check
print_status "Performing health check..."
sleep 5

# Check if backend is responding
if curl -f -s http://localhost:8000/api/ > /dev/null; then
    print_status "Backend API is responding!"
else
    print_warning "Backend API health check failed. Check logs for details."
fi

# Check if frontend is accessible
if curl -f -s http://localhost/ > /dev/null; then
    print_status "Frontend is accessible!"
else
    print_warning "Frontend accessibility check failed. Check Nginx logs."
fi

print_status "🎉 Deployment completed successfully!"
print_status "Your application should now be live at your domain."

# Show service status
echo ""
print_status "Service Status:"
sudo systemctl status "$SERVICE_NAME" --no-pager -l
echo ""
print_status "Recent logs:"
sudo journalctl -u "$SERVICE_NAME" --no-pager -l -n 10