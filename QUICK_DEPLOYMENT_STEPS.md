# Quick Deployment Steps - React + Django

## 🚀 One-Command Deployment

### Step 1: Initial Server Setup
```bash
# On your server (run as root)
wget -O setup-server.sh https://raw.githubusercontent.com/your-username/your-repo/main/setup-server.sh
chmod +x setup-server.sh
sudo ./setup-server.sh
```

### Step 2: Clone Your Repository
```bash
# Switch to your-app user
sudo su - your-app

# Clone your repository
cd /opt/your-app
git clone https://github.com/your-username/your-repo.git frontend
git clone https://github.com/your-username/your-repo.git backend
```

### Step 3: Configure Environment
```bash
# Copy and edit environment file
cp .env.template .env
nano .env
# Update with your actual domain and settings
```

### Step 4: Setup Backend
```bash
cd /opt/your-app/backend
python3.11 -m venv backend-env
source backend-env/bin/activate
pip install -r server/requirements.txt
cd server
export DJANGO_SETTINGS_MODULE=server.settings_prod
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
deactivate
```

### Step 5: Setup Frontend
```bash
cd /opt/your-app/frontend
npm install
npm run build
```

### Step 6: Configure Nginx
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/your-app
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Start Services
```bash
sudo systemctl daemon-reload
sudo systemctl enable your-app-backend
sudo systemctl start your-app-backend
```

### Step 8: Setup SSL
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 9: Security Setup (Optional but Recommended)
```bash
sudo ./security-setup.sh
```

## 🔄 Regular Updates

For future updates, simply run:
```bash
sudo -u your-app /opt/your-app/deploy.sh
```

## 📋 Checklist

- [ ] Server setup completed
- [ ] Repository cloned
- [ ] Environment configured
- [ ] Database migrated
- [ ] Frontend built
- [ ] Nginx configured
- [ ] Services started
- [ ] SSL certificate installed
- [ ] Security setup completed
- [ ] Domain pointing to server
- [ ] Application tested

## 🆘 Troubleshooting

### Check Service Status
```bash
sudo systemctl status your-app-backend
sudo systemctl status nginx
sudo systemctl status postgresql
```

### View Logs
```bash
sudo journalctl -u your-app-backend -f
sudo tail -f /var/log/nginx/error.log
```

### Test Backend API
```bash
curl http://localhost:8000/api/
```

### Test Frontend
```bash
curl http://localhost/
```

## 🔧 Useful Commands

```bash
# Restart services
sudo systemctl restart your-app-backend
sudo systemctl reload nginx

# Check logs
sudo journalctl -u your-app-backend -f
sudo tail -f /opt/your-app/logs/django.log

# Run backup
/opt/your-app/backup-db.sh

# Check security status
sudo fail2ban-client status
sudo ufw status

# Update application
sudo -u your-app /opt/your-app/deploy.sh
```

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all services are running
3. Check firewall and network settings
4. Review the complete deployment guide
5. Test each component individually

Your application should now be live at your domain! 🎉
