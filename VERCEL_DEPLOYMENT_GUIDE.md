# Vercel Deployment Guide for KFL Project

This guide will help you deploy both your React frontend and Python backend to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm install -g vercel`
3. **GitHub Repository**: Your code should be pushed to GitHub

## Project Structure

```
├── src/                    # React frontend
├── api/                    # Python backend API
│   ├── simple.py          # Main API handler
│   └── requirements.txt   # Python dependencies
├── server/                # Django backend (optional)
├── vercel.json           # Vercel configuration
└── package.json          # Frontend dependencies
```

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Project Root
```bash
cd "/Users/ram/Desktop/Figma Karshak"
vercel
```

### 4. Follow the Prompts
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (for first deployment)
- **Project name** → kfl-ecommerce (or your preferred name)
- **Directory** → ./
- **Override settings?** → No

### 5. Environment Variables (Optional)
If you need environment variables:
```bash
vercel env add VITE_API_URL
vercel env add SECRET_KEY
```

## Configuration Details

### Frontend Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Framework**: Vite + React

### Backend Configuration
- **Runtime**: Python 3.9
- **API Routes**: `/api/*` → `api/simple.py`
- **CORS**: Enabled for all origins

### API Endpoints
- `GET /api/` - Health check
- `GET /api/products` - Product list
- `GET /api/categories` - Category list
- `POST /api/*` - Generic POST handler

## Testing Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **API Health**: Visit `https://your-app.vercel.app/api/`
3. **Products**: Visit `https://your-app.vercel.app/api/products`
4. **Categories**: Visit `https://your-app.vercel.app/api/categories`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check `package.json` scripts
   - Ensure all dependencies are listed
   - Verify Node.js version compatibility

2. **API Not Working**
   - Check `vercel.json` routes configuration
   - Verify Python function syntax
   - Check Vercel function logs

3. **CORS Issues**
   - API includes CORS headers
   - Frontend uses relative URLs in production

### Viewing Logs
```bash
vercel logs
```

### Redeploying
```bash
vercel --prod
```

## Production Considerations

1. **Database**: Consider using a cloud database (PostgreSQL, MongoDB)
2. **File Storage**: Use cloud storage for images (AWS S3, Cloudinary)
3. **Environment Variables**: Set production secrets in Vercel dashboard
4. **Custom Domain**: Configure in Vercel dashboard

## Next Steps

1. Set up a production database
2. Configure file uploads to cloud storage
3. Set up monitoring and analytics
4. Configure custom domain
5. Set up CI/CD with GitHub integration

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/functions/serverless-functions/runtimes/python)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
