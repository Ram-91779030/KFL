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
        
        # Admin dashboard data
        admin_data = {
            "dashboard": {
                "totalProducts": 6,
                "totalCategories": 6,
                "totalOrders": 45,
                "totalRevenue": 12500.50,
                "recentOrders": [
                    {"id": 1, "customer": "John Doe", "amount": 299.99, "status": "completed"},
                    {"id": 2, "customer": "Jane Smith", "amount": 149.99, "status": "pending"},
                    {"id": 3, "customer": "Mike Johnson", "amount": 399.99, "status": "shipped"}
                ]
            },
            "products": [
                {
                    "id": 1,
                    "name": "Organic Rice",
                    "price": 299.99,
                    "stock": 50,
                    "status": "active"
                },
                {
                    "id": 2,
                    "name": "Fresh Vegetables",
                    "price": 149.99,
                    "stock": 30,
                    "status": "active"
                },
                {
                    "id": 3,
                    "name": "Seasonal Fruits",
                    "price": 199.99,
                    "stock": 25,
                    "status": "active"
                }
            ],
            "categories": [
                {"id": 1, "name": "Grains", "productCount": 1},
                {"id": 2, "name": "Vegetables", "productCount": 1},
                {"id": 3, "name": "Fruits", "productCount": 1},
                {"id": 4, "name": "Dry Fruits", "productCount": 1},
                {"id": 5, "name": "Protein Bars", "productCount": 1},
                {"id": 6, "name": "Healthy Chips", "productCount": 1}
            ]
        }
        
        response_data = {
            "admin": admin_data,
            "status": "success"
        }
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        response_data = {
            "message": "Admin action completed successfully",
            "status": "success"
        }
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
