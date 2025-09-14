import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug')
    min_price = django_filters.NumberFilter(method='filter_min_price')
    max_price = django_filters.NumberFilter(method='filter_max_price')
    sort = django_filters.ChoiceFilter(
        choices=[
            ('price', 'Price: Low to High'),
            ('-price', 'Price: High to Low'),
            ('new', 'Newest First'),
            ('popular', 'Most Popular'),
        ],
        method='filter_sort'
    )

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price', 'sort']

    def filter_min_price(self, queryset, name, value):
        if value:
            # Filter products that have variants with price >= value
            return queryset.filter(variants__price__gte=value).distinct()
        return queryset

    def filter_max_price(self, queryset, name, value):
        if value:
            # Filter products that have variants with price <= value
            return queryset.filter(variants__price__lte=value).distinct()
        return queryset

    def filter_sort(self, queryset, name, value):
        if value == 'price':
            # Sort by minimum variant price
            return queryset.order_by('variants__price')
        elif value == '-price':
            # Sort by maximum variant price
            return queryset.order_by('-variants__price')
        elif value == 'new':
            return queryset.order_by('-created_at')
        elif value == 'popular':
            # For now, just sort by creation date
            # In production, you might want to add a popularity field
            return queryset.order_by('-created_at')
        return queryset
