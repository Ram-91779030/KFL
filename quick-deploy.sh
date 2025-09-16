#!/bin/bash

echo "🚀 KFL Quick Deploy"
echo "==================="
echo ""

echo "📱 Opening deployment platforms..."
echo ""

# Open deployment platforms
echo "🔵 Opening Vercel..."
open "https://vercel.com/new"

echo "🟢 Opening Netlify..."
open "https://app.netlify.com/start"

echo "🟡 Opening Railway..."
open "https://railway.app/new"

echo ""
echo "📋 DEPLOYMENT STEPS:"
echo "==================="
echo ""
echo "🔵 VERCEL (Frontend):"
echo "1. Click 'Import Git Repository'"
echo "2. Select 'Ram-91779030/KFL'"
echo "3. Framework: Vite"
echo "4. Build Command: npm run build"
echo "5. Output Directory: build"
echo "6. Click 'Deploy'"
echo ""

echo "🟢 NETLIFY (Frontend):"
echo "1. Click 'New site from Git'"
echo "2. Choose GitHub → 'Ram-91779030/KFL'"
echo "3. Build command: npm run build"
echo "4. Publish directory: build"
echo "5. Click 'Deploy site'"
echo ""

echo "🟡 RAILWAY (Backend):"
echo "1. Click 'Deploy from GitHub repo'"
echo "2. Select 'Ram-91779030/KFL'"
echo "3. Root Directory: server"
echo "4. Build Command: pip install -r requirements.txt"
echo "5. Start Command: python manage.py migrate && python manage.py collectstatic --noinput && gunicorn server.wsgi:application --bind 0.0.0.0:\$PORT"
echo "6. Click 'Deploy'"
echo ""

echo "⏱️  Deployment time: ~5 minutes"
echo "🎉 Your sites will be live at:"
echo "   Frontend: https://kfl-karshakfoodlife.vercel.app"
echo "   Backend: https://kfl-backend.railway.app"
echo "   Admin: https://kfl-backend.railway.app/admin"
echo ""

echo "✅ After deployment, update frontend API URL:"
echo "   Vercel: Settings → Environment Variables → VITE_API_URL = https://kfl-backend.railway.app"
echo "   Netlify: Site settings → Environment variables → VITE_API_URL = https://kfl-backend.railway.app"