import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Filter, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PageHeader } from './PageHeader';
import { PageContainer } from './PageContainer';
import type { Product } from '../types';

interface ProductGridProps {
  selectedCategory: string;
  onProductClick: (product: Product) => void;
  onCategoryChange: (category: string) => void;
  products?: Product[];
  isLoading?: boolean;
  error?: string | null;
  onSearch?: (query: string) => void;
  onSort?: (sort: string) => void;
  onPriceFilter?: (minPrice?: number, maxPrice?: number) => void;
}

const products: Product[] = [
  // Premium Nuts
  {
    id: 1,
    name: "Premium Almonds",
    price: 599,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1663652851591-e3d9bfb6d8c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHMlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NTc4MjMxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "premium-nuts",
    rating: 4.8,
    reviews: 245,
    brand: "KFL",
    tags: ["Natural", "No Preservatives"]
  },
  {
    id: 2,
    name: "Cashew Nuts Premium",
    price: 750,
    image: "https://images.unsplash.com/photo-1594900689460-fdad3599342c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHN8ZW58MXx8fHwxNzU3NzcxNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "premium-nuts",
    rating: 4.9,
    reviews: 189,
    brand: "OG",
    tags: ["Organic", "Jumbo Size"]
  },
  // Dried Fruits
  {
    id: 3,
    name: "Medjool Dates",
    price: 450,
    image: "https://images.unsplash.com/photo-1742796847334-1fa19b4aa249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZydWl0cyUyMGRhdGVzJTIwcmFpc2luc3xlbnwxfHx8fDE3NTc4MjMzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "dried-fruits",
    rating: 4.9,
    reviews: 189,
    brand: "OG",
    tags: ["Organic", "Sweet"]
  },
  {
    id: 4,
    name: "Turkish Figs",
    price: 650,
    originalPrice: 750,
    image: "https://images.unsplash.com/photo-1742796847334-1fa19b4aa249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZydWl0cyUyMGRhdGVzJTIwcmFpc2luc3xlbnwxfHx8fDE3NTc4MjMzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "dried-fruits",
    rating: 4.7,
    reviews: 156,
    brand: "KFL",
    tags: ["Premium", "Sun Dried"]
  },
  // Healthy Snacks
  {
    id: 5,
    name: "Mixed Trail Mix",
    price: 399,
    image: "https://images.unsplash.com/photo-1722971662274-be944aa290fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwdHJhaWwlMjBtaXh8ZW58MXx8fHwxNzU3ODIzMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "healthy-snacks",
    rating: 4.6,
    reviews: 98,
    brand: "OG",
    tags: ["Energy", "On-the-go"]
  },
  {
    id: 6,
    name: "Protein Energy Bar",
    price: 150,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1722971662274-be944aa290fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwdHJhaWwlMjBtaXh8ZW58MXx8fHwxNzU3ODIzMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "healthy-snacks",
    rating: 4.8,
    reviews: 156,
    brand: "KFL",
    tags: ["High Protein", "Pre Workout"]
  },
  // Superfoods
  {
    id: 7,
    name: "Chia Seeds",
    price: 299,
    image: "https://images.unsplash.com/photo-1668019177202-dcc0008beeb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHN1cGVyZm9vZHMlMjBjaGlhJTIwZmxheHxlbnwxfHx8fDE3NTc4MjMzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "superfoods",
    rating: 4.5,
    reviews: 87,
    brand: "OG",
    tags: ["Omega-3", "Superfood"]
  },
  {
    id: 8,
    name: "Quinoa White",
    price: 450,
    image: "https://images.unsplash.com/photo-1668019177202-dcc0008beeb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHN1cGVyZm9vZHMlMjBjaGlhJTIwZmxheHxlbnwxfHx8fDE3NTc4MjMzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "superfoods",
    rating: 4.7,
    reviews: 134,
    brand: "KFL",
    tags: ["Gluten Free", "Protein Rich"]
  },
  // Gift Hampers
  {
    id: 9,
    name: "Premium Gift Box",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1733978281127-c01eb45c8b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZ2lmdCUyMGhhbXBlciUyMGhlYWx0aHl8ZW58MXx8fHwxNzU3ODIzMzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "gift-hampers",
    rating: 4.9,
    reviews: 67,
    brand: "KFL",
    tags: ["Gift Ready", "Premium"]
  },
  // Organic Spices
  {
    id: 10,
    name: "Organic Turmeric",
    price: 199,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3",
    category: "organic-spices",
    rating: 4.8,
    reviews: 203,
    brand: "OG",
    tags: ["Organic", "Anti-inflammatory"]
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'premium-nuts', name: 'Premium Nuts' },
  { id: 'dried-fruits', name: 'Dried Fruits' },
  { id: 'healthy-snacks', name: 'Healthy Snacks' },
  { id: 'superfoods', name: 'Seeds & Superfoods' },
  { id: 'gift-hampers', name: 'Gift Hampers' },
  { id: 'organic-spices', name: 'Organic Spices' }
];

