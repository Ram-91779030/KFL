#!/bin/bash

echo "🚀 Setting up Food E-commerce Application..."

# Backend setup
echo "📦 Setting up Django backend..."
cd server

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt

# Set up environment
cp ../env.example .env

# Run migrations
python manage.py migrate

# Create superuser (interactive)
echo "👤 Creating superuser..."
python manage.py createsuperuser

# Seed database
echo "🌱 Seeding database with sample data..."
python manage.py seed_shop

echo "✅ Backend setup complete!"
echo "🔗 Backend will be available at: http://localhost:8000"
echo "🔗 Admin panel: http://localhost:8000/admin"

cd ..

# Frontend setup
echo "📦 Setting up React frontend..."

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:8000" > .env.local

echo "✅ Frontend setup complete!"
echo "🔗 Frontend will be available at: http://localhost:5173"

echo ""
echo "🎉 Setup complete! To start the application:"
echo ""
echo "Backend:"
echo "  cd server"
echo "  source .venv/bin/activate"
echo "  python manage.py runserver 0.0.0.0:8000"
echo ""
echo "Frontend:"
echo "  npm run dev"
echo ""
echo "Happy coding! 🚀"
