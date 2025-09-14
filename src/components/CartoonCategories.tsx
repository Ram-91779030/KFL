import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface CartoonCategoriesProps {
  onCategoryClick: (category: string) => void;
}

const categories = [
  {
    id: 'premium-nuts',
    name: '🥜 PREMIUM NUTS',
    description: 'Crunchy, munchy, SUPER yummy almonds, cashews & more!',
    image: 'https://images.unsplash.com/photo-1594900689460-fdad3599342c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHN8ZW58MXx8fHwxNzU3NzcxNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '25+ Super Products',
    discount: '🔥 30% OFF',
    badge: '👑 BESTSELLER',
    emoji: '🥜',
    bgGradient: 'from-red-400 to-pink-500',
    borderColor: 'border-red-300',
    textColor: 'text-red-600'
  },
  {
    id: 'dried-fruits',
    name: '🍇 DRIED FRUITS',
    description: 'Sweet, chewy, naturally amazing dates, figs & raisins!',
    image: 'https://images.unsplash.com/photo-1742796847334-1fa19b4aa249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZydWl0cyUyMGRhdGVzJTIwcmFpc2luc3xlbnwxfHx8fHwxNzU3ODIzMzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '18+ Yummy Options',
    discount: '🎁 25% OFF',
    badge: '🌱 NATURAL',
    emoji: '🍇',
    bgGradient: 'from-green-400 to-emerald-500',
    borderColor: 'border-green-300',
    textColor: 'text-green-600'
  },
  {
    id: 'healthy-snacks',
    name: '🍿 HEALTHY SNACKS',
    description: 'Trail mixes, energy bars & roasted goodies for champions!',
    image: 'https://images.unsplash.com/photo-1722971662274-be944aa290fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwdHJhaWwlMjBtaXh8ZW58MXx8fHwxNzU3ODIzMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '20+ Fun Snacks',
    discount: '⚡ 20% OFF',
    badge: '🔥 TRENDING',
    emoji: '🍿',
    bgGradient: 'from-yellow-400 to-orange-500',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-600'
  },
  {
    id: 'superfoods',
    name: '🌟 SUPERFOODS',
    description: 'Chia, flax, pumpkin seeds - your health superheroes!',
    image: 'https://images.unsplash.com/photo-1668019177202-dcc0008beeb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHN1cGVyZm9vZHMlMjBjaGlhJTIwZmxheHxlbnwxfHx8fDE3NTc4MjMzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '15+ Power Foods',
    discount: '💥 35% OFF',
    badge: '💪 SUPERFOOD',
    emoji: '🌟',
    bgGradient: 'from-blue-400 to-purple-500',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-600'
  },
  {
    id: 'gift-hampers',
    name: '🎁 GIFT HAMPERS',
    description: 'Gorgeous gift boxes that make everyone SUPER happy!',
    image: 'https://images.unsplash.com/photo-1733978281127-c01eb45c8b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZ2lmdCUyMGhhbXBlciUyMGhlYWx0aHl8ZW58MXx8fHwxNzU3ODIzMzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    products: '12+ Gift Options',
    discount: '🎊 15% OFF',
    badge: '💎 PREMIUM',
    emoji: '🎁',
    bgGradient: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-600'
  },
  {
    id: 'organic-spices',
    name: '🌶️ ORGANIC SPICES',
    description: 'Pure, aromatic spices that make cooking AMAZING!',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3',
    products: '30+ Spice Varieties',
    discount: '🌪️ 40% OFF',
    badge: '🌿 ORGANIC',
    emoji: '🌶️',
    bgGradient: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-600'
  }
];

