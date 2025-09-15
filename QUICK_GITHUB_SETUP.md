# Quick GitHub Setup - Step by Step

## 🚀 Quick Start Commands

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "+" → "New repository"
3. Name: `your-ecommerce-website`
4. Description: `React Frontend + Django Backend E-commerce Website`
5. Choose Public or Private
6. **Don't** initialize with README (we have existing code)
7. Click "Create repository"

### Step 2: Push Your Code to GitHub

```bash
# Navigate to your project
cd "/Users/arya/Desktop/Figma Karshak"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React frontend + Django backend e-commerce website"

# Add GitHub remote (replace YOUR_USERNAME and YOUR_REPOSITORY)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Setup GitHub Secrets

In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

```
HOST = your-server-ip-address
USERNAME = your-app
SSH_KEY = your-private-ssh-key-content
API_URL = https://your-domain.com/api
```

### Step 4: Generate SSH Key for GitHub Actions

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions@your-domain.com" -f ~/.ssh/github_actions

# Copy public key to server
ssh-copy-id -i ~/.ssh/github_actions.pub your-app@your-server-ip

# Display private key (copy this to GitHub secrets)
cat ~/.ssh/github_actions
```

### Step 5: Setup Server

```bash
# On your server, run initial setup
sudo ./setup-server.sh

# Clone your repository
sudo su - your-app
cd /opt/your-app
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git frontend
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git backend

# Setup environment
cp env.example .env
nano .env  # Configure your settings

# Setup backend
cd backend
python3.11 -m venv backend-env
source backend-env/bin/activate
pip install -r server/requirements.txt
cd server
export DJANGO_SETTINGS_MODULE=server.settings_prod
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser

# Setup frontend
cd ../../frontend
npm install
npm run build

# Configure and start services
sudo cp nginx.conf /etc/nginx/sites-available/your-app
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl enable your-app-backend
sudo systemctl start your-app-backend

# Setup SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔄 Automated Deployment

Once everything is set up, every time you push to GitHub:

```bash
git add .
git commit -m "Update application"
git push origin main
```

GitHub Actions will automatically:
- ✅ Run tests
- ✅ Deploy to your server
- ✅ Update the application

## 📋 Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub secrets configured
- [ ] SSH key generated and added
- [ ] Server setup completed
- [ ] Repository cloned on server
- [ ] Environment configured
- [ ] Backend setup completed
- [ ] Frontend built
- [ ] Nginx configured
- [ ] Services started
- [ ] SSL certificate installed
- [ ] GitHub Actions working
- [ ] Application tested

## 🆘 Troubleshooting

### Check GitHub Actions
- Go to your repository → **Actions** tab
- Check if workflows are running
- View logs for any errors

### Check Server Status
```bash
# SSH into your server
ssh your-app@your-server-ip

# Check service status
sudo systemctl status your-app-backend
sudo systemctl status nginx

# View logs
sudo journalctl -u your-app-backend -f
```

### Manual Deployment
```bash
# If GitHub Actions fails, deploy manually
ssh your-app@your-server-ip "cd /opt/your-app && ./deploy-from-github.sh"
```

## 🎉 You're Done!

Your application is now:
- ✅ Hosted on GitHub
- ✅ Automatically deployed on every push
- ✅ Running on your server
- ✅ Secured with SSL
- ✅ Monitored and maintained

Every time you make changes and push to GitHub, your live website will be automatically updated! 🚀
