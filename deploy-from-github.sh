#!/bin/bash

# Deployment script that pulls from GitHub
set -e

APP_DIR="/opt/kfl-app"
FRONTEND_DIR="$APP_DIR/frontend"
BACKEND_DIR="$APP_DIR/backend"
VENV_DIR="$APP_DIR/backend-env"
SERVICE_NAME="kfl-backend"
GITHUB_REPO="https://github.com/Ram-91779030/KFL.git"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "🚀 Starting deployment from GitHub..."

# Check if running as correct user
if [ "$USER" != "kfl-app" ]; then
    print_warning "This script should be run as 'kfl-app' user. Switching to kfl-app user..."
    sudo -u kfl-app bash -c "$0 $@"
    exit $?
fi

# Frontend deployment
print_status "Deploying frontend..."
cd "$FRONTEND_DIR"
git pull origin main
npm install
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
git pull origin main
source "$VENV_DIR/bin/activate"
pip install -r server/requirements.txt
cd server
export DJANGO_SETTINGS_MODULE=server.settings_prod
python manage.py migrate
python manage.py collectstatic --noinput
deactivate

# Restart services
print_status "Restarting services..."
sudo systemctl restart "$SERVICE_NAME"
sudo systemctl reload nginx

# Check service status
if systemctl is-active --quiet "$SERVICE_NAME"; then
    print_status "Backend service is running successfully!"
else
    print_error "Backend service failed to start!"
    sudo systemctl status "$SERVICE_NAME"
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

print_status "✅ Deployment from GitHub completed successfully!"
print_status "Your application should now be live at your domain."
