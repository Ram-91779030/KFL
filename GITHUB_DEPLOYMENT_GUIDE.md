# GitHub Deployment Guide - Complete Setup

This guide will help you deploy your React + Django project to GitHub and set up automated deployment.

## Table of Contents
1. [GitHub Repository Setup](#github-repository-setup)
2. [Push Your Code to GitHub](#push-your-code-to-github)
3. [GitHub Actions CI/CD](#github-actions-cicd)
4. [GitHub Pages for Frontend](#github-pages-for-frontend)
5. [Server Deployment from GitHub](#server-deployment-from-github)
6. [Environment Variables Setup](#environment-variables-setup)

## GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `your-ecommerce-website` (or your preferred name)
   - **Description**: `React Frontend + Django Backend E-commerce Website`
   - **Visibility**: Choose Public or Private
   - **Initialize**: Don't check any boxes (we'll push existing code)

### Step 2: Prepare Your Local Repository

```bash
# Navigate to your project directory
cd "/Users/arya/Desktop/Figma Karshak"

# Initialize git if not already done
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: React frontend + Django backend e-commerce website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Push Your Code to GitHub

### Step 3: Create .gitignore File

Create a `.gitignore` file to exclude sensitive and unnecessary files:

```bash
# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Production builds
build/
dist/

# Environment variables
.env
.env.local
.env.production
.env.staging

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/
backend-env/

# Django
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal
media/
staticfiles/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/
EOF
```

### Step 4: Remove Sensitive Files and Push

```bash
# Remove any sensitive files that might have been added
rm -f .env
rm -f server/.env
rm -f server/db.sqlite3

# Add .gitignore
git add .gitignore

# Commit and push
git add .
git commit -m "Add .gitignore and remove sensitive files"
git push origin main
```

## GitHub Actions CI/CD

### Step 5: Create GitHub Actions Workflow

Create the directory structure and workflow file:

```bash
# Create GitHub Actions directory
mkdir -p .github/workflows

# Create CI/CD workflow
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install frontend dependencies
      run: npm install
    
    - name: Build frontend
      run: npm run build
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install backend dependencies
      run: |
        cd server
        pip install -r requirements.txt
    
    - name: Run backend tests
      run: |
        cd server
        export DJANGO_SETTINGS_MODULE=server.settings
        python manage.py test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /opt/your-app
          sudo -u your-app ./deploy.sh
EOF
```

### Step 6: Create Frontend Build Workflow

```bash
cat > .github/workflows/build-frontend.yml << 'EOF'
name: Build and Deploy Frontend

on:
  push:
    branches: [ main ]
    paths: [ 'src/**', 'public/**', 'package.json', 'vite.config.ts' ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build for production
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.API_URL }}
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /opt/your-app/frontend
          git pull origin main
          npm install
          npm run build
          sudo systemctl reload nginx
EOF
```

## GitHub Pages for Frontend (Alternative)

### Step 7: Setup GitHub Pages

If you want to use GitHub Pages for the frontend:

```bash
# Create GitHub Pages workflow
cat > .github/workflows/github-pages.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './build'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
EOF
```

## Server Deployment from GitHub

### Step 8: Setup Server to Pull from GitHub

Update your server deployment script to work with GitHub:

```bash
# Update deploy.sh to work with GitHub
cat > deploy-from-github.sh << 'EOF'
#!/bin/bash

# Deployment script that pulls from GitHub
set -e

APP_DIR="/opt/your-app"
FRONTEND_DIR="$APP_DIR/frontend"
BACKEND_DIR="$APP_DIR/backend"
VENV_DIR="$APP_DIR/backend-env"
SERVICE_NAME="your-app-backend"
GITHUB_REPO="https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git"

echo "🚀 Starting deployment from GitHub..."

# Frontend deployment
echo "Deploying frontend..."
cd "$FRONTEND_DIR"
git pull origin main
npm install
npm run build

# Backend deployment
echo "Deploying backend..."
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
sudo systemctl restart "$SERVICE_NAME"
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
EOF

chmod +x deploy-from-github.sh
```

## Environment Variables Setup

### Step 9: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

```
HOST=your-server-ip-address
USERNAME=your-app
SSH_KEY=your-private-ssh-key
API_URL=https://your-domain.com/api
```

### Step 10: Generate SSH Key for GitHub Actions

```bash
# On your local machine, generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions@your-domain.com" -f ~/.ssh/github_actions

# Copy public key to server
ssh-copy-id -i ~/.ssh/github_actions.pub your-app@your-server-ip

# Add private key to GitHub secrets (copy the content of ~/.ssh/github_actions)
cat ~/.ssh/github_actions
```

## Complete Deployment Commands

### Step 11: Final Setup Commands

```bash
# 1. Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: Complete e-commerce website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main

# 2. On your server, clone the repository
sudo su - your-app
cd /opt/your-app
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git frontend
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git backend

# 3. Setup environment
cp env.example .env
nano .env  # Configure your settings

# 4. Setup backend
cd backend
python3.11 -m venv backend-env
source backend-env/bin/activate
pip install -r server/requirements.txt
cd server
export DJANGO_SETTINGS_MODULE=server.settings_prod
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser

# 5. Setup frontend
cd ../../frontend
npm install
npm run build

# 6. Configure and start services
sudo cp nginx.conf /etc/nginx/sites-available/your-app
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl enable your-app-backend
sudo systemctl start your-app-backend

# 7. Setup SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Automated Deployment

### Step 12: Enable Automated Deployment

Once everything is set up:

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Update application"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Run tests
   - Deploy to your server
   - Update the application

## Monitoring and Maintenance

### Step 13: Monitor Deployments

- Check GitHub Actions tab for deployment status
- Monitor server logs: `sudo journalctl -u your-app-backend -f`
- Check application health: `curl https://your-domain.com/health/`

## Troubleshooting

### Common Issues:

1. **SSH Key Issues**: Make sure the SSH key is properly added to GitHub secrets
2. **Permission Issues**: Ensure the `your-app` user has proper permissions
3. **Build Failures**: Check the GitHub Actions logs for specific errors
4. **Server Connection**: Verify the server IP and SSH access

### Useful Commands:

```bash
# Check GitHub Actions status
gh run list

# View deployment logs
gh run view --log

# Manual deployment
ssh your-app@your-server-ip "cd /opt/your-app && ./deploy-from-github.sh"
```

## Summary

Your deployment setup now includes:

✅ **GitHub Repository** with your code  
✅ **GitHub Actions CI/CD** for automated testing and deployment  
✅ **Server Integration** that pulls from GitHub  
✅ **Environment Management** with secrets  
✅ **Automated Frontend Builds**  
✅ **Database Migrations**  
✅ **SSL Certificate Management**  
✅ **Monitoring and Logging**  

Every time you push to the `main` branch, your application will be automatically tested and deployed to your server! 🚀
