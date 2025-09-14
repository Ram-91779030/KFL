from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from shop.models import (
    Category, Product, ProductImage, Variant, Banner, Coupon
)
import os
from django.conf import settings


class Command(BaseCommand):
    help = 'Seed the shop with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Starting to seed shop data...')

        # Create categories
        categories_data = [
            {'slug': 'fruits', 'name': 'Fresh Fruits', 'description': 'Organic and fresh fruits', 'sort_order': 1},
            {'slug': 'vegetables', 'name': 'Fresh Vegetables', 'description': 'Farm-fresh vegetables', 'sort_order': 2},
            {'slug': 'grains', 'name': 'Grains & Cereals', 'description': 'Healthy grains and cereals', 'sort_order': 3},
            {'slug': 'dairy', 'name': 'Dairy Products', 'description': 'Fresh dairy products', 'sort_order': 4},
            {'slug': 'spices', 'name': 'Spices & Herbs', 'description': 'Aromatic spices and herbs', 'sort_order': 5},
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories[cat_data['slug']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create products
        products_data = [
            {
                'slug': 'organic-apples',
                'name': 'Organic Red Apples',
                'subtitle': 'Fresh and crisp organic apples',
                'description': 'Premium quality organic red apples, rich in fiber and antioxidants. Perfect for snacking or cooking.',
                'category': categories['fruits'],
                'brand': 'Farm Fresh',
                'nutrition_json': {'calories': 52, 'fiber': '2.4g', 'vitamin_c': '4.6mg'},
            },
            {
                'slug': 'fresh-carrots',
                'name': 'Fresh Carrots',
                'subtitle': 'Sweet and crunchy carrots',
                'description': 'Farm-fresh carrots, rich in beta-carotene and vitamin A. Great for salads, soups, and snacking.',
                'category': categories['vegetables'],
                'brand': 'Green Valley',
                'nutrition_json': {'calories': 41, 'beta_carotene': '8285mcg', 'vitamin_a': '16706IU'},
            },
            {
                'slug': 'basmati-rice',
                'name': 'Premium Basmati Rice',
                'subtitle': 'Long grain aromatic rice',
                'description': 'Premium quality basmati rice with long grains and aromatic fragrance. Perfect for biryanis and pulao.',
                'category': categories['grains'],
                'brand': 'Royal Harvest',
                'nutrition_json': {'calories': 130, 'carbs': '28g', 'protein': '2.7g'},
            },
            {
                'slug': 'fresh-milk',
                'name': 'Fresh Cow Milk',
                'subtitle': 'Pure and fresh cow milk',
                'description': 'Fresh cow milk, rich in calcium and protein. Pasteurized for safety and taste.',
                'category': categories['dairy'],
                'brand': 'Dairy Delight',
                'nutrition_json': {'calories': 42, 'protein': '3.4g', 'calcium': '113mg'},
            },
            {
                'slug': 'turmeric-powder',
                'name': 'Pure Turmeric Powder',
                'subtitle': 'Golden turmeric powder',
                'description': 'Pure turmeric powder with anti-inflammatory properties. Great for cooking and health benefits.',
                'category': categories['spices'],
                'brand': 'Spice Master',
                'nutrition_json': {'calories': 354, 'curcumin': '3-5%', 'iron': '41.4mg'},
            },
            {
                'slug': 'bananas',
                'name': 'Fresh Bananas',
                'subtitle': 'Sweet and nutritious bananas',
                'description': 'Fresh bananas, rich in potassium and vitamin B6. Perfect for breakfast or as a healthy snack.',
                'category': categories['fruits'],
                'brand': 'Tropical Fresh',
                'nutrition_json': {'calories': 89, 'potassium': '358mg', 'vitamin_b6': '0.4mg'},
            },
            {
                'slug': 'spinach',
                'name': 'Fresh Spinach',
                'subtitle': 'Nutrient-rich leafy greens',
                'description': 'Fresh spinach leaves, packed with iron, folate, and vitamins. Perfect for salads and cooking.',
                'category': categories['vegetables'],
                'brand': 'Green Valley',
                'nutrition_json': {'calories': 23, 'iron': '2.7mg', 'folate': '194mcg'},
            },
            {
                'slug': 'wheat-flour',
                'name': 'Whole Wheat Flour',
                'subtitle': 'Nutritious whole wheat flour',
                'description': 'Premium whole wheat flour, rich in fiber and nutrients. Perfect for making bread, rotis, and baked goods.',
                'category': categories['grains'],
                'brand': 'Grain Master',
                'nutrition_json': {'calories': 340, 'fiber': '10.7g', 'protein': '13.7g'},
            },
        ]

        products = {}
        for prod_data in products_data:
            product, created = Product.objects.get_or_create(
                slug=prod_data['slug'],
                defaults=prod_data
            )
            products[prod_data['slug']] = product
            if created:
                self.stdout.write(f'Created product: {product.name}')

        # Create variants for products
        variants_data = [
            # Organic Apples
            {'product': products['organic-apples'], 'sku': 'APPLE-500G', 'title': '500g Pack', 'mrp': 120, 'price': 100, 'stock': 50},
            {'product': products['organic-apples'], 'sku': 'APPLE-1KG', 'title': '1kg Pack', 'mrp': 220, 'price': 180, 'stock': 30},
            
            # Fresh Carrots
            {'product': products['fresh-carrots'], 'sku': 'CARROT-500G', 'title': '500g Pack', 'mrp': 40, 'price': 35, 'stock': 100},
            {'product': products['fresh-carrots'], 'sku': 'CARROT-1KG', 'title': '1kg Pack', 'mrp': 75, 'price': 65, 'stock': 60},
            
            # Basmati Rice
            {'product': products['basmati-rice'], 'sku': 'RICE-1KG', 'title': '1kg Pack', 'mrp': 180, 'price': 150, 'stock': 40},
            {'product': products['basmati-rice'], 'sku': 'RICE-5KG', 'title': '5kg Pack', 'mrp': 850, 'price': 750, 'stock': 20},
            
            # Fresh Milk
            {'product': products['fresh-milk'], 'sku': 'MILK-500ML', 'title': '500ml Pack', 'mrp': 30, 'price': 25, 'stock': 200},
            {'product': products['fresh-milk'], 'sku': 'MILK-1L', 'title': '1L Pack', 'mrp': 55, 'price': 45, 'stock': 150},
            
            # Turmeric Powder
            {'product': products['turmeric-powder'], 'sku': 'TURMERIC-100G', 'title': '100g Pack', 'mrp': 60, 'price': 50, 'stock': 80},
            {'product': products['turmeric-powder'], 'sku': 'TURMERIC-250G', 'title': '250g Pack', 'mrp': 140, 'price': 120, 'stock': 50},
            
            # Bananas
            {'product': products['bananas'], 'sku': 'BANANA-6PCS', 'title': '6 Pieces', 'mrp': 30, 'price': 25, 'stock': 100},
            {'product': products['bananas'], 'sku': 'BANANA-12PCS', 'title': '12 Pieces', 'mrp': 55, 'price': 45, 'stock': 60},
            
            # Spinach
            {'product': products['spinach'], 'sku': 'SPINACH-250G', 'title': '250g Pack', 'mrp': 25, 'price': 20, 'stock': 80},
            {'product': products['spinach'], 'sku': 'SPINACH-500G', 'title': '500g Pack', 'mrp': 45, 'price': 35, 'stock': 50},
            
            # Wheat Flour
            {'product': products['wheat-flour'], 'sku': 'FLOUR-1KG', 'title': '1kg Pack', 'mrp': 60, 'price': 50, 'stock': 70},
            {'product': products['wheat-flour'], 'sku': 'FLOUR-5KG', 'title': '5kg Pack', 'mrp': 280, 'price': 240, 'stock': 30},
        ]

        for variant_data in variants_data:
            variant, created = Variant.objects.get_or_create(
                sku=variant_data['sku'],
                defaults=variant_data
            )
            if created:
                self.stdout.write(f'Created variant: {variant.product.name} - {variant.title}')

        # Create banners
        banners_data = [
            {
                'slug': 'summer-sale',
                'title': 'Summer Sale - Up to 50% Off',
                'image': 'banners/summer-sale.jpg',  # You'll need to add actual images
                'link_url': '/products/',
                'active_from': timezone.now(),
                'active_to': timezone.now() + timedelta(days=30),
            },
            {
                'slug': 'organic-fresh',
                'title': '100% Organic Fresh Products',
                'image': 'banners/organic-fresh.jpg',
                'link_url': '/products/?category=fruits',
                'active_from': timezone.now(),
                'active_to': timezone.now() + timedelta(days=60),
            },
        ]

        for banner_data in banners_data:
            banner, created = Banner.objects.get_or_create(
                slug=banner_data['slug'],
                defaults=banner_data
            )
            if created:
                self.stdout.write(f'Created banner: {banner.title}')

        # Create coupons
        coupons_data = [
            {
                'code': 'WELCOME10',
                'description': 'Welcome discount for new customers',
                'discount_type': 'percent',
                'value': 10,
                'min_cart': 500,
                'max_uses': 100,
                'starts_at': timezone.now(),
                'ends_at': timezone.now() + timedelta(days=90),
            },
            {
                'code': 'SAVE50',
                'description': 'Flat ₹50 off on orders above ₹1000',
                'discount_type': 'fixed',
                'value': 50,
                'min_cart': 1000,
                'max_uses': 50,
                'starts_at': timezone.now(),
                'ends_at': timezone.now() + timedelta(days=30),
            },
        ]

        for coupon_data in coupons_data:
            coupon, created = Coupon.objects.get_or_create(
                code=coupon_data['code'],
                defaults=coupon_data
            )
            if created:
                self.stdout.write(f'Created coupon: {coupon.code}')

        self.stdout.write(
            self.style.SUCCESS('Successfully seeded shop data!')
        )
