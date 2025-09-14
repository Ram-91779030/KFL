# ✅ KFL E-commerce Deployment Checklist

## 📋 Pre-Deployment Checklist

### Server Preparation
- [ ] **Server Requirements Met**
  - [ ] Ubuntu 20.04+ / CentOS 8+ / Amazon Linux 2
  - [ ] Minimum 2GB RAM (4GB recommended)
  - [ ] Minimum 20GB free storage
  - [ ] 2 CPU cores minimum
  - [ ] Public IP with ports 80, 443, 22 open

- [ ] **Domain Configuration**
  - [ ] DNS A records pointing to server IP
  - [ ] karshakfoodlife.in → YOUR_SERVER_IP
  - [ ] karshakfoodlife.com → YOUR_SERVER_IP
  - [ ] ogbar.in → YOUR_SERVER_IP
  - [ ] CNAME records for www subdomains

- [ ] **Software Installation**
  - [ ] Nginx installed and configured
  - [ ] Node.js 18+ installed
  - [ ] Python 3.8+ installed
  - [ ] PostgreSQL installed and running
  - [ ] PM2 installed globally
  - [ ] Certbot installed for SSL

## 🚀 Deployment Steps

### Step 1: Server Setup
- [ ] **System Update**
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- [ ] **Create Application User**
  ```bash
  sudo adduser kflapp
  sudo usermod -aG sudo kflapp
  ```

- [ ] **Setup Project Directory**
  ```bash
  sudo mkdir -p /var/www/kfl
  sudo chown kflapp:kflapp /var/www/kfl
  ```

### Step 2: Code Deployment
- [ ] **Clone Repository**
  ```bash
  cd /var/www/kfl
  git clone https://github.com/yourusername/figma-karshak.git .
  ```

- [ ] **Run Deployment Script**
  ```bash
  chmod +x deploy.sh
  ./deploy.sh
  ```

- [ ] **Verify Build**
  - [ ] Build directory created
  - [ ] All assets present
  - [ ] No build errors

### Step 3: Backend Configuration
- [ ] **Environment Setup**
  ```bash
  cp .env.production .env
  nano .env  # Update with production values
  ```

- [ ] **Database Setup**
  ```bash
  sudo -u postgres createuser kfluser
  sudo -u postgres createdb kfldb
  sudo -u postgres psql -c "ALTER USER kfluser PASSWORD 'yourpassword';"
  ```

- [ ] **Run Migrations**
  ```bash
  cd server
  python manage.py migrate
  python manage.py collectstatic --noinput
  python manage.py createsuperuser
  ```

### Step 4: Web Server Configuration
- [ ] **Nginx Configuration**
  ```bash
  sudo cp nginx.conf /etc/nginx/sites-available/kfl
  sudo ln -s /etc/nginx/sites-available/kfl /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx
  ```

- [ ] **SSL Certificate**
  ```bash
  sudo certbot --nginx -d karshakfoodlife.in -d www.karshakfoodlife.in
  sudo certbot --nginx -d karshakfoodlife.com -d www.karshakfoodlife.com
  sudo certbot --nginx -d ogbar.in -d www.ogbar.in
  ```

### Step 5: Service Management
- [ ] **PM2 Configuration**
  ```bash
  cp ecosystem.config.js /var/www/kfl/
  pm2 start ecosystem.config.js
  pm2 save
  pm2 startup
  ```

- [ ] **Create Log Directory**
  ```bash
  sudo mkdir -p /var/log/kfl
  sudo chown kflapp:kflapp /var/log/kfl
  ```

### Step 6: Security Configuration
- [ ] **Firewall Setup**
  ```bash
  sudo ufw allow 22
  sudo ufw allow 80
  sudo ufw allow 443
  sudo ufw enable
  ```

- [ ] **File Permissions**
  ```bash
  sudo chown -R kflapp:kflapp /var/www/kfl
  sudo chmod -R 755 /var/www/kfl
  sudo chmod 600 /var/www/kfl/.env
  ```

## 🧪 Testing Checklist

### Frontend Testing
- [ ] **Main Domain**
  - [ ] https://karshakfoodlife.in loads correctly
  - [ ] All pages accessible
  - [ ] Navigation works
  - [ ] Responsive design works
  - [ ] Scroll progress bar visible

- [ ] **Alternative Domain**
  - [ ] https://karshakfoodlife.com redirects to main domain
  - [ ] www subdomains work

- [ ] **OG Bar Subdomain**
  - [ ] https://ogbar.in loads correctly
  - [ ] OG-specific content displays

### Backend Testing
- [ ] **API Endpoints**
  - [ ] https://karshakfoodlife.in/api/ accessible
  - [ ] Products API working
  - [ ] Authentication working
  - [ ] CORS configured correctly

- [ ] **Admin Interface**
  - [ ] https://karshakfoodlife.in/admin/ accessible
  - [ ] Can login with superuser
  - [ ] All admin functions working

