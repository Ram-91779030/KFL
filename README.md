# Food E-commerce Full-Stack Application

A production-ready full-stack food e-commerce application built with Django REST Framework backend and React + Vite + Tailwind frontend.

## Features

### Backend (Django)
- **Authentication**: JWT-based authentication with refresh tokens
- **Product Management**: Categories, products, variants, and images
- **Shopping Cart**: Session-based cart with anonymous support
- **Order Management**: Complete order lifecycle with status tracking
- **Payment Integration**: Webhook-ready payment system
- **Admin Interface**: Clean Django admin with custom configurations
- **API Documentation**: RESTful API with filtering, pagination, and search

### Frontend (React)
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **State Management**: Zustand for cart and authentication state
- **Routing**: React Router for navigation
- **API Integration**: Axios-based API client with interceptors
- **Responsive Design**: Mobile-first responsive design
- **Real-time Updates**: Live cart updates and notifications

## Tech Stack

### Backend
- Django 5.0.8
- Django REST Framework 3.15.2
- JWT Authentication (djangorestframework-simplejwt)
- Django CORS Headers
- Pillow (image handling)
- Django Filter
- SQLite (development)

### Frontend
- React 18.3.1
- TypeScript
- Vite 6.3.5
- Tailwind CSS
- Zustand 4.4.0
- React Router DOM 6.8.0
- Axios 1.6.0
- Radix UI components

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Create virtual environment and install dependencies:**
```bash
cd server
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r ../requirements.txt
```

2. **Set up environment variables:**
```bash
cp ../env.example .env
# Edit .env with your settings
```

3. **Run migrations and create superuser:**
```bash
python manage.py migrate
python manage.py createsuperuser
```

4. **Seed the database with sample data:**
```bash
python manage.py seed_shop
```

5. **Start the development server:**
```bash
python manage.py runserver 0.0.0.0:8000
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
echo "VITE_API_URL=http://localhost:8000" > .env.local
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login with username/password
- `POST /api/auth/refresh/` - Refresh JWT token
- `POST /api/auth/register/` - User registration
- `GET /api/auth/profile/` - Get user profile
- `PATCH /api/auth/profile/` - Update user profile

### Public API
- `GET /api/categories/` - List all categories
- `GET /api/products/` - List products with filtering
- `GET /api/products/{slug}/` - Get product details
- `GET /api/banners/active/` - Get active banners

### Cart
- `POST /api/cart/init/` - Initialize cart
- `GET /api/cart/` - Get cart contents
- `POST /api/cart/` - Add item to cart
- `PATCH /api/cart/items/{id}/` - Update cart item quantity
- `DELETE /api/cart/items/{id}/` - Remove item from cart
- `POST /api/cart/apply-coupon/` - Apply coupon code

### Orders
- `POST /api/checkout/create-order/` - Create new order
- `GET /api/orders/` - List user orders
- `GET /api/orders/{id}/` - Get order details

### Addresses
- `GET /api/addresses/` - List user addresses
- `POST /api/addresses/` - Create new address
- `PATCH /api/addresses/{id}/` - Update address
- `DELETE /api/addresses/{id}/` - Delete address

## Sample API Calls

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Get Products
```bash
curl -X GET "http://localhost:8000/api/products/?category=fruits&min_price=50&max_price=200&sort=price"
```

### Add to Cart
```bash
curl -X POST http://localhost:8000/api/cart/ \
  -H "Content-Type: application/json" \
  -H "X-Cart-Token: your-cart-token" \
  -d '{"variant_id": 1, "qty": 2}'
```

### Create Order
```bash
curl -X POST http://localhost:8000/api/checkout/create-order/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "X-Cart-Token: your-cart-token" \
  -d '{"address_id": 1}'
```

## Database Models

### Core Models
- **Category**: Product categories with slug, name, description
- **Product**: Products with variants, images, and metadata
- **Variant**: Product variants with pricing and stock
- **ProductImage**: Product images with primary/secondary flags
- **Banner**: Promotional banners with date ranges
- **Coupon**: Discount coupons with usage limits

### User Models
- **Address**: User shipping addresses
- **Cart**: Shopping cart (user or anonymous)
- **CartItem**: Individual cart items
- **Order**: Customer orders with status tracking
- **OrderItem**: Order line items
- **Payment**: Payment records and webhooks

## Development

### Backend Development
```bash
# Run tests
python manage.py test

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic
```

### Frontend Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Deployment

### Environment Variables
Create a `.env` file with:
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@localhost/dbname
```

### Docker Deployment (Optional)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Admin Interface

Access the Django admin at `http://localhost:8000/admin/` with your superuser credentials.

### Key Admin Features
- Product management with image uploads
- Order tracking and status updates
- Coupon management
- Banner management
- User and address management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.