# Server Deployment Troubleshooting Guide

## 🚨 Current Issue: "Deploy to server" Step Failed

The GitHub Actions workflow is failing at the SSH deployment step. Here's how to fix it:

## 🔧 **Step 1: Check GitHub Secrets**

Your repository needs these secrets configured in GitHub:

### Required Secrets:
1. **`HOST`** - Your server's IP address or domain
2. **`USERNAME`** - SSH username (usually `root` or `ubuntu`)
3. **`SSH_KEY`** - Private SSH key for server access

### How to Add Secrets:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

## 🔑 **Step 2: Generate SSH Key (if needed)**

If you don't have an SSH key set up:

```bash
# Generate new SSH key
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy public key to server
ssh-copy-id username@your-server-ip

# Test connection
ssh username@your-server-ip
```

## 🖥️ **Step 3: Server Setup Requirements**

Your server needs:

### Directory Structure:
```
/opt/kfl-app/
├── frontend/          # React app
├── backend/           # Django app
├── backend-env/       # Python virtual environment
└── deploy-from-github.sh  # Deployment script
```

### Required Services:
- **Nginx** - Web server
- **Systemd service** - For Django backend
- **Git** - For pulling code
- **Node.js** - For frontend build
- **Python 3.11** - For Django backend

## 🛠️ **Step 4: Fix Common Issues**

### Issue 1: SSH Connection Failed
```bash
# Test SSH connection manually
ssh -i /path/to/private/key username@your-server-ip

# Check if SSH key is correct
ssh-keygen -y -f /path/to/private/key
```

### Issue 2: Deployment Script Not Found
```bash
# On your server, create the directory structure
sudo mkdir -p /opt/kfl-app
sudo chown -R kfl-app:kfl-app /opt/kfl-app

# Copy deployment script
sudo cp deploy-from-github.sh /opt/kfl-app/
sudo chmod +x /opt/kfl-app/deploy-from-github.sh
```

### Issue 3: Service Not Running
```bash
# Check service status
sudo systemctl status kfl-backend
sudo systemctl status nginx

# Start services if needed
sudo systemctl start kfl-backend
sudo systemctl start nginx
```

## 🚀 **Step 5: Alternative Deployment Options**

### Option A: Use the Fixed Workflow
I've created `deploy-fixed.yml` with better error handling and debugging.

### Option B: Deploy to Vercel Instead
Since you already have Vercel configured, you can deploy there instead:

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

### Option C: Manual Deployment
Deploy manually to your server:

```bash
# On your local machine
git push origin main

# On your server
cd /opt/kfl-app
git pull origin main
./deploy-from-github.sh
```

## 🔍 **Step 6: Debug the Current Issue**

To debug the current failure:

1. **Check GitHub Actions logs**:
   - Go to your repository → Actions tab
   - Click on the failed workflow
   - Look at the "Deploy to server" step logs

2. **Common error messages**:
   - `Permission denied (publickey)` → SSH key issue
   - `Connection refused` → Server not accessible
   - `No such file or directory` → Script not found
   - `Command not found` → Missing dependencies

## 📋 **Quick Fix Checklist**

- [ ] GitHub secrets configured (`HOST`, `USERNAME`, `SSH_KEY`)
- [ ] SSH key works manually
- [ ] Server has required directories
- [ ] Deployment script exists and is executable
- [ ] Required services are running
- [ ] Server has internet access for git pull

## 🆘 **Need Help?**

If you're still having issues:

1. **Share the error logs** from GitHub Actions
2. **Test SSH connection** manually
3. **Check server status** and logs
4. **Consider using Vercel** for easier deployment

## 🎯 **Recommended Next Steps**

1. **Immediate**: Check and fix GitHub secrets
2. **Short-term**: Use the fixed workflow I created
3. **Long-term**: Consider Vercel deployment for easier management
