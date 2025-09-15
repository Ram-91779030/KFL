# Complete Deployment Guide - React Frontend + Django Backend

This guide will walk you through deploying your e-commerce website with React frontend and Django backend to a production server.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Database Setup](#database-setup)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL Certificate Setup](#ssl-certificate-setup)
8. [Production Environment Variables](#production-environment-variables)
9. [Deployment Scripts](#deployment-scripts)
10. [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

### Server Requirements
- Ubuntu 20.04+ or CentOS 8+
- Minimum 2GB RAM, 2 CPU cores
- 20GB+ storage space
- Root or sudo access

### Software Requirements
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Nginx
- Git
- Docker (optional)

## Server Setup

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Required Software
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.11 and pip
sudo apt install -y python3.11 python3.11-pip python3.11-venv

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git

# Install additional dependencies
sudo apt install -y build-essential libpq-dev
```

### 3. Create Application User
```bash
sudo adduser --system --group --home /opt/your-app your-app
sudo usermod -aG sudo your-app
```

## Frontend Deployment

### 1. Clone Repository
```bash
cd /opt/your-app
sudo git clone https://github.com/your-username/your-repo.git frontend
sudo chown -R your-app:your-app frontend
```

### 2. Install Dependencies and Build
```bash
cd frontend
npm install
npm run build
```

### 3. Create Production Vite Config
Create `/opt/your-app/frontend/vite.config.prod.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
});
```

## Backend Deployment

### 1. Setup Python Virtual Environment
```bash
cd /opt/your-app
python3.11 -m venv backend-env
source backend-env/bin/activate
```

### 2. Clone and Setup Backend
```bash
git clone https://github.com/your-username/your-repo.git backend
cd backend/server
pip install -r requirements.txt
```

### 3. Create Production Settings
Create `/opt/your-app/backend/server/settings_prod.py`:

```python
from .settings import *
import os
from decouple import config

# Security settings
DEBUG = False
SECRET_KEY = config('SECRET_KEY')
ALLOWED_HOSTS = config('ALLOWED_HOSTS').split(',')

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# CORS settings
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS').split(',')

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/opt/your-app/logs/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

## Database Setup

### 1. Create PostgreSQL Database
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE your_app_db;
CREATE USER your_app_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE your_app_db TO your_app_user;
ALTER USER your_app_user CREATEDB;
\q
```

### 2. Run Django Migrations
```bash
cd /opt/your-app/backend/server
source /opt/your-app/backend-env/bin/activate
export DJANGO_SETTINGS_MODULE=server.settings_prod
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## Nginx Configuration

### 1. Create Nginx Config
Create `/etc/nginx/sites-available/your-app`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration (will be added after SSL setup)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Frontend (React)
    location / {
        root /opt/your-app/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Django Admin
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files
    location /static/ {
        alias /opt/your-app/backend/server/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Media files
    location /media/ {
        alias /opt/your-app/backend/server/media/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 2. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate Setup

### 1. Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3. Auto-renewal
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Production Environment Variables

### 1. Create Environment File
Create `/opt/your-app/.env`:

```bash
# Django Settings
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com,localhost

# Database
DB_NAME=your_app_db
DB_USER=your_app_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 2. Secure Environment File
```bash
sudo chmod 600 /opt/your-app/.env
sudo chown your-app:your-app /opt/your-app/.env
```

## Deployment Scripts

### 1. Create Deployment Script
Create `/opt/your-app/deploy.sh`:

```bash
#!/bin/bash

set -e

echo "Starting deployment..."

# Frontend deployment
echo "Deploying frontend..."
cd /opt/your-app/frontend
git pull origin main
npm install
npm run build

# Backend deployment
echo "Deploying backend..."
cd /opt/your-app/backend
git pull origin main
source /opt/your-app/backend-env/bin/activate
pip install -r server/requirements.txt
cd server
export DJANGO_SETTINGS_MODULE=server.settings_prod
python manage.py migrate
python manage.py collectstatic --noinput

# Restart services
echo "Restarting services..."
sudo systemctl restart your-app-backend
sudo systemctl reload nginx

echo "Deployment completed successfully!"
```

### 2. Create Systemd Service
Create `/etc/systemd/system/your-app-backend.service`:

```ini
[Unit]
Description=Your App Django Backend
After=network.target

[Service]
Type=exec
User=your-app
Group=your-app
WorkingDirectory=/opt/your-app/backend/server
Environment=DJANGO_SETTINGS_MODULE=server.settings_prod
ExecStart=/opt/your-app/backend-env/bin/python manage.py runserver 0.0.0.0:8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### 3. Enable and Start Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable your-app-backend
sudo systemctl start your-app-backend
```

## Monitoring & Maintenance

### 1. Log Monitoring
```bash
# View Django logs
sudo tail -f /opt/your-app/logs/django.log

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View systemd service logs
sudo journalctl -u your-app-backend -f
```

### 2. Database Backup
Create `/opt/your-app/backup-db.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U your_app_user your_app_db > /opt/your-app/backups/db_backup_$DATE.sql
find /opt/your-app/backups -name "db_backup_*.sql" -mtime +7 -delete
```

### 3. Automated Backups
```bash
sudo crontab -e
# Add this line for daily backups at 2 AM:
0 2 * * * /opt/your-app/backup-db.sh
```

## Quick Deployment Commands

### Initial Setup (run once)
```bash
# 1. Server setup
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs python3.11 python3.11-pip python3.11-venv postgresql postgresql-contrib nginx git build-essential libpq-dev

# 2. Create user and directories
sudo adduser --system --group --home /opt/your-app your-app
sudo mkdir -p /opt/your-app/{logs,backups}
sudo chown -R your-app:your-app /opt/your-app

# 3. Clone repositories
cd /opt/your-app
sudo -u your-app git clone https://github.com/your-username/your-repo.git frontend
sudo -u your-app git clone https://github.com/your-username/your-repo.git backend

# 4. Setup backend
cd backend
sudo -u your-app python3.11 -m venv backend-env
sudo -u your-app bash -c "source backend-env/bin/activate && pip install -r server/requirements.txt"

# 5. Setup database
sudo -u postgres createdb your_app_db
sudo -u postgres createuser your_app_user
sudo -u postgres psql -c "ALTER USER your_app_user WITH PASSWORD 'your_secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE your_app_db TO your_app_user;"

# 6. Setup frontend
cd ../frontend
sudo -u your-app npm install
sudo -u your-app npm run build

# 7. Configure and start services
sudo cp /opt/your-app/backend/server/your-app-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable your-app-backend
sudo systemctl start your-app-backend

# 8. Configure Nginx
sudo cp /opt/your-app/nginx-config /etc/nginx/sites-available/your-app
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 9. Setup SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Regular Deployment (run for updates)
```bash
sudo /opt/your-app/deploy.sh
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**: Check if Django backend is running
   ```bash
   sudo systemctl status your-app-backend
   ```

2. **Static files not loading**: Run collectstatic
   ```bash
   cd /opt/your-app/backend/server
   source /opt/your-app/backend-env/bin/activate
   python manage.py collectstatic --noinput
   ```

3. **Database connection issues**: Check PostgreSQL status
   ```bash
   sudo systemctl status postgresql
   ```

4. **Permission issues**: Fix ownership
   ```bash
   sudo chown -R your-app:your-app /opt/your-app
   ```

## Security Checklist

- [ ] Change default database passwords
- [ ] Use strong SECRET_KEY
- [ ] Enable firewall (ufw)
- [ ] Regular security updates
- [ ] Monitor logs for suspicious activity
- [ ] Backup database regularly
- [ ] Use HTTPS only
- [ ] Set up fail2ban for brute force protection

## Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Use CDN** for static assets
3. **Implement caching** (Redis/Memcached)
4. **Database optimization** (indexes, query optimization)
5. **Image optimization** and lazy loading
6. **Code splitting** in React build

This guide provides a complete production deployment setup. Make sure to replace placeholder values (your-domain.com, your-username, etc.) with your actual values.
