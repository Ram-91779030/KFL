#!/bin/bash

# Initial server setup script for React Frontend + Django Backend
# Run this script as root or with sudo privileges

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run this script as root or with sudo"
    exit 1
fi

print_header "SERVER SETUP FOR REACT + DJANGO APPLICATION"

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install required software
print_status "Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

print_status "Installing Python 3.11 and pip..."
apt install -y python3.11 python3.11-pip python3.11-venv python3.11-dev

print_status "Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

print_status "Installing Nginx..."
apt install -y nginx

print_status "Installing Git and build tools..."
apt install -y git build-essential libpq-dev curl wget

print_status "Installing additional dependencies..."
apt install -y software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Create application user
print_status "Creating application user..."
if ! id "kfl-app" &>/dev/null; then
    adduser --system --group --home /opt/kfl-app kfl-app
    usermod -aG sudo kfl-app
    print_status "User 'kfl-app' created successfully"
else
    print_warning "User 'kfl-app' already exists"
fi

# Create application directories
print_status "Creating application directories..."
mkdir -p /opt/kfl-app/{logs,backups,frontend,backend}
chown -R kfl-app:kfl-app /opt/kfl-app

# Setup PostgreSQL
print_status "Configuring PostgreSQL..."
systemctl start postgresql
systemctl enable postgresql

# Create database and user
print_status "Setting up database..."
sudo -u postgres psql -c "CREATE DATABASE kfl_db;" || print_warning "Database might already exist"
sudo -u postgres psql -c "CREATE USER kfl_user WITH PASSWORD 'kfl_secure_password';" || print_warning "User might already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kfl_db TO kfl_user;"
sudo -u postgres psql -c "ALTER USER kfl_user CREATEDB;"

# Configure PostgreSQL for local connections
print_status "Configuring PostgreSQL authentication..."
PG_VERSION=$(sudo -u postgres psql -t -c "SELECT version();" | grep -oP '\d+\.\d+' | head -1)
PG_CONFIG="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"

# Backup original config
cp "$PG_CONFIG" "$PG_CONFIG.backup"

# Add local connection for kfl-app user
echo "local   kfl_db    kfl_user    md5" >> "$PG_CONFIG"
echo "host    kfl_db    kfl_user    127.0.0.1/32    md5" >> "$PG_CONFIG"

# Restart PostgreSQL
systemctl restart postgresql

# Setup firewall
print_status "Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 8000/tcp

# Create systemd service file
print_status "Creating systemd service..."
cat > /etc/systemd/system/kfl-backend.service << 'EOF'
[Unit]
Description=KFL Django Backend
After=network.target postgresql.service

[Service]
Type=exec
User=kfl-app
Group=kfl-app
WorkingDirectory=/opt/kfl-app/backend/server
Environment=DJANGO_SETTINGS_MODULE=server.settings_prod
ExecStart=/opt/kfl-app/backend-env/bin/python manage.py runserver 0.0.0.0:8000
Restart=always
RestartSec=3
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Create backup script
print_status "Creating backup script..."
cat > /opt/kfl-app/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/kfl-app/backups"
mkdir -p "$BACKUP_DIR"

# Database backup
pg_dump -h localhost -U kfl_user kfl_db > "$BACKUP_DIR/db_backup_$DATE.sql"

# Media files backup
tar -czf "$BACKUP_DIR/media_backup_$DATE.tar.gz" -C /opt/kfl-app/backend/server media/

# Cleanup old backups (keep last 7 days)
find "$BACKUP_DIR" -name "db_backup_*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "media_backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /opt/kfl-app/backup-db.sh
chown kfl-app:kfl-app /opt/kfl-app/backup-db.sh

# Setup log rotation
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/kfl-app << 'EOF'
/opt/kfl-app/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 kfl-app kfl-app
    postrotate
        systemctl reload kfl-backend
    endscript
}
EOF

# Create environment file template
print_status "Creating environment file template..."
cat > /opt/kfl-app/.env.template << 'EOF'
# Django Settings
SECRET_KEY=your-super-secret-key-here-change-this-in-production
DEBUG=False
ALLOWED_HOSTS=ogbar.in,www.ogbar.in,localhost

# Database
DB_NAME=kfl_db
DB_USER=kfl_user
DB_PASSWORD=kfl_secure_password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://ogbar.in,https://www.ogbar.in

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=kfl-app-password
DEFAULT_FROM_EMAIL=noreply@ogbar.in

# Frontend API URL
VITE_API_URL=https://ogbar.in/api
EOF

chown kfl-app:kfl-app /opt/kfl-app/.env.template

# Setup cron jobs
print_status "Setting up automated backups..."
(crontab -u kfl-app -l 2>/dev/null; echo "0 2 * * * /opt/kfl-app/backup-db.sh") | crontab -u kfl-app -

# Install PM2 for process management (optional)
print_status "Installing PM2 for process management..."
npm install -g pm2

# Create PM2 ecosystem file
cat > /opt/kfl-app/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'kfl-backend',
    script: 'manage.py',
    cwd: '/opt/kfl-app/backend/server',
    interpreter: '/opt/kfl-app/backend-env/bin/python',
    args: 'runserver 0.0.0.0:8000',
    env: {
      DJANGO_SETTINGS_MODULE: 'server.settings_prod'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/opt/kfl-app/logs/backend-error.log',
    out_file: '/opt/kfl-app/logs/backend-out.log',
    log_file: '/opt/kfl-app/logs/backend-combined.log',
    time: true
  }]
};
EOF

chown kfl-app:kfl-app /opt/kfl-app/ecosystem.config.js

print_header "SETUP COMPLETED SUCCESSFULLY!"

print_status "Next steps:"
echo "1. Clone your repository to /opt/kfl-app/frontend and /opt/kfl-app/backend"
echo "2. Copy .env.template to .env and configure your settings"
echo "3. Setup your virtual environment and install dependencies"
echo "4. Run database migrations"
echo "5. Configure Nginx with your domain"
echo "6. Setup SSL certificate with Let's Encrypt"
echo "7. Start your services"

print_status "Useful commands:"
echo "- Check service status: sudo systemctl status kfl-app-backend"
echo "- View logs: sudo journalctl -u kfl-app-backend -f"
echo "- Restart service: sudo systemctl restart kfl-app-backend"
echo "- Run backup: /opt/kfl-app/backup-db.sh"

print_warning "Remember to:"
echo "- Change default passwords"
echo "- Configure your domain in .env file"
echo "- Setup SSL certificate"
echo "- Test your application thoroughly"

print_status "Server setup completed! 🎉"
