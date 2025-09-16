from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="KFL API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
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

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "KFL API"}

@app.get("/api/products")
async def get_products():
    return {
        "products": PRODUCTS,
        "total": len(PRODUCTS),
        "status": "success"
    }

@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        return {"error": "Product not found", "status": "error"}
    return {"product": product, "status": "success"}

@app.get("/api/categories")
async def get_categories():
    return {
        "categories": CATEGORIES,
        "total": len(CATEGORIES),
        "status": "success"
    }

@app.get("/api/categories/{category_slug}/products")
async def get_products_by_category(category_slug: str):
    category_products = [p for p in PRODUCTS if p["category"].lower() == category_slug]
    return {
        "products": category_products,
        "category": category_slug,
        "total": len(category_products),
        "status": "success"
    }

@app.post("/api/contact")
async def contact_form(data: dict):
    # In a real application, you would save this to a database
    return {
        "message": "Thank you for your message! We'll get back to you soon.",
        "status": "success"
    }

@app.post("/api/newsletter")
async def newsletter_signup(data: dict):
    # In a real application, you would save this to a database
    return {
        "message": "Successfully subscribed to newsletter!",
        "status": "success"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
