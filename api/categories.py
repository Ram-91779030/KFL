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
        
        # Sample categories data
        categories = [
            {"id": 1, "name": "Grains", "slug": "grains"},
            {"id": 2, "name": "Vegetables", "slug": "vegetables"},
            {"id": 3, "name": "Fruits", "slug": "fruits"},
            {"id": 4, "name": "Dairy", "slug": "dairy"},
            {"id": 5, "name": "Spices", "slug": "spices"}
        ]
        
        response_data = {
            "categories": categories,
            "total": len(categories),
            "status": "success"
        }
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
