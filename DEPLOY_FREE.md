# 🚀 FREE Deployment - Frontend + Backend

## ✅ **100% FREE Deployment Options**

### **Frontend (React/Vite)**
- ✅ **Vercel** - FREE (unlimited)
- ✅ **Netlify** - FREE (100GB bandwidth/month)

### **Backend (Django)**
- ✅ **Render** - FREE (750 hours/month)
- ✅ **Vercel Serverless** - FREE (100GB bandwidth/month)

## 🎯 **Quick Deploy (5 minutes)**

### **Step 1: Deploy Frontend to Vercel (FREE)**

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

### **Step 2: Deploy Frontend to Netlify (FREE)**

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

### **Step 3: Deploy Backend to Render (FREE)**

1. **Go to**: https://render.com
2. **Sign in** with GitHub
3. **Click**: "New +" → "Web Service"
4. **Connect**: GitHub → `Ram-91779030/KFL`
5. **Settings**:
   - Name: `kfl-backend`
   - Environment: `Python 3`
   - Root Directory: `server`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn server.wsgi:application --bind 0.0.0.0:$PORT`
   - Plan: `Free`
6. **Click**: "Create Web Service"
7. **Get URL**: `https://kfl-backend.onrender.com`

## 🔧 **After Deployment - Update Frontend**

Once backend is deployed, update frontend to use real API:

1. **Go to Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. **Add**: `VITE_API_URL` = `https://kfl-backend.onrender.com`
4. **Redeploy**

1. **Go to Netlify Dashboard**
2. **Site settings** → **Environment variables**
3. **Add**: `VITE_API_URL` = `https://kfl-backend.onrender.com`
4. **Redeploy**

## 🎉 **You're Live! (100% FREE)**

- **Frontend**: https://kfl-karshakfoodlife.vercel.app
- **Backend**: https://kfl-backend.onrender.com
- **Admin**: https://kfl-backend.onrender.com/admin

## 💰 **Cost Breakdown:**

- **Vercel**: FREE (unlimited personal projects)
- **Netlify**: FREE (100GB bandwidth/month)
- **Render**: FREE (750 hours/month)
- **Total Cost**: $0/month

## 🔑 **For Automatic Deployments (Optional)**

Add these secrets to GitHub for automatic deployments:

### **Vercel Secrets:**
- `VERCEL_TOKEN`: Get from Vercel → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel → Settings → General
- `VERCEL_PROJECT_ID`: Get from Vercel → Project → Settings

### **Netlify Secrets:**
- `NETLIFY_AUTH_TOKEN`: Get from Netlify → User settings → Applications
- `NETLIFY_SITE_ID`: Get from Netlify → Site settings → General

### **Render Secrets:**
- `RENDER_API_KEY`: Get from Render → Account → API Keys
- `RENDER_SERVICE_ID`: Get from Render → Service → Settings

**Once secrets are added, every push to main will auto-deploy! 🚀**

## ⚠️ **Render Free Tier Limits:**

- **750 hours/month** (enough for 24/7 if you're the only user)
- **Sleeps after 15 minutes** of inactivity (wakes up on first request)
- **Cold start**: ~30 seconds to wake up
- **Perfect for**: Personal projects, demos, small businesses

## 🚀 **Alternative: Vercel Serverless Backend**

If you want even faster backend, convert Django to Vercel serverless functions:

1. **Go to**: https://vercel.com
2. **Import**: `Ram-91779030/KFL`
3. **Settings**: Root Directory: `server`
4. **Deploy**: Backend as serverless functions

**Benefits**: No cold starts, faster response times, still FREE!
