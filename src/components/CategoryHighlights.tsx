import React from 'react';
import { ArrowRight, Star, Leaf, Gift, Heart, Sparkles, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GrayCurveDivider } from './CurveDivider';

import type { Category } from '../types';

interface CategoryHighlightsProps {
  onCategoryClick: (category: string) => void;
  categories?: Category[];
  isLoading?: boolean;
}

const categories = [
  {
    id: 'premium-nuts',
    name: 'Premium Nuts',
    description: 'Handpicked almonds, cashews, walnuts & pistachios',
    image: 'https://images.unsplash.com/photo-1594900689460-fdad3599342c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHN8ZW58MXx8fHwxNzU3NzcxNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '25+ Products',
    color: 'bg-red-500',
    textColor: 'text-white',
    discount: '30% OFF',
    badge: 'Best Seller',
    icon: Crown
  },
  {
    id: 'dried-fruits',
    name: 'Dried Fruits',
    description: 'Sun-dried dates, figs, apricots & raisins',
    image: 'https://images.unsplash.com/photo-1742796847334-1fa19b4aa249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZydWl0cyUyMGRhdGVzJTIwcmFpc2luc3xlbnwxfHx8fHwxNzU3ODIzMzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '18+ Products',
    color: 'bg-green-500',
    textColor: 'text-white',
    discount: '25% OFF',
    badge: 'Natural',
    icon: Leaf
  },
  {
    id: 'healthy-snacks',
    name: 'Healthy Snacks',
    description: 'Trail mixes, energy bars & roasted snacks',
    image: 'https://images.unsplash.com/photo-1722971662274-be944aa290fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwdHJhaWwlMjBtaXh8ZW58MXx8fHwxNzU3ODIzMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '20+ Products',
    color: 'bg-yellow-500',
    textColor: 'text-gray-900',
    discount: '20% OFF',
    badge: 'Trending',
    icon: Sparkles
  },
  {
    id: 'superfoods',
    name: 'Seeds & Superfoods',
    description: 'Chia, flax, pumpkin seeds & quinoa',
    image: 'https://images.unsplash.com/photo-1668019177202-dcc0008beeb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHN1cGVyZm9vZHMlMjBjaGlhJTIwZmxheHxlbnwxfHx8fDE3NTc4MjMzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '15+ Products',
    color: 'bg-blue-500',
    textColor: 'text-white',
    discount: '35% OFF',
    badge: 'Superfood',
    icon: Star
  },
  {
    id: 'gift-hampers',
    name: 'Gift Hampers',
    description: 'Curated gift boxes for special occasions',
    image: 'https://images.unsplash.com/photo-1733978281127-c01eb45c8b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZ2lmdCUyMGhhbXBlciUyMGhlYWx0aHl8ZW58MXx8fHwxNzU3ODIzMzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '12+ Products',
    color: 'bg-purple-500',
    textColor: 'text-white',
    discount: '15% OFF',
    badge: 'Premium',
    icon: Gift
  },
  {
    id: 'organic-spices',
    name: 'Organic Spices',
    description: 'Pure, aromatic spices for healthy cooking',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3',
    products: '30+ Products',
    color: 'bg-orange-500',
    textColor: 'text-white',
    discount: '40% OFF',
    badge: 'Organic',
    icon: Heart
  }
];

export function CategoryHighlights({ onCategoryClick, categories: apiCategories, isLoading }: CategoryHighlightsProps) {
  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-800 mb-4 font-poppins">
            Our Categories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 font-poppins">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Discover our carefully curated selection of premium dry fruits, nuts, and healthy foods
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden bg-white">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </Card>
            ))
          ) : (
            (apiCategories && apiCategories.length > 0 ? apiCategories : categories).map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden bg-white"
                onClick={() => onCategoryClick(category)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1594900689460-fdad3599342c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHMlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NTc4MjMxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white font-bold">
                      {category.discount || '30% OFF'}
                    </Badge>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900 font-bold">
                      {category.badge || 'Featured'}
                    </Badge>
                  </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-xl text-gray-900 group-hover:text-red-500 transition-colors font-poppins">
                    {category.name}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>
                
                <p className="text-gray-600 mb-4 font-inter">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-green-600 flex items-center font-inter">
                    <Leaf className="h-4 w-4 mr-1" />
                    {category.products}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1 font-inter">(4.8)</span>
                  </div>
                </div>
              </div>
            </Card>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h3 className="text-3xl font-black text-gray-900 mb-4 font-poppins">
            🎉 Special Offers Available! 🎉
          </h3>
          <p className="text-lg text-gray-600 mb-8 font-inter">
            Up to 40% OFF on all categories • Free delivery on orders above ₹999
          </p>
          
          <Button 
            size="lg" 
            onClick={() => onCategoryClick('all')}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Gift className="w-5 h-5 mr-2" />
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Enhanced Curve Divider at Bottom */}
      <GrayCurveDivider position="bottom" />
    </section>
  );
}