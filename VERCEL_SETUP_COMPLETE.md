# 🚀 Vercel Setup - Complete Process

## ✅ **Step 1: Add Vercel Token to GitHub**

1. **Go to**: https://github.com/Ram-91779030/KFL/settings/secrets/actions
2. **Click "New repository secret"**
3. **Add**:
   - **Name**: `VERCEL_TOKEN`
   - **Value**: `BFfwtZhDH01eIlxfH4AR9Sa5`
4. **Click "Add secret"**

## 🔍 **Step 2: Get Organization ID**

1. **Go to**: https://vercel.com/account/tokens
2. **Click on your token** `BFfwtZhDH01eIlxfH4AR9Sa5`
3. **Copy the "Organization ID"** (looks like: `team_xxxxxxxxx`)

## 📁 **Step 3: Get Project ID**

### **Option A: Create New Project**
1. **Go to**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import from GitHub**: `Ram-91779030/KFL`
4. **Project name**: `kfl-karshakfoodlife`
5. **Click "Deploy"**
6. **After deployment**, go to project settings
7. **Copy the "Project ID"** (looks like: `prj_xxxxxxxxx`)

### **Option B: Use Existing Project**
1. **Go to**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to Settings** → **General**
4. **Copy the "Project ID"**

## 🔐 **Step 4: Add All Secrets to GitHub**

Add these 3 secrets to your GitHub repository:

1. ✅ **VERCEL_TOKEN**: `BFfwtZhDH01eIlxfH4AR9Sa5`
2. ⏳ **VERCEL_ORG_ID**: `team_xxxxxxxxx` (get from Step 2)
3. ⏳ **VERCEL_PROJECT_ID**: `prj_xxxxxxxxx` (get from Step 3)

## 🚀 **Step 5: Deploy Automatically**

Once all 3 secrets are added:
1. **Push any change** to main branch
2. **GitHub Actions will run** automatically
3. **Vercel deployment** will start
4. **Your website** will be live!

## 📱 **What You'll Get:**

- ✅ **Live URL**: `https://kfl-karshakfoodlife.vercel.app`
- ✅ **PWA Features**: Installable, offline support
- ✅ **Mock API**: Sample products and categories
- ✅ **HTTPS**: Automatic SSL certificate
- ✅ **Custom Domain Ready**: Add ogbar.in later

## 🎯 **Quick Test:**

After deployment, test these features:
- ✅ **Website loads** - No errors
- ✅ **PWA installable** - "Add to Home Screen" on mobile
- ✅ **Mock data** - Products and categories display
- ✅ **Responsive** - Works on all devices

## 🔧 **Troubleshooting:**

If deployment fails:
1. **Check GitHub Actions** logs
2. **Verify all 3 secrets** are added correctly
3. **Check Vercel dashboard** for errors
4. **Try manual deployment** first

**Ready to complete the setup? Let me know when you have the Organization ID and Project ID!**
