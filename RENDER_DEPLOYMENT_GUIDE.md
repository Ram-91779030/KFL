# 🚀 Render Deployment Guide - FREE TIER

This guide will help you deploy your KFL e-commerce website to Render for FREE!

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (FREE)
3. **Your project** - Should be pushed to GitHub

## 🎯 What We're Deploying

- **Frontend**: React + Vite application (Static Site)
- **Backend**: Python FastAPI application (Web Service)

## 📝 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Ensure you have these files in your root directory:
   - `render.yaml` ✅ (Already created)
   - `requirements.txt` ✅ (Already created)
   - `api/main.py` ✅ (Already created)
   - `package.json` ✅ (Already exists)

### Step 2: Deploy to Render

#### Option A: Using render.yaml (Recommended)

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create New Blueprint**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Select your repository
   - Click "Apply"

3. **Render will automatically:**
   - Detect the `render.yaml` file
   - Create both frontend and backend services
   - Deploy everything automatically

#### Option B: Manual Deployment

**Deploy Frontend (Static Site):**

1. **New Static Site**
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Select your repository

2. **Configure Build Settings:**
   ```
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Environment Variables:**
   ```
   NODE_ENV=production
   ```

**Deploy Backend (Web Service):**

1. **New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select your repository

2. **Configure Settings:**
   ```
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python api/main.py
   ```

3. **Environment Variables:**
   ```
   PYTHON_VERSION=3.11.0
   NODE_ENV=production
   ```

### Step 3: Update Frontend API URLs

After deployment, you'll get URLs like:
- Frontend: `https://kfl-frontend.onrender.com`
- Backend: `https://kfl-backend.onrender.com`

Update your frontend to use the backend URL:

1. **Find your API configuration file** (likely in `src/api/` or `src/config/`)
2. **Update the base URL** to point to your Render backend URL

### Step 4: Configure Custom Domain (Optional)

1. **In Render Dashboard:**
   - Go to your service
   - Click "Settings" → "Custom Domains"
   - Add your domain
   - Follow DNS configuration instructions

## 🔧 Free Tier Limitations

### Render Free Tier:
- **750 hours/month** (enough for 24/7 uptime)
- **Sleeps after 15 minutes** of inactivity
- **Cold start** takes ~30 seconds
- **512MB RAM**
- **0.1 CPU**

### Tips for Free Tier:
1. **Keep services active** by using a monitoring service
2. **Optimize your app** for faster cold starts
3. **Use static assets** efficiently

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check `package.json` scripts
   - Ensure all dependencies are listed
   - Check Node.js version compatibility

2. **API Not Working:**
   - Verify CORS settings in `api/main.py`
   - Check environment variables
   - Ensure FastAPI is properly configured

3. **Frontend Can't Connect to Backend:**
   - Update API URLs in frontend code
   - Check CORS configuration
   - Verify backend is deployed and running

### Debug Commands:

```bash
# Test your build locally
npm run build

# Test your API locally
cd api
python main.py
```

## 📊 Monitoring Your Deployment

1. **Render Dashboard:**
   - View logs in real-time
   - Monitor performance metrics
   - Check deployment status

2. **Health Checks:**
   - Frontend: Visit your site URL
   - Backend: Visit `https://your-backend-url.onrender.com/api/health`

## 🎉 Success!

Once deployed, your KFL e-commerce website will be live at:
- **Frontend**: `https://kfl-frontend.onrender.com`
- **Backend API**: `https://kfl-backend.onrender.com`

## 🔄 Updating Your Deployment

To update your site:
1. Push changes to GitHub
2. Render will automatically redeploy
3. Check the deployment logs for any issues

## 💡 Pro Tips

1. **Use environment variables** for configuration
2. **Monitor your usage** to stay within free limits
3. **Set up monitoring** to keep services awake
4. **Optimize images** for faster loading
5. **Use CDN** for static assets (Render provides this automatically)

---

**Need Help?** Check Render's documentation or contact their support team!
