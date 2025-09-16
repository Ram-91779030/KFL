from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from pathlib import Path

# Add the server directory to Python path
server_dir = Path(__file__).parent.parent / "server"
sys.path.insert(0, str(server_dir))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
from django.core.wsgi import get_wsgi_application

# Initialize Django
django.setup()
application = get_wsgi_application()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        # Handle different API endpoints
        if self.path.startswith('/api/products'):
            from shop.views import ProductViewSet
            viewset = ProductViewSet()
            response_data = list(viewset.get_queryset().values())
        elif self.path.startswith('/api/categories'):
            from shop.views import CategoryViewSet
            viewset = CategoryViewSet()
            response_data = list(viewset.get_queryset().values())
        else:
            response_data = {"message": "KFL API is running", "status": "success"}
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        response_data = {"message": "POST request received", "status": "success"}
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