### Performance Testing
- [ ] **Page Load Speed**
  - [ ] Homepage loads under 3 seconds
  - [ ] Product pages load under 2 seconds
  - [ ] Images optimized and loading

- [ ] **Mobile Performance**
  - [ ] Mobile site loads quickly
  - [ ] Touch interactions work
  - [ ] Responsive design functional

### SEO Testing
- [ ] **Meta Tags**
  - [ ] Page titles correct
  - [ ] Meta descriptions present
  - [ ] Open Graph tags working

- [ ] **SEO Files**
  - [ ] https://karshakfoodlife.in/robots.txt accessible
  - [ ] https://karshakfoodlife.in/sitemap.xml accessible
  - [ ] Structured data present

## 🔧 Post-Deployment Tasks

### Monitoring Setup
- [ ] **Service Monitoring**
  - [ ] PM2 monitoring configured
  - [ ] Nginx status monitoring
  - [ ] Database monitoring

- [ ] **Log Monitoring**
  - [ ] Application logs accessible
  - [ ] Error logs monitored
  - [ ] Access logs analyzed

### Backup Configuration
- [ ] **Automated Backups**
  ```bash
  chmod +x backup.sh
  # Add to crontab: 0 2 * * * /var/www/kfl/backup.sh
  ```

- [ ] **Backup Testing**
  - [ ] Database backup works
  - [ ] Media files backup works
  - [ ] Restore process tested

### Maintenance Tasks
- [ ] **SSL Certificate Renewal**
  ```bash
  sudo certbot renew --dry-run
  # Add to crontab: 0 12 * * * /usr/bin/certbot renew --quiet
  ```

- [ ] **System Updates**
  - [ ] Regular security updates scheduled
  - [ ] Dependency updates planned

## 🚨 Emergency Procedures

### Service Recovery
- [ ] **Backend Service**
  ```bash
  pm2 restart kfl-backend
  pm2 logs kfl-backend
  ```

- [ ] **Web Server**
  ```bash
  sudo systemctl restart nginx
  sudo systemctl status nginx
  ```

- [ ] **Database**
  ```bash
  sudo systemctl restart postgresql
  sudo systemctl status postgresql
  ```

### Rollback Procedure
- [ ] **Previous Version**
  ```bash
  git checkout previous-stable-commit
  ./deploy.sh
  pm2 restart kfl-backend
  ```

- [ ] **Database Rollback**
  ```bash
  # Restore from backup
  gunzip /var/backups/kfl/db_backup_YYYYMMDD_HHMMSS.sql.gz
  psql kfldb < /var/backups/kfl/db_backup_YYYYMMDD_HHMMSS.sql
  ```

## 📊 Performance Metrics

### Key Performance Indicators
- [ ] **Page Load Times**
  - [ ] Homepage: < 3 seconds
  - [ ] Product pages: < 2 seconds
  - [ ] API responses: < 500ms

- [ ] **Uptime Monitoring**
  - [ ] 99.9% uptime target
  - [ ] Monitoring alerts configured
  - [ ] Response time monitoring

- [ ] **Error Rates**
  - [ ] < 1% error rate
  - [ ] 404 errors monitored
  - [ ] 500 errors tracked

## 🎉 Go-Live Checklist

### Final Verification
- [ ] **All Tests Pass**
  - [ ] Frontend tests pass
  - [ ] Backend tests pass
  - [ ] Integration tests pass

- [ ] **Performance Acceptable**
  - [ ] Load times within targets
  - [ ] Mobile performance good
  - [ ] SEO scores acceptable

- [ ] **Security Verified**
  - [ ] SSL certificates valid
  - [ ] Security headers present
  - [ ] No vulnerabilities detected

- [ ] **Monitoring Active**
  - [ ] All monitoring systems active
  - [ ] Alerts configured
  - [ ] Backup systems working

### Launch Day
- [ ] **DNS Propagation**
  - [ ] All domains resolving correctly
  - [ ] SSL certificates working
  - [ ] No DNS issues

- [ ] **Final Testing**
  - [ ] End-to-end user journey
  - [ ] Payment processing (if applicable)
  - [ ] Contact forms working

- [ ] **Team Communication**
  - [ ] All team members notified
  - [ ] Support team ready
  - [ ] Documentation updated

---

## 🎊 **CONGRATULATIONS!**

**Your KFL E-commerce website is now live and ready to serve customers!**

### Quick Access URLs:
- **Main Site**: https://karshakfoodlife.in
- **Alternative**: https://karshakfoodlife.com
- **OG Bar**: https://ogbar.in
- **Admin**: https://karshakfoodlife.in/admin/

### Support Contacts:
- **Technical Issues**: [Your technical support email]
- **Business Inquiries**: [Your business email]
- **Emergency**: [Your emergency contact]

**Remember to monitor the site closely for the first 24-48 hours after launch!**
