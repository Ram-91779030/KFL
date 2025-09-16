from http.server import BaseHTTPRequestHandler
import json
import os

# Simple file-based data storage
DATA_DIR = "/tmp/kfl_data"
PRODUCTS_FILE = os.path.join(DATA_DIR, "products.json")
CATEGORIES_FILE = os.path.join(DATA_DIR, "categories.json")

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Default data
DEFAULT_PRODUCTS = [
    {
        "id": 1,
        "name": "Organic Rice",
        "price": 299.99,
        "description": "Premium organic rice from local farms",
        "image": "/assets/rice.jpg",
        "category": "Grains",
        "inStock": True,
        "rating": 4.8,
        "reviews": 150,
        "stock": 50
    },
    {
        "id": 2,
        "name": "Fresh Vegetables",
        "price": 149.99,
        "description": "Farm fresh vegetables delivered daily",
        "image": "/assets/vegetables.jpg",
        "category": "Vegetables",
        "inStock": True,
        "rating": 4.6,
        "reviews": 89,
        "stock": 30
    },
    {
        "id": 3,
        "name": "Seasonal Fruits",
        "price": 199.99,
        "description": "Fresh seasonal fruits from local orchards",
        "image": "/assets/fruits.jpg",
        "category": "Fruits",
        "inStock": True,
        "rating": 4.9,
        "reviews": 203,
        "stock": 25
    }
]

DEFAULT_CATEGORIES = [
    {"id": 1, "name": "Grains", "slug": "grains", "description": "Premium organic grains", "image": "/assets/grains.jpg"},
    {"id": 2, "name": "Vegetables", "slug": "vegetables", "description": "Fresh farm vegetables", "image": "/assets/vegetables.jpg"},
    {"id": 3, "name": "Fruits", "slug": "fruits", "description": "Seasonal fresh fruits", "image": "/assets/fruits.jpg"},
    {"id": 4, "name": "Dry Fruits", "slug": "dry-fruits", "description": "Premium dry fruits and nuts", "image": "/assets/dryfruits.jpg"},
    {"id": 5, "name": "Protein Bars", "slug": "protein-bars", "description": "High protein energy bars", "image": "/assets/proteinbars.jpg"},
    {"id": 6, "name": "Healthy Chips", "slug": "healthy-chips", "description": "Baked healthy snacks", "image": "/assets/chips.jpg"}
]

def load_data(filename, default_data):
    """Load data from file or return default data"""
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                return json.load(f)
    except:
        pass
    return default_data

def save_data(filename, data):
    """Save data to file"""
    try:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    except:
        return False

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        # Load current data
        products = load_data(PRODUCTS_FILE, DEFAULT_PRODUCTS)
        categories = load_data(CATEGORIES_FILE, DEFAULT_CATEGORIES)
        
        # Admin dashboard data
        admin_data = {
            "dashboard": {
                "totalProducts": len(products),
                "totalCategories": len(categories),
                "totalOrders": 45,
                "totalRevenue": sum(p.get('price', 0) * p.get('stock', 0) for p in products),
                "recentOrders": [
                    {"id": 1, "customer": "John Doe", "amount": 299.99, "status": "completed"},
                    {"id": 2, "customer": "Jane Smith", "amount": 149.99, "status": "pending"},
                    {"id": 3, "customer": "Mike Johnson", "amount": 399.99, "status": "shipped"}
                ]
            },
            "products": products,
            "categories": categories
        }
        
        response_data = {
            "admin": admin_data,
            "status": "success"
        }
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            action = data.get('action')
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            self.end_headers()
            
            if action == 'add_product':
                products = load_data(PRODUCTS_FILE, DEFAULT_PRODUCTS)
                new_id = max([p['id'] for p in products], default=0) + 1
                new_product = {
                    "id": new_id,
                    "name": data.get('name', ''),
                    "price": float(data.get('price', 0)),
                    "description": data.get('description', ''),
                    "image": data.get('image', '/assets/default.jpg'),
                    "category": data.get('category', ''),
                    "inStock": data.get('inStock', True),
                    "rating": float(data.get('rating', 4.0)),
                    "reviews": int(data.get('reviews', 0)),
                    "stock": int(data.get('stock', 0))
                }
                products.append(new_product)
                save_data(PRODUCTS_FILE, products)
                response = {"message": "Product added successfully", "product": new_product, "status": "success"}
                
            elif action == 'update_product':
                products = load_data(PRODUCTS_FILE, DEFAULT_PRODUCTS)
                product_id = data.get('id')
                for i, product in enumerate(products):
                    if product['id'] == product_id:
                        products[i].update({
                            "name": data.get('name', product['name']),
                            "price": float(data.get('price', product['price'])),
                            "description": data.get('description', product['description']),
                            "image": data.get('image', product['image']),
                            "category": data.get('category', product['category']),
                            "inStock": data.get('inStock', product['inStock']),
                            "rating": float(data.get('rating', product['rating'])),
                            "reviews": int(data.get('reviews', product['reviews'])),
                            "stock": int(data.get('stock', product['stock']))
                        })
                        save_data(PRODUCTS_FILE, products)
                        response = {"message": "Product updated successfully", "product": products[i], "status": "success"}
                        break
                else:
                    response = {"message": "Product not found", "status": "error"}
                    
            elif action == 'delete_product':
                products = load_data(PRODUCTS_FILE, DEFAULT_PRODUCTS)
                product_id = data.get('id')
                products = [p for p in products if p['id'] != product_id]
                save_data(PRODUCTS_FILE, products)
                response = {"message": "Product deleted successfully", "status": "success"}
                
            elif action == 'add_category':
                categories = load_data(CATEGORIES_FILE, DEFAULT_CATEGORIES)
                new_id = max([c['id'] for c in categories], default=0) + 1
                new_category = {
                    "id": new_id,
                    "name": data.get('name', ''),
                    "slug": data.get('slug', ''),
                    "description": data.get('description', ''),
                    "image": data.get('image', '/assets/default.jpg')
                }
                categories.append(new_category)
                save_data(CATEGORIES_FILE, categories)
                response = {"message": "Category added successfully", "category": new_category, "status": "success"}
                
            else:
                response = {"message": "Invalid action", "status": "error"}
                
        except Exception as e:
            response = {"message": f"Error: {str(e)}", "status": "error"}
        
        self.wfile.write(json.dumps(response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
