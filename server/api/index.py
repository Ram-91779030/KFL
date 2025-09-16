import os
import sys
from pathlib import Path

# Add the server directory to Python path
server_dir = Path(__file__).parent.parent
sys.path.insert(0, str(server_dir))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
from django.core.wsgi import get_wsgi_application

# Initialize Django
django.setup()
application = get_wsgi_application()

# Import Django views and URL patterns
from django.http import JsonResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from shop.views import ProductViewSet, CategoryViewSet

# Create router for API endpoints
router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)

# URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/shop/', include('shop.urls')),
]

# Add static and media files serving
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

def handler(request):
    """Main handler for Vercel serverless function"""
    from django.core.handlers.wsgi import WSGIHandler
    from django.test import RequestFactory
    
    # Create a WSGI handler
    wsgi_handler = WSGIHandler()
    
    # Convert Vercel request to Django request
    factory = RequestFactory()
    django_request = factory.request(
        method=request.get('method', 'GET'),
        path=request.get('path', '/'),
        data=request.get('body', ''),
        content_type=request.get('headers', {}).get('content-type', ''),
        **request.get('query', {})
    )
    
    # Process the request
    response = wsgi_handler(django_request)
    
    return {
        'statusCode': response.status_code,
        'headers': dict(response.items()),
        'body': response.content.decode('utf-8')
    }
