from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    Category, Product, ProductImage, Variant, Banner, Coupon,
    Address, Cart, CartItem, Order, OrderItem, Payment
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'slug', 'name', 'description', 'is_active', 'sort_order']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'sort_order']


class VariantSerializer(serializers.ModelSerializer):
    is_in_stock = serializers.ReadOnlyField()

    class Meta:
        model = Variant
        fields = [
            'id', 'sku', 'title', 'mrp', 'price', 'tax_rate',
            'weight_grams', 'stock', 'is_active', 'is_in_stock'
        ]


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = VariantSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    min_price = serializers.ReadOnlyField()
    max_price = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            'id', 'slug', 'name', 'subtitle', 'description', 'category',
            'brand', 'nutrition_json', 'is_active', 'created_at', 'updated_at',
            'images', 'variants', 'primary_image', 'min_price', 'max_price'
        ]

    def get_primary_image(self, obj):
        primary = obj.primary_image
        if primary:
            return ProductImageSerializer(primary).data
        return None


class ProductListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    min_price = serializers.ReadOnlyField()
    max_price = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            'id', 'slug', 'name', 'subtitle', 'category', 'brand',
            'is_active', 'primary_image', 'min_price', 'max_price'
        ]

    def get_primary_image(self, obj):
        primary = obj.primary_image
        if primary:
            return ProductImageSerializer(primary).data
        return None


class BannerSerializer(serializers.ModelSerializer):
    is_currently_active = serializers.ReadOnlyField()

    class Meta:
        model = Banner
        fields = [
            'id', 'slug', 'title', 'image', 'link_url',
            'active_from', 'active_to', 'is_active', 'is_currently_active'
        ]


class CouponSerializer(serializers.ModelSerializer):
    is_valid = serializers.ReadOnlyField()

    class Meta:
        model = Coupon
        fields = [
            'id', 'code', 'description', 'discount_type', 'value',
            'min_cart', 'max_uses', 'uses', 'starts_at', 'ends_at',
            'is_active', 'is_valid'
        ]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'full_name', 'phone', 'line1', 'line2',
            'city', 'state', 'pincode', 'country', 'is_default'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    variant = VariantSerializer(read_only=True)
    variant_id = serializers.IntegerField(write_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = [
            'id', 'variant', 'variant_id', 'qty', 'unit_price_snapshot', 'total_price'
        ]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.ReadOnlyField()
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = [
            'id', 'user', 'anonymous_token', 'items', 'total_items',
            'subtotal', 'created_at', 'updated_at'
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id', 'variant', 'name_snapshot', 'qty', 'unit_price', 'tax_rate'
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_no', 'user', 'email', 'phone', 'address_snapshot',
            'subtotal', 'discount', 'tax', 'shipping', 'total', 'status',
            'created_at', 'items'
        ]
        read_only_fields = ['order_no', 'user']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'order', 'provider', 'provider_ref', 'amount',
            'status', 'raw_response', 'created_at'
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirm']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'addresses']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
