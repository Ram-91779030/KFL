from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="KFL API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data
PRODUCTS = [
    {
        "id": 1,
        "name": "Organic Rice",
        "price": 299.99,
        "description": "Premium organic rice from local farms",
        "image": "/assets/rice.jpg",
        "category": "Grains",
        "inStock": True
    },
    {
        "id": 2,
        "name": "Fresh Vegetables",
        "price": 149.99,
        "description": "Farm fresh vegetables delivered daily",
        "image": "/assets/vegetables.jpg",
        "category": "Vegetables",
        "inStock": True
    },
    {
        "id": 3,
        "name": "Seasonal Fruits",
        "price": 199.99,
        "description": "Fresh seasonal fruits from local orchards",
        "image": "/assets/fruits.jpg",
        "category": "Fruits",
        "inStock": True
    }
]

CATEGORIES = [
    {"id": 1, "name": "Grains", "slug": "grains"},
    {"id": 2, "name": "Vegetables", "slug": "vegetables"},
    {"id": 3, "name": "Fruits", "slug": "fruits"},
    {"id": 4, "name": "Dairy", "slug": "dairy"},
    {"id": 5, "name": "Spices", "slug": "spices"}
]

@app.get("/")
async def root():
    return {
        "message": "KFL API is running successfully!",
        "status": "success",
        "version": "1.0.0",
        "endpoints": {
            "products": "/api/products",
            "categories": "/api/categories",
            "health": "/api/health"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "KFL API"}

@app.get("/products")
async def get_products():
    return {
        "products": PRODUCTS,
        "total": len(PRODUCTS),
        "status": "success"
    }

@app.get("/products/{product_id}")
async def get_product(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        return {"error": "Product not found", "status": "error"}
    return {"product": product, "status": "success"}

@app.get("/categories")
async def get_categories():
    return {
        "categories": CATEGORIES,
        "total": len(CATEGORIES),
        "status": "success"
    }

@app.get("/categories/{category_slug}/products")
async def get_products_by_category(category_slug: str):
    category_products = [p for p in PRODUCTS if p["category"].lower() == category_slug]
    return {
        "products": category_products,
        "category": category_slug,
        "total": len(category_products),
        "status": "success"
    }

@app.post("/contact")
async def contact_form(data: dict):
    return {
        "message": "Thank you for your message! We'll get back to you soon.",
        "status": "success"
    }

@app.post("/newsletter")
async def newsletter_signup(data: dict):
    return {
        "message": "Successfully subscribed to newsletter!",
        "status": "success"
    }

# Vercel handler
def handler(request):
    return app