export function ProductGrid({ 
  selectedCategory, 
  onProductClick, 
  onCategoryChange, 
  products: apiProducts, 
  isLoading, 
  error,
  onSearch,
  onSort,
  onPriceFilter
}: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use API products if available, otherwise fallback to hardcoded products
  const displayProducts = apiProducts && apiProducts.length > 0 ? apiProducts : products;
  
  const filteredProducts = selectedCategory === 'all' 
    ? displayProducts 
    : displayProducts.filter(product => product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCategoryName = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'All Products';
  };

  return (
    <>
      <PageHeader
        title={getCategoryName()}
        subtitle="Premium Quality • Farm Fresh • Naturally Sourced"
        description="Discover our extensive range of natural, healthy foods from both KFL and OG brands. Each product is carefully selected for quality and nutrition."
        badge="Our Products"
        badgeColor="green"
        icon={Package}
        backgroundImage="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3"
        size="md"
      />
      
      <PageContainer background="gray" padding="lg">
        <div className="space-y-12">
          {/* Enhanced Filters */}
          <div className="flex flex-col gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all font-poppins text-xs sm:text-sm ${
                    selectedCategory === category.id
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                      : 'border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Filter className="h-3 w-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
            
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-green-500 focus:border-green-500 focus:outline-none flex-1 sm:flex-none"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {filteredProducts.length} products
                </div>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <div className="flex flex-col gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="border-0 shadow-lg overflow-hidden bg-white">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600 text-lg">Error loading products: {error}</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
              </div>
            ) : (
              sortedProducts.map((product) => (
              <Card
                key={product.id}
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white relative ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}
                onClick={() => onProductClick(product)}
              >
                {/* Torn Paper Shadow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <path 
                      d="M0,0 L400,0 L400,350 C380,360 360,340 340,355 C320,370 300,350 280,365 C260,350 240,370 220,355 C200,340 180,360 160,350 C140,360 120,340 100,355 C80,370 60,350 40,365 C20,350 10,370 0,360 Z" 
                      fill="currentColor"
                      className="text-green-600"
                    />
                  </svg>
                </div>

                {/* Brand Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className={`${
                    product.brand === 'KFL' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900'
                  } font-poppins`}>
                    {product.brand}
                  </Badge>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
                >
                  <Heart className={`h-4 w-4 ${
                    wishlist.includes(product.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400'
                  }`} />
                </button>

                {/* Product Image */}
                <div className={`relative bg-white p-4 ${
                  viewMode === 'list' ? 'sm:w-48 sm:h-48 h-56' : 'h-56'
                }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium font-poppins">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className={`relative p-4 sm:p-6 ${
                  viewMode === 'list' ? 'flex-1' : ''
                }`}>
                  {/* Torn Paper Effect at Top */}
                  <div className="absolute -top-3 left-0 right-0 h-6">
                    <svg 
                      className="w-full h-6" 
                      viewBox="0 0 400 24" 
                      preserveAspectRatio="none"
                      fill="white"
                    >
                      <path d="M0,8 C50,2 100,14 150,6 C200,10 250,2 300,8 C350,4 380,12 400,6 L400,24 L0,24 Z" />
                    </svg>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors font-poppins">
                    {product.name}
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-green-600 border-green-200 font-inter">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1 font-inter">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-inter">({product.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900 font-poppins">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through font-inter">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-poppins"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
              ))
            )}
          </div>

          {/* No Products Message */}
          {sortedProducts.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">No products found</h3>
                <p className="text-gray-600 font-inter mb-6">Try selecting a different category or adjusting your filters</p>
                <Button 
                  onClick={() => onCategoryChange('all')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  View All Products
                </Button>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}