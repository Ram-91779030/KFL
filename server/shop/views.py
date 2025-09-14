from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone
from django.db.models import Q
import uuid

from .models import (
    Category, Product, ProductImage, Variant, Banner, Coupon,
    Address, Cart, CartItem, Order, OrderItem, Payment
)
from .serializers import (
    CategorySerializer, ProductSerializer, ProductListSerializer,
    BannerSerializer, CouponSerializer, AddressSerializer,
    CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer,
    PaymentSerializer, UserRegistrationSerializer, UserProfileSerializer,
    CustomTokenObtainPairSerializer
)
from .filters import ProductFilter


# Authentication Views
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# Public API Views
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images', 'variants')
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'subtitle', 'description', 'brand']
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Price filtering
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price or max_price:
            # Filter by variant prices
            variant_filters = Q()
            if min_price:
                variant_filters &= Q(variants__price__gte=min_price)
            if max_price:
                variant_filters &= Q(variants__price__lte=max_price)
            
            # Get products that have variants matching price range
            product_ids = Product.objects.filter(variant_filters).values_list('id', flat=True)
            queryset = queryset.filter(id__in=product_ids)
        
        return queryset.distinct()


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images', 'variants')
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class BannerListView(generics.ListAPIView):
    queryset = Banner.objects.filter(is_active=True)
    serializer_class = BannerSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        now = timezone.now()
        return Banner.objects.filter(
            is_active=True,
            active_from__lte=now,
            active_to__gte=now
        )


# Cart Views
class CartInitView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            cart = Cart.objects.create(anonymous_token=uuid.uuid4())
        
        return Response({
            'cart_token': str(cart.anonymous_token) if cart.anonymous_token else None,
            'cart_id': cart.id
        })


class CartView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_cart(self, request):
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            cart_token = request.headers.get('X-Cart-Token')
            if not cart_token:
                return None
            try:
                cart = Cart.objects.get(anonymous_token=cart_token)
            except Cart.DoesNotExist:
                return None
        return cart

    def get(self, request):
        cart = self.get_cart(request)
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        cart = self.get_cart(request)
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        variant_id = request.data.get('variant_id')
        qty = request.data.get('qty', 1)
        
        try:
            variant = Variant.objects.get(id=variant_id, is_active=True)
        except Variant.DoesNotExist:
            return Response({'error': 'Variant not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if variant.stock < qty:
            return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            variant=variant,
            defaults={'qty': qty, 'unit_price_snapshot': variant.price}
        )
        
        if not created:
            cart_item.qty += qty
            cart_item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def patch(self, request, item_id):
        cart = self.get_cart(request)
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_item = CartItem.objects.get(id=item_id, cart=cart)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        qty = request.data.get('qty')
        if qty is not None:
            if qty <= 0:
                cart_item.delete()
            else:
                if cart_item.variant.stock < qty:
                    return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
                cart_item.qty = qty
                cart_item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request, item_id):
        cart = self.get_cart(request)
        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_item = CartItem.objects.get(id=item_id, cart=cart)
            cart_item.delete()
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class ApplyCouponView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        cart_token = request.headers.get('X-Cart-Token')
        code = request.data.get('code')
        
        if not cart_token or not code:
            return Response({'error': 'Cart token and coupon code required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart = Cart.objects.get(anonymous_token=cart_token)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            coupon = Coupon.objects.get(code=code, is_active=True)
        except Coupon.DoesNotExist:
            return Response({'error': 'Invalid coupon code'}, status=status.HTTP_404_NOT_FOUND)
        
        if not coupon.is_valid:
            return Response({'error': 'Coupon is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        
        discount = coupon.calculate_discount(cart.subtotal)
        if discount == 0:
            return Response({'error': 'Coupon cannot be applied to this cart'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'discount': discount,
            'coupon_code': coupon.code,
            'message': f'Coupon applied successfully! You saved ₹{discount}'
        })


# Address Views
class AddressListCreateView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


# Order Views
class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart_token = request.headers.get('X-Cart-Token')
        address_id = request.data.get('address_id')
        
        if not address_id:
            return Response({'error': 'Address ID required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            address = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            return Response({'error': 'Address not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Get cart
        if cart_token:
            try:
                cart = Cart.objects.get(anonymous_token=cart_token)
            except Cart.DoesNotExist:
                return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            cart, created = Cart.objects.get_or_create(user=request.user)
        
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            email=request.user.email,
            phone=address.phone,
            address_snapshot={
                'full_name': address.full_name,
                'phone': address.phone,
                'line1': address.line1,
                'line2': address.line2,
                'city': address.city,
                'state': address.state,
                'pincode': address.pincode,
                'country': address.country,
            },
            subtotal=cart.subtotal,
            total=cart.subtotal  # Will be updated with tax, shipping, discounts
        )
        
        # Create order items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                variant=cart_item.variant,
                name_snapshot=f"{cart_item.variant.product.name} - {cart_item.variant.title}",
                qty=cart_item.qty,
                unit_price=cart_item.unit_price_snapshot,
                tax_rate=cart_item.variant.tax_rate
            )
        
        # Clear cart
        cart.items.all().delete()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


# Payment Views
class PaymentWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, provider):
        # Placeholder for payment webhook processing
        # In production, verify the webhook signature here
        
        order_id = request.data.get('order_id')
        status = request.data.get('status')
        
        if not order_id or not status:
            return Response({'error': 'Invalid webhook data'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create payment record
        Payment.objects.create(
            order=order,
            provider=provider,
            provider_ref=request.data.get('payment_id', ''),
            amount=order.total,
            status='success' if status == 'success' else 'failed',
            raw_response=request.data
        )
        
        # Update order status
        if status == 'success':
            order.status = 'paid'
            order.save()
        
        return Response({'status': 'success'})
