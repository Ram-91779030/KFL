# 🚀 Deployment Guide - KFL E-commerce Website

## 📋 Prerequisites

### Server Requirements
- **Operating System**: Ubuntu 20.04+ / CentOS 8+ / Amazon Linux 2
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: Minimum 20GB free space
- **CPU**: 2 cores minimum
- **Network**: Public IP with ports 80, 443, 22 open

### Software Requirements
- **Nginx** (Web server)
- **Node.js** 18+ (for backend)
- **Python** 3.8+ (for Django backend)
- **PostgreSQL** (Database)
- **SSL Certificate** (Let's Encrypt)
- **PM2** (Process manager)
- **Git**

## 🏗️ Build Information

### Current Build
- **Build Size**: ~444KB (JS) + 178KB (CSS)
- **Total Assets**: Optimized and minified
- **SEO Files**: sitemap.xml, robots.txt included
- **PWA**: Service worker and manifest.json ready

### Build Output
```
build/
├── index.html          # Main HTML file
├── assets/
│   ├── index-CzJPzB1_.js    # Main JavaScript bundle
│   └── index-Uv9OxMXp.css   # Main CSS bundle
├── manifest.json       # PWA manifest
├── robots.txt          # SEO robots file
├── sitemap.xml         # SEO sitemap
└── sw.js              # Service worker
```

## 🌐 Domain Configuration

### Primary Domains
- **karshakfoodlife.in** (Main e-commerce site)
- **karshakfoodlife.com** (Alternative domain)
- **ogbar.in** (Protein bar subdomain)

### DNS Configuration
```
A Record: karshakfoodlife.in → YOUR_SERVER_IP
A Record: karshakfoodlife.com → YOUR_SERVER_IP
A Record: ogbar.in → YOUR_SERVER_IP
CNAME: www.karshakfoodlife.in → karshakfoodlife.in
CNAME: www.karshakfoodlife.com → karshakfoodlife.com
CNAME: www.ogbar.in → ogbar.in
```

## 📦 Step-by-Step Deployment

### Step 1: Server Setup

#### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### 1.2 Install Required Software
```bash
# Install Nginx
sudo apt install nginx -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.8+
sudo apt install python3 python3-pip python3-venv -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install PM2
sudo npm install -g pm2

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Backend Setup (Django)

#### 2.1 Create Application User
```bash
sudo adduser kflapp
sudo usermod -aG sudo kflapp
```

#### 2.2 Setup Project Directory
```bash
sudo mkdir -p /var/www/kfl
sudo chown kflapp:kflapp /var/www/kfl
cd /var/www/kfl
```

#### 2.3 Clone and Setup Backend
```bash
# Clone your repository
git clone https://github.com/yourusername/figma-karshak.git .

# Setup Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r server/requirements-prod.txt

# Setup environment variables
cp env.example .env
nano .env
```

#### 2.4 Configure Environment Variables
```bash
# .env file content
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=karshakfoodlife.in,karshakfoodlife.com,ogbar.in,www.karshakfoodlife.in,www.karshakfoodlife.com,www.ogbar.in
DATABASE_URL=postgresql://kfluser:yourpassword@localhost/kfldb
CORS_ALLOWED_ORIGINS=https://karshakfoodlife.in,https://karshakfoodlife.com,https://ogbar.in
```

#### 2.5 Setup Database
```bash
# Create database user
sudo -u postgres createuser kfluser
sudo -u postgres createdb kfldb
sudo -u postgres psql -c "ALTER USER kfluser PASSWORD 'yourpassword';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kfldb TO kfluser;"

# Run migrations
cd server
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

### Step 3: Frontend Deployment

#### 3.1 Build Frontend
```bash
# Install Node.js dependencies
npm install

# Build for production
npm run build
```

#### 3.2 Setup Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/kfl
```

#### 3.3 Nginx Configuration File
```nginx
# Main domain - karshakfoodlife.in
server {
    listen 80;
    server_name karshakfoodlife.in www.karshakfoodlife.in;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name karshakfoodlife.in www.karshakfoodlife.in;
    
    # SSL Configuration (will be added by Certbot)
    
    # Frontend static files
    location / {
        root /var/www/kfl/build;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Admin interface
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}

# Alternative domain - karshakfoodlife.com
server {
    listen 80;
    server_name karshakfoodlife.com www.karshakfoodlife.com;
    return 301 https://karshakfoodlife.in$request_uri;
}

# OG Bar subdomain - ogbar.in
server {
    listen 80;
    server_name ogbar.in www.ogbar.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ogbar.in www.ogbar.in;
    
    # Same configuration as main domain but with OG Bar specific settings
    location / {
        root /var/www/kfl/build;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 4: SSL Certificate Setup

#### 4.1 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/kfl /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4.2 Get SSL Certificates
```bash
# For main domain
sudo certbot --nginx -d karshakfoodlife.in -d www.karshakfoodlife.in

# For alternative domain
sudo certbot --nginx -d karshakfoodlife.com -d www.karshakfoodlife.com

# For OG Bar subdomain
sudo certbot --nginx -d ogbar.in -d www.ogbar.in
```

### Step 5: Backend Service Setup

#### 5.1 Create PM2 Configuration
```bash
nano /var/www/kfl/ecosystem.config.js
```

#### 5.2 PM2 Configuration File
```javascript
module.exports = {
  apps: [{
    name: 'kfl-backend',
    script: 'server/manage.py',
    args: 'runserver 127.0.0.1:8000',
    cwd: '/var/www/kfl',
    interpreter: '/var/www/kfl/venv/bin/python',
    env: {
      DJANGO_SETTINGS_MODULE: 'server.settings',
      PYTHONPATH: '/var/www/kfl/server'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/kfl/error.log',
    out_file: '/var/log/kfl/out.log',
    log_file: '/var/log/kfl/combined.log',
    time: true
  }]
};
```

#### 5.3 Start Backend Service
```bash
# Create log directory
sudo mkdir -p /var/log/kfl
sudo chown kflapp:kflapp /var/log/kfl

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 6: Final Configuration

#### 6.1 Setup Log Rotation
```bash
sudo nano /etc/logrotate.d/kfl
```

```bash
/var/log/kfl/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 kflapp kflapp
    postrotate
        pm2 reloadLogs
    endscript
}
```

#### 6.2 Setup Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Setup UFW firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 🔄 Deployment Scripts

### Quick Deploy Script
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install/update dependencies
npm install
source venv/bin/activate
pip install -r server/requirements-prod.txt

# Build frontend
npm run build

# Run migrations
cd server
python manage.py migrate
python manage.py collectstatic --noinput
cd ..

# Restart services
pm2 restart kfl-backend
sudo systemctl reload nginx

echo "✅ Deployment completed!"
```

### Backup Script
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/kfl"

mkdir -p $BACKUP_DIR

# Backup database
pg_dump kfldb > $BACKUP_DIR/db_backup_$DATE.sql

# Backup media files
tar -czf $BACKUP_DIR/media_backup_$DATE.tar.gz server/media/

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup completed: $DATE"
```

## 📊 Performance Optimization

### 1. Enable Gzip Compression
```nginx
# Add to nginx config
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. Setup CDN (Optional)
- Use CloudFlare or AWS CloudFront
- Configure DNS to point to CDN
- Update CORS settings in Django

### 3. Database Optimization
```bash
# Add to Django settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'kfldb',
        'USER': 'kfluser',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'MAX_CONNS': 20,
        }
    }
}
```

## 🔍 Monitoring & Maintenance

### Health Check Endpoints
- Frontend: `https://karshakfoodlife.in/`
- API: `https://karshakfoodlife.in/api/`
- Admin: `https://karshakfoodlife.in/admin/`

### Log Locations
- Nginx: `/var/log/nginx/`
- Application: `/var/log/kfl/`
- System: `/var/log/syslog`

### Useful Commands
```bash
# Check service status
pm2 status
sudo systemctl status nginx

# View logs
pm2 logs kfl-backend
sudo tail -f /var/log/nginx/access.log

# Restart services
pm2 restart kfl-backend
sudo systemctl restart nginx

# Update SSL certificates
sudo certbot renew --dry-run
```

## 🚨 Troubleshooting

### Common Issues
1. **502 Bad Gateway**: Check if backend is running (`pm2 status`)
2. **SSL Issues**: Verify certificate with `sudo certbot certificates`
3. **Database Connection**: Check PostgreSQL service and credentials
4. **Static Files**: Ensure proper permissions on build directory

### Emergency Commands
```bash
# Quick restart everything
pm2 restart all && sudo systemctl restart nginx

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
ps aux | grep -E "(nginx|python|node)"
```

## 📈 Post-Deployment Checklist

- [ ] All domains resolve correctly
- [ ] SSL certificates are valid
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] Admin interface is accessible
- [ ] Database migrations completed
- [ ] Static files served correctly
- [ ] Monitoring setup complete
- [ ] Backup system configured
- [ ] Security headers implemented

---

**🎉 Congratulations! Your KFL e-commerce website is now live and ready to serve customers!**
