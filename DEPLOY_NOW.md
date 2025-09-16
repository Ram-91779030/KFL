# 🚀 DEPLOY NOW - Step by Step

## 🎯 **Quick Deploy (5 minutes)**

### **Step 1: Deploy Frontend to Vercel**

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Click**: "New Project"
4. **Import**: `Ram-91779030/KFL`
5. **Settings**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
6. **Click**: "Deploy"
7. **Get URL**: `https://kfl-karshakfoodlife.vercel.app`

### **Step 2: Deploy Frontend to Netlify**

1. **Go to**: https://netlify.com
2. **Sign in** with GitHub
3. **Click**: "New site from Git"
4. **Choose**: GitHub → `Ram-91779030/KFL`
5. **Settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `./` (leave default)
6. **Click**: "Deploy site"
7. **Get URL**: `https://kfl-karshakfoodlife.netlify.app`

### **Step 3: Deploy Backend to Railway**

1. **Go to**: https://railway.app
2. **Sign in** with GitHub
3. **Click**: "New Project"
4. **Choose**: "Deploy from GitHub repo"
5. **Select**: `Ram-91779030/KFL`
6. **Settings**:
   - Root Directory: `server`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn server.wsgi:application --bind 0.0.0.0:$PORT`
7. **Click**: "Deploy"
8. **Get URL**: `https://kfl-backend.railway.app`

## 🔧 **After Deployment - Update Frontend**

Once backend is deployed, update frontend to use real API:

1. **Go to Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. **Add**: `VITE_API_URL` = `https://kfl-backend.railway.app`
4. **Redeploy**

1. **Go to Netlify Dashboard**
2. **Site settings** → **Environment variables**
3. **Add**: `VITE_API_URL` = `https://kfl-backend.railway.app`
4. **Redeploy**

## 🎉 **You're Live!**

- **Frontend**: https://kfl-karshakfoodlife.vercel.app
- **Backend**: https://kfl-backend.railway.app
- **Admin**: https://kfl-backend.railway.app/admin

## 🔑 **For Automatic Deployments (Optional)**

Add these secrets to GitHub for automatic deployments:

### **Vercel Secrets:**
- `VERCEL_TOKEN`: Get from Vercel → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel → Settings → General
- `VERCEL_PROJECT_ID`: Get from Vercel → Project → Settings

### **Netlify Secrets:**
- `NETLIFY_AUTH_TOKEN`: Get from Netlify → User settings → Applications
- `NETLIFY_SITE_ID`: Get from Netlify → Site settings → General

### **Railway Secrets:**
- `RAILWAY_TOKEN`: Get from Railway → Account → Tokens
- `RAILWAY_SERVICE_ID`: Get from Railway → Project → Settings

**Once secrets are added, every push to main will auto-deploy! 🚀**