export function CartoonCategories({ onCategoryClick }: CartoonCategoriesProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Super Fun Background */}
      <div className="absolute inset-0">
        {/* Floating Fun Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-blue-300 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-green-300 rounded-full opacity-15 animate-pulse"></div>
        
        {/* Food Emojis Background */}
        <div className="absolute top-16 left-1/3 text-8xl opacity-5 animate-bounce">🥜</div>
        <div className="absolute bottom-40 right-1/4 text-6xl opacity-10 animate-bounce" style={{animationDelay: '1s'}}>🍇</div>
        <div className="absolute top-1/2 right-10 text-7xl opacity-8 animate-bounce" style={{animationDelay: '2s'}}>🌟</div>
        <div className="absolute top-1/3 left-20 text-5xl opacity-12 animate-bounce" style={{animationDelay: '0.5s'}}>🎁</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MEGA Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6 px-6 py-3 text-lg font-black font-fredoka border-4 border-white shadow-xl">
            🛍️ OUR AMAZING CATEGORIES
          </Badge>
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mb-8 font-fredoka">
            SHOP BY SUPER CATEGORIES! 🎯
          </h2>
          <p className="text-2xl text-purple-600 max-w-4xl mx-auto font-comic font-bold">
            Discover our INCREDIBLE selection of premium healthy foods that will make you go WOW! 🤩
          </p>
        </div>

        {/* MEGA Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`group cursor-pointer border-4 ${category.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 overflow-hidden bg-white hover:scale-105`}
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                />
                
                {/* MEGA Discount Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-lg px-4 py-2 rounded-full shadow-xl border-2 border-white">
                    {category.discount}
                  </Badge>
                </div>
                
                {/* MEGA Category Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-gray-900 font-black px-4 py-2 rounded-full shadow-xl border-2 border-gray-200">
                    {category.badge}
                  </Badge>
                </div>
                
                {/* Fun Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Big Emoji Overlay */}
                <div className="absolute bottom-4 right-4 text-6xl opacity-80 group-hover:animate-bounce">
                  {category.emoji}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-black text-xl text-gray-900 group-hover:text-purple-600 transition-colors font-fredoka">
                    {category.name}
                  </h3>
                  <span className="text-2xl group-hover:translate-x-2 group-hover:scale-125 transition-all">🚀</span>
                </div>
                
                <p className="text-gray-600 mb-6 font-comic font-semibold leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-black ${category.textColor} flex items-center font-fredoka`}>
                    <span className="text-lg mr-2">📦</span>
                    {category.products}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">⭐</span>
                    ))}
                    <span className="text-sm text-gray-500 ml-2 font-comic font-bold">(4.8)</span>
                  </div>
                </div>
                
                {/* Fun Hover Button */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Button className={`w-full bg-gradient-to-r ${category.bgGradient} text-white font-black py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-fredoka`}>
                    🛒 SHOP NOW!
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* MEGA CTA Section */}
        <div className="text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-3xl p-12 border-4 border-white shadow-2xl">
          <h3 className="text-4xl font-black text-white mb-6 font-fredoka drop-shadow-lg">
            🎉 SPECIAL MEGA OFFERS AVAILABLE! 🎉
          </h3>
          <p className="text-xl text-white mb-8 font-comic font-bold drop-shadow-lg">
            Up to 50% OFF on ALL categories • FREE delivery on orders above ₹999 • EXTRA 10% off for new customers!
          </p>
          
          <Button 
            size="lg" 
            onClick={() => onCategoryClick('all')}
            className="bg-white text-purple-600 hover:bg-yellow-100 px-12 py-6 text-xl font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 border-4 border-purple-200 font-fredoka"
          >
            <span className="text-2xl mr-3">🎁</span>
            VIEW ALL AMAZING PRODUCTS
            <span className="text-2xl ml-3">🚀</span>
          </Button>
          
          {/* Fun Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { emoji: "⭐", text: "50K+ HAPPY CUSTOMERS" },
              { emoji: "🚚", text: "LIGHTNING FAST DELIVERY" },
              { emoji: "💎", text: "PREMIUM QUALITY GUARANTEE" }
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-white/30 flex items-center space-x-2">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-white font-bold font-comic">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}