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

echo "🟡 Opening Render (FREE)..."
open "https://render.com"

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

echo "🟡 RENDER (Backend - FREE):"
echo "1. Click 'New +' → 'Web Service'"
echo "2. Connect GitHub → 'Ram-91779030/KFL'"
echo "3. Name: kfl-backend"
echo "4. Environment: Python 3"
echo "5. Root Directory: server"
echo "6. Build Command: pip install -r requirements.txt"
echo "7. Start Command: python manage.py migrate && python manage.py collectstatic --noinput && gunicorn server.wsgi:application --bind 0.0.0.0:\$PORT"
echo "8. Plan: Free"
echo "9. Click 'Create Web Service'"
echo ""

echo "⏱️  Deployment time: ~5 minutes"
echo "🎉 Your sites will be live at:"
echo "   Frontend: https://kfl-karshakfoodlife.vercel.app"
echo "   Backend: https://kfl-backend.onrender.com"
echo "   Admin: https://kfl-backend.onrender.com/admin"
echo ""

echo "✅ After deployment, update frontend API URL:"
echo "   Vercel: Settings → Environment Variables → VITE_API_URL = https://kfl-backend.onrender.com"
echo "   Netlify: Site settings → Environment variables → VITE_API_URL = https://kfl-backend.onrender.com"