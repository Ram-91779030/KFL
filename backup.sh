#!/bin/bash

# 🔄 KFL E-commerce Backup Script
# This script creates backups of database and media files

set -e  # Exit on any error

echo "🔄 Starting KFL backup process..."

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

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/kfl"
PROJECT_DIR="/var/www/kfl"

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    print_status "Creating backup directory: $BACKUP_DIR"
    sudo mkdir -p "$BACKUP_DIR"
    sudo chown $USER:$USER "$BACKUP_DIR"
fi

print_status "Backup timestamp: $DATE"
print_status "Backup directory: $BACKUP_DIR"

# Database backup
print_status "Creating database backup..."
if command -v pg_dump &> /dev/null; then
    # PostgreSQL backup
    pg_dump kfldb > "$BACKUP_DIR/db_backup_$DATE.sql"
    print_success "Database backup created: db_backup_$DATE.sql"
    
    # Compress database backup
    gzip "$BACKUP_DIR/db_backup_$DATE.sql"
    print_success "Database backup compressed"
else
    print_warning "PostgreSQL not found. Skipping database backup."
fi

# Media files backup
print_status "Creating media files backup..."
if [ -d "$PROJECT_DIR/server/media" ]; then
    tar -czf "$BACKUP_DIR/media_backup_$DATE.tar.gz" -C "$PROJECT_DIR" server/media/
    print_success "Media backup created: media_backup_$DATE.tar.gz"
else
    print_warning "Media directory not found. Skipping media backup."
fi

# Static files backup
print_status "Creating static files backup..."
if [ -d "$PROJECT_DIR/build" ]; then
    tar -czf "$BACKUP_DIR/static_backup_$DATE.tar.gz" -C "$PROJECT_DIR" build/
    print_success "Static files backup created: static_backup_$DATE.tar.gz"
else
    print_warning "Build directory not found. Skipping static files backup."
fi

# Configuration files backup
print_status "Creating configuration backup..."
if [ -f "$PROJECT_DIR/.env" ]; then
    cp "$PROJECT_DIR/.env" "$BACKUP_DIR/env_backup_$DATE"
    print_success "Environment file backup created: env_backup_$DATE"
fi

# Nginx configuration backup
if [ -f "/etc/nginx/sites-available/kfl" ]; then
    sudo cp "/etc/nginx/sites-available/kfl" "$BACKUP_DIR/nginx_config_backup_$DATE"
    print_success "Nginx configuration backup created"
fi

# PM2 configuration backup
if [ -f "$PROJECT_DIR/ecosystem.config.js" ]; then
    cp "$PROJECT_DIR/ecosystem.config.js" "$BACKUP_DIR/pm2_config_backup_$DATE"
    print_success "PM2 configuration backup created"
fi

# Cleanup old backups (keep only last 7 days)
print_status "Cleaning up old backups..."
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "env_backup_*" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*_config_backup_*" -mtime +7 -delete 2>/dev/null || true

print_success "Old backups cleaned up (kept last 7 days)"

# Create backup manifest
print_status "Creating backup manifest..."
cat > "$BACKUP_DIR/backup_manifest_$DATE.txt" << EOF
KFL E-commerce Backup Manifest
==============================

Backup Date: $(date)
Backup Timestamp: $DATE
Server: $(hostname)
User: $(whoami)

Files Created:
$(ls -la "$BACKUP_DIR" | grep "$DATE")

Backup Summary:
- Database: $(ls -la "$BACKUP_DIR" | grep "db_backup_$DATE" | wc -l) file(s)
- Media: $(ls -la "$BACKUP_DIR" | grep "media_backup_$DATE" | wc -l) file(s)
- Static: $(ls -la "$BACKUP_DIR" | grep "static_backup_$DATE" | wc -l) file(s)
- Config: $(ls -la "$BACKUP_DIR" | grep "config_backup_$DATE" | wc -l) file(s)

Total Backup Size: $(du -sh "$BACKUP_DIR" | cut -f1)

Restore Instructions:
1. Database: gunzip db_backup_$DATE.sql.gz && psql kfldb < db_backup_$DATE.sql
2. Media: tar -xzf media_backup_$DATE.tar.gz
3. Static: tar -xzf static_backup_$DATE.tar.gz
4. Config: Copy configuration files to appropriate locations

EOF

print_success "Backup manifest created: backup_manifest_$DATE.txt"

# Show backup summary
echo ""
print_success "🎉 Backup completed successfully!"
echo ""
print_status "Backup Summary:"
echo "Date: $(date)"
echo "Location: $BACKUP_DIR"
echo "Total Size: $(du -sh "$BACKUP_DIR" | cut -f1)"
echo ""
print_status "Files created:"
ls -la "$BACKUP_DIR" | grep "$DATE"

echo ""
print_status "To restore from this backup:"
echo "1. Database: gunzip $BACKUP_DIR/db_backup_$DATE.sql.gz && psql kfldb < $BACKUP_DIR/db_backup_$DATE.sql"
echo "2. Media: tar -xzf $BACKUP_DIR/media_backup_$DATE.tar.gz"
echo "3. Static: tar -xzf $BACKUP_DIR/static_backup_$DATE.tar.gz"

print_success "✅ Backup script completed successfully!"
