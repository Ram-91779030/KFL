from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import (
    Category, Product, ProductImage, Variant, Banner, Coupon,
    Address, Cart, CartItem, Order, OrderItem, Payment
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'sort_order']
    list_filter = ['is_active']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['sort_order', 'name']


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'alt_text', 'is_primary', 'sort_order']


class VariantInline(admin.TabularInline):
    model = Variant
    extra = 1
    fields = ['sku', 'title', 'mrp', 'price', 'tax_rate', 'weight_grams', 'stock', 'is_active']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'brand', 'is_active', 'created_at', 'min_price_display']
    list_filter = ['is_active', 'category', 'created_at']
    search_fields = ['name', 'slug', 'brand']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, VariantInline]
    ordering = ['-created_at']

    def min_price_display(self, obj):
        return f"₹{obj.min_price}"
    min_price_display.short_description = 'Min Price'


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image_preview', 'alt_text', 'is_primary', 'sort_order']
    list_filter = ['is_primary']
    search_fields = ['product__name', 'alt_text']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ['product', 'title', 'sku', 'price', 'mrp', 'stock', 'is_active']
    list_filter = ['is_active', 'product__category']
    search_fields = ['product__name', 'title', 'sku']
    ordering = ['product__name', 'price']


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'is_active', 'active_from', 'active_to', 'image_preview']
    list_filter = ['is_active', 'active_from', 'active_to']
    search_fields = ['title', 'slug']
    prepopulated_fields = {'slug': ('title',)}

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="50" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'description', 'discount_type', 'value', 'uses', 'max_uses', 'is_active', 'is_valid']
    list_filter = ['discount_type', 'is_active', 'starts_at', 'ends_at']
    search_fields = ['code', 'description']
    readonly_fields = ['uses']

    def is_valid(self, obj):
        return obj.is_valid
    is_valid.boolean = True
    is_valid.short_description = 'Valid'


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'city', 'state', 'pincode', 'is_default']
    list_filter = ['is_default', 'state', 'city']
    search_fields = ['user__username', 'full_name', 'city', 'pincode']


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['variant', 'qty', 'unit_price_snapshot']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user_display', 'anonymous_token', 'total_items', 'subtotal', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'anonymous_token']
    inlines = [CartItemInline]
    readonly_fields = ['created_at', 'updated_at']

    def user_display(self, obj):
        return obj.user.username if obj.user else f"Anonymous ({obj.anonymous_token})"
    user_display.short_description = 'User'


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'variant', 'qty', 'unit_price_snapshot', 'total_price']
    list_filter = ['cart__user']
    search_fields = ['cart__user__username', 'variant__product__name']

    def total_price(self, obj):
        return obj.total_price
    total_price.short_description = 'Total'


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['variant', 'name_snapshot', 'qty', 'unit_price', 'tax_rate']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_no', 'user', 'status', 'total', 'created_at', 'payment_status']
    list_filter = ['status', 'created_at']
    search_fields = ['order_no', 'user__username', 'email']
    inlines = [OrderItemInline]
    readonly_fields = ['order_no', 'created_at', 'address_snapshot_display']

    def payment_status(self, obj):
        payments = obj.payments.all()
        if payments:
            latest_payment = payments.latest('created_at')
            return latest_payment.status
        return 'No Payment'
    payment_status.short_description = 'Payment Status'

    def address_snapshot_display(self, obj):
        if obj.address_snapshot:
            address = obj.address_snapshot
            return format_html(
                '<strong>{}</strong><br/>{}<br/>{}<br/>{} - {}<br/>{}',
                address.get('full_name', ''),
                address.get('line1', ''),
                address.get('line2', ''),
                address.get('city', ''),
                address.get('pincode', ''),
                address.get('phone', '')
            )
        return 'No Address'
    address_snapshot_display.short_description = 'Address'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'name_snapshot', 'qty', 'unit_price', 'total_price']
    list_filter = ['order__status', 'order__created_at']
    search_fields = ['order__order_no', 'name_snapshot']

    def total_price(self, obj):
        return obj.total_price
    total_price.short_description = 'Total'


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['order', 'provider', 'amount', 'status', 'created_at']
    list_filter = ['provider', 'status', 'created_at']
    search_fields = ['order__order_no', 'provider_ref']
    readonly_fields = ['created_at', 'raw_response_display']

    def raw_response_display(self, obj):
        if obj.raw_response:
            return format_html('<pre>{}</pre>', str(obj.raw_response))
        return 'No Response Data'
    raw_response_display.short_description = 'Raw Response'
