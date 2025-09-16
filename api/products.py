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
