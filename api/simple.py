from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        # Sample data for testing
        if self.path.startswith('/api/products'):
            response_data = [
                {
                    "id": 1,
                    "name": "Organic Rice",
                    "price": 299.99,
                    "description": "Premium organic rice",
                    "image": "/assets/rice.jpg",
                    "category": "Grains"
                },
                {
                    "id": 2,
                    "name": "Fresh Vegetables",
                    "price": 149.99,
                    "description": "Farm fresh vegetables",
                    "image": "/assets/vegetables.jpg",
                    "category": "Vegetables"
                }
            ]
        elif self.path.startswith('/api/categories'):
            response_data = [
                {"id": 1, "name": "Grains", "slug": "grains"},
                {"id": 2, "name": "Vegetables", "slug": "vegetables"},
                {"id": 3, "name": "Fruits", "slug": "fruits"}
            ]
        else:
            response_data = {
                "message": "KFL API is running successfully!",
                "status": "success",
                "version": "1.0.0"
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
            "message": "POST request received successfully",
            "status": "success"
        }
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
