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
            {"id": 1, "name": "Grains", "slug": "grains", "description": "Premium organic grains", "image": "/assets/grains.jpg"},
            {"id": 2, "name": "Vegetables", "slug": "vegetables", "description": "Fresh farm vegetables", "image": "/assets/vegetables.jpg"},
            {"id": 3, "name": "Fruits", "slug": "fruits", "description": "Seasonal fresh fruits", "image": "/assets/fruits.jpg"},
            {"id": 4, "name": "Dry Fruits", "slug": "dry-fruits", "description": "Premium dry fruits and nuts", "image": "/assets/dryfruits.jpg"},
            {"id": 5, "name": "Protein Bars", "slug": "protein-bars", "description": "High protein energy bars", "image": "/assets/proteinbars.jpg"},
            {"id": 6, "name": "Healthy Chips", "slug": "healthy-chips", "description": "Baked healthy snacks", "image": "/assets/chips.jpg"}
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
