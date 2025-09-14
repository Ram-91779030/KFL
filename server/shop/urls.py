from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication
    path('auth/login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', views.UserRegistrationView.as_view(), name='user_register'),
    path('auth/profile/', views.UserProfileView.as_view(), name='user_profile'),
    
    # Public API
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('banners/active/', views.BannerListView.as_view(), name='banner_list'),
    
    # Cart
    path('cart/init/', views.CartInitView.as_view(), name='cart_init'),
    path('cart/', views.CartView.as_view(), name='cart_detail'),
    path('cart/items/<int:item_id>/', views.CartView.as_view(), name='cart_item_update'),
    path('cart/apply-coupon/', views.ApplyCouponView.as_view(), name='apply_coupon'),
    
    # Addresses
    path('addresses/', views.AddressListCreateView.as_view(), name='address_list_create'),
    path('addresses/<int:pk>/', views.AddressRetrieveUpdateDestroyView.as_view(), name='address_detail'),
    
    # Orders
    path('checkout/create-order/', views.CreateOrderView.as_view(), name='create_order'),
    path('orders/', views.OrderListView.as_view(), name='order_list'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order_detail'),
    
    # Payments
    path('payments/webhook/<str:provider>/', views.PaymentWebhookView.as_view(), name='payment_webhook'),
]
