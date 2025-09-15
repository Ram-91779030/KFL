# KFL Project Deployment Guide - ogbar.in

This guide is specifically customized for deploying your KFL project from [https://github.com/Ram-91779030/KFL.git](https://github.com/Ram-91779030/KFL.git) to **ogbar.in**.

## 🚀 Quick Deployment Steps

### Step 1: Push Your Code to GitHub

Since your repository at [https://github.com/Ram-91779030/KFL.git](https://github.com/Ram-91779030/KFL.git) is currently empty, let's push your code:

```bash
# Navigate to your project directory
cd "/Users/arya/Desktop/Figma Karshak"

# Initialize git and push to your KFL repository
git init
git add .
git commit -m "Initial commit: KFL React frontend + Django backend e-commerce website"
git remote add origin https://github.com/Ram-91779030/KFL.git
git branch -M main
git push -u origin main
```

### Step 2: Setup GitHub Secrets

In your GitHub repository [https://github.com/Ram-91779030/KFL](https://github.com/Ram-91779030/KFL):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

```
HOST = your-server-ip-address
USERNAME = kfl-app
SSH_KEY = your-private-ssh-key-content
API_URL = https://ogbar.in/api
```

### Step 3: Generate SSH Key for GitHub Actions

```bash
# Generate SSH key for GitHub Actions
ssh-keygen -t rsa -b 4096 -C "github-actions@ogbar.in" -f ~/.ssh/kfl_github_actions

# Copy public key to your server
ssh-copy-id -i ~/.ssh/kfl_github_actions.pub kfl-app@your-server-ip

# Display private key (copy this to GitHub secrets)
cat ~/.ssh/kfl_github_actions
```

### Step 4: Setup Server for KFL Project

```bash
# On your server, run the customized setup
sudo ./setup-server.sh

# The setup script will create:
# - User: kfl-app
# - Directory: /opt/kfl-app
# - Service: kfl-backend
```

### Step 5: Clone KFL Repository on Server

```bash
# Switch to kfl-app user
sudo su - kfl-app
cd /opt/kfl-app

# Clone your KFL repository
git clone https://github.com/Ram-91779030/KFL.git frontend
git clone https://github.com/Ram-91779030/KFL.git backend
```

### Step 6: Configure Environment for ogbar.in

```bash
# Copy and configure environment file
cp env.example .env
nano .env
```

Update the `.env` file with your specific settings:
```bash
# Django Settings
SECRET_KEY=your-super-secret-key-for-kfl-project
DEBUG=False
ALLOWED_HOSTS=ogbar.in,www.ogbar.in,localhost

# Database
DB_NAME=kfl_db
DB_USER=kfl_user
DB_PASSWORD=your_secure_kfl_password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://ogbar.in,https://www.ogbar.in

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@ogbar.in

# Frontend API URL
VITE_API_URL=https://ogbar.in/api
```

### Step 7: Setup Backend

```bash
cd /opt/kfl-app/backend
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

### Step 8: Setup Frontend

```bash
cd /opt/kfl-app/frontend
npm install
npm run build
```

### Step 9: Configure Nginx for ogbar.in

```bash
# Copy the customized nginx config
sudo cp nginx.conf /etc/nginx/sites-available/kfl-app
sudo ln -s /etc/nginx/sites-available/kfl-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 10: Start KFL Services

```bash
# Enable and start the KFL backend service
sudo systemctl enable kfl-backend
sudo systemctl start kfl-backend

# Check service status
sudo systemctl status kfl-backend
```

### Step 11: Setup SSL Certificate for ogbar.in

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate for ogbar.in
sudo certbot --nginx -d ogbar.in -d www.ogbar.in
```

## 🔄 Automated Deployment

Once everything is set up, every time you push to your KFL repository:

```bash
git add .
git commit -m "Update KFL application"
git push origin main
```

GitHub Actions will automatically:
- ✅ Run tests
- ✅ Deploy to your server
- ✅ Update ogbar.in

## 📋 KFL Project Checklist

- [ ] KFL repository created and code pushed
- [ ] GitHub secrets configured
- [ ] SSH key generated and added
- [ ] Server setup completed for KFL
- [ ] KFL repository cloned on server
- [ ] Environment configured for ogbar.in
- [ ] Backend setup completed
- [ ] Frontend built
- [ ] Nginx configured for ogbar.in
- [ ] KFL services started
- [ ] SSL certificate installed for ogbar.in
- [ ] GitHub Actions working
- [ ] ogbar.in tested and working

## 🆘 Troubleshooting KFL Deployment

### Check KFL Service Status
```bash
# SSH into your server
ssh kfl-app@your-server-ip

# Check KFL service status
sudo systemctl status kfl-backend
sudo systemctl status nginx

# View KFL logs
sudo journalctl -u kfl-backend -f
```

### Test KFL Application
```bash
# Test backend API
curl http://localhost:8000/api/

# Test frontend
curl http://localhost/

# Test ogbar.in
curl https://ogbar.in/
```

### Manual KFL Deployment
```bash
# If GitHub Actions fails, deploy manually
ssh kfl-app@your-server-ip "cd /opt/kfl-app && ./deploy-from-github.sh"
```

## 🎯 KFL Project Structure

Your deployed KFL project will have:
- **Frontend**: React app served from `/opt/kfl-app/frontend/build`
- **Backend**: Django API running on port 8000
- **Database**: PostgreSQL with KFL data
- **Domain**: https://ogbar.in
- **SSL**: Let's Encrypt certificate
- **Monitoring**: Automated via GitHub Actions

## 🚀 Your KFL Project is Ready!

Once deployed, your KFL e-commerce website will be live at:
- **Main site**: https://ogbar.in
- **API**: https://ogbar.in/api/
- **Admin**: https://ogbar.in/admin/

Every time you push changes to [https://github.com/Ram-91779030/KFL.git](https://github.com/Ram-91779030/KFL.git), your ogbar.in website will be automatically updated! 🎉
