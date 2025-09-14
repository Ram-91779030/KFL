from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
import json


class Category(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name


class Product(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    name = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    brand = models.CharField(max_length=100, blank=True)
    nutrition_json = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def primary_image(self):
        return self.images.filter(is_primary=True).first()

    @property
    def min_price(self):
        variants = self.variants.filter(is_active=True)
        return min([v.price for v in variants]) if variants else 0

    @property
    def max_price(self):
        variants = self.variants.filter(is_active=True)
        return max([v.price for v in variants]) if variants else 0


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.product.name} - Image {self.sort_order}"

    def save(self, *args, **kwargs):
        if self.is_primary:
            # Ensure only one primary image per product
            ProductImage.objects.filter(product=self.product, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)


class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=100)
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    weight_grams = models.PositiveIntegerField(null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['price']

    def __str__(self):
        return f"{self.product.name} - {self.title}"

    @property
    def is_in_stock(self):
        return self.stock > 0


class Banner(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='banners/')
    link_url = models.URLField(blank=True)
    active_from = models.DateTimeField()
    active_to = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-active_from']

    def __str__(self):
        return self.title

    @property
    def is_currently_active(self):
        from django.utils import timezone
        now = timezone.now()
        return self.is_active and self.active_from <= now <= self.active_to


class Coupon(models.Model):
    DISCOUNT_TYPES = [
        ('percent', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    code = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=200)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPES)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    min_cart = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_uses = models.PositiveIntegerField(null=True, blank=True)
    uses = models.PositiveIntegerField(default=0)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-starts_at']

    def __str__(self):
        return self.code

    @property
    def is_valid(self):
        from django.utils import timezone
        now = timezone.now()
        return (self.is_active and 
                self.starts_at <= now <= self.ends_at and
                (self.max_uses is None or self.uses < self.max_uses))

    def calculate_discount(self, cart_total):
        if not self.is_valid or cart_total < self.min_cart:
            return 0
        
        if self.discount_type == 'percent':
            return min(cart_total * (self.value / 100), cart_total)
        else:
            return min(self.value, cart_total)


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    line1 = models.CharField(max_length=200)
    line2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    country = models.CharField(max_length=100, default='India')
    is_default = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Addresses"

    def __str__(self):
        return f"{self.full_name} - {self.city}"

    def save(self, *args, **kwargs):
        if self.is_default:
            # Ensure only one default address per user
            Address.objects.filter(user=self.user, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='carts')
    anonymous_token = models.UUIDField(default=uuid.uuid4, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        if self.user:
            return f"Cart for {self.user.username}"
        return f"Anonymous cart {self.anonymous_token}"

    @property
    def total_items(self):
        return sum(item.qty for item in self.items.all())

    @property
    def subtotal(self):
        return sum(item.qty * item.unit_price_snapshot for item in self.items.all())

    @property
    def total(self):
        return self.subtotal  # Will be updated with tax, shipping, discounts


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)
    unit_price_snapshot = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ['cart', 'variant']

    def __str__(self):
        return f"{self.variant.product.name} - {self.variant.title} x {self.qty}"

    @property
    def total_price(self):
        return self.qty * self.unit_price_snapshot


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    order_no = models.CharField(max_length=20, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address_snapshot = models.JSONField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.order_no}"

    def save(self, *args, **kwargs):
        if not self.order_no:
            self.order_no = f"ORD{self.created_at.strftime('%Y%m%d%H%M%S')}"
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    name_snapshot = models.CharField(max_length=200)
    qty = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.name_snapshot} x {self.qty}"

    @property
    def total_price(self):
        return self.qty * self.unit_price


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    provider = models.CharField(max_length=50)  # razorpay, stripe, etc.
    provider_ref = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    raw_response = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment for {self.order.order_no} - {self.status}"
