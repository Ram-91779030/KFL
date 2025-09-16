from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        # Sample products data
        products = [
            {
                "id": 1,
                "name": "Organic Rice",
                "price": 299.99,
                "description": "Premium organic rice from local farms",
                "image": "/assets/rice.jpg",
                "category": "Grains",
                "inStock": True,
                "rating": 4.8,
                "reviews": 150
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
                "reviews": 89
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
                "reviews": 203
            },
            {
                "id": 4,
                "name": "Premium Dry Fruits",
                "price": 399.99,
                "description": "Premium quality dry fruits and nuts",
                "image": "/assets/dryfruits.jpg",
                "category": "Dry Fruits",
                "inStock": True,
                "rating": 4.7,
                "reviews": 167
            },
            {
                "id": 5,
                "name": "Protein Bars",
                "price": 249.99,
                "description": "High protein energy bars for fitness",
                "image": "/assets/proteinbars.jpg",
                "category": "Protein Bars",
                "inStock": True,
                "rating": 4.5,
                "reviews": 94
            },
            {
                "id": 6,
                "name": "Healthy Chips",
                "price": 179.99,
                "description": "Baked healthy chips with natural flavors",
                "image": "/assets/chips.jpg",
                "category": "Healthy Chips",
                "inStock": True,
                "rating": 4.4,
                "reviews": 76
            }
        ]
        
        response_data = {
            "products": products,
            "total": len(products),
            "status": "success"
        }
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
