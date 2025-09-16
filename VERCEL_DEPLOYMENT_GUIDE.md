# ⚡ Vercel Deployment Guide - FREE TIER

This guide will help you deploy your KFL e-commerce website to Vercel for FREE!

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (FREE)
3. **Your project** - Should be pushed to GitHub

## 🎯 What We're Deploying

- **Frontend**: React + Vite application (Static Site)
- **Backend**: Python FastAPI application (Serverless Functions)

## 📝 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Ensure you have these files in your root directory:
   - `vercel.json` ✅ (Already created)
   - `requirements.txt` ✅ (Already created)
   - `api/main.py` ✅ (Already created)
   - `package.json` ✅ (Already exists)

### Step 2: Deploy to Vercel

#### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project? → No
   - Project name → `kfl-ecommerce`
   - Directory → `./` (current directory)
   - Override settings? → No

#### Method 2: GitHub Integration

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select your repository

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Step 3: Verify Deployment

After deployment, you'll get a URL like:
- **Your Site**: `https://kfl-ecommerce.vercel.app`

Test your endpoints:
- **API Health**: `https://kfl-ecommerce.vercel.app/api/health`
- **Products**: `https://kfl-ecommerce.vercel.app/api/products`
- **Categories**: `https://kfl-ecommerce.vercel.app/api/categories`

### Step 4: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## 🔧 Free Tier Limitations

### Vercel Free Tier:
- **100GB bandwidth/month**
- **Unlimited deployments**
- **Serverless functions**: 100GB-hours/month
- **Edge functions**: 500,000 invocations/month
- **Build minutes**: 6,000 minutes/month

### Tips for Free Tier:
1. **Optimize your builds** to use fewer minutes
2. **Use static assets** efficiently
3. **Monitor your usage** in the dashboard

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**
   ```bash
   # Test build locally
   npm run build
   ```

2. **API Functions Not Working:**
   - Check `vercel.json` configuration
   - Ensure `api/main.py` is in the correct location
   - Verify Python dependencies in `requirements.txt`

3. **CORS Issues:**
   - Check CORS settings in `api/main.py`
   - Ensure `allow_origins=["*"]` is set for development

4. **Static Files Not Loading:**
   - Check `vercel.json` routes configuration
   - Ensure assets are in the `build` directory

### Debug Commands:

```bash
# Test your build locally
npm run build

# Test your API locally
cd api
python main.py

# Test Vercel build locally
vercel dev
```

## 📊 Monitoring Your Deployment

1. **Vercel Dashboard:**
   - View deployment logs
   - Monitor performance metrics
   - Check function invocations

2. **Analytics:**
   - View page views and performance
   - Monitor Core Web Vitals
   - Check function execution times

## 🎉 Success!

Once deployed, your KFL e-commerce website will be live at:
- **Your Site**: `https://kfl-ecommerce.vercel.app`
- **API Endpoints**: `https://kfl-ecommerce.vercel.app/api/*`

## 🔄 Updating Your Deployment

### Automatic Deployments:
1. Push changes to your main branch
2. Vercel automatically redeploys
3. Check deployment status in dashboard

### Manual Deployments:
```bash
vercel --prod
```

## 🛠️ Advanced Configuration

### Environment Variables:
1. **In Vercel Dashboard:**
   - Go to Settings → Environment Variables
   - Add your variables:
     ```
     NODE_ENV=production
     API_URL=https://your-api-url.vercel.app
     ```

### Custom Headers:
Your `vercel.json` already includes:
- Cache headers for static assets
- CORS headers for API
- Security headers

### Performance Optimization:
1. **Image Optimization**: Vercel automatically optimizes images
2. **Edge Functions**: Use for global performance
3. **CDN**: Automatic global CDN

## 💡 Pro Tips

1. **Use Vercel Analytics** for performance insights
2. **Enable Preview Deployments** for testing
3. **Use Edge Functions** for better performance
4. **Optimize bundle size** with Vite
5. **Use Vercel's Image Optimization**

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Serverless Functions Guide](https://vercel.com/docs/functions)
- [Performance Best Practices](https://vercel.com/docs/performance)

---

**Need Help?** Check Vercel's documentation or contact their support team!