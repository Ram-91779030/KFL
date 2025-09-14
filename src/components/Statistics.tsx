import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, Star, Truck, TrendingUp, Award, Heart, Crown, Leaf } from 'lucide-react';

const stats = [
  { 
    icon: Users, 
    number: 50000, 
    suffix: '+', 
    label: 'Happy Customers',
    description: 'Trust our quality daily',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  { 
    icon: ShoppingBag, 
    number: 100000, 
    suffix: '+', 
    label: 'Orders Delivered',
    description: 'Successfully completed',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  { 
    icon: Star, 
    number: 4.9, 
    suffix: '★', 
    label: 'Average Rating',
    description: 'Based on 2000+ reviews',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  { 
    icon: Truck, 
    number: 500, 
    suffix: '+', 
    label: 'Cities Served',
    description: 'Across India',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    icon: Leaf,
    number: 25,
    suffix: '+',
    label: 'Partner Farmers',
    description: 'Direct farm connections',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  {
    icon: Award,
    number: 100,
    suffix: '%',
    label: 'Natural Products',
    description: 'No artificial preservatives',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  }
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const increment = target / 100;
    const timer = setInterval(() => {
      setCurrent(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + 'L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    } else if (num < 10) {
      return num.toFixed(1);
    }
    return Math.floor(num).toString();
  };

  return (
    <span>
      {target === 4.9 ? current.toFixed(1) : formatNumber(current)}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 right-0 w-80 h-80 text-red-100" viewBox="0 0 100 100">
          <circle cx="80" cy="20" r="30" fill="currentColor" opacity="0.6"/>
          <circle cx="20" cy="80" r="25" fill="currentColor" opacity="0.4"/>
        </svg>
        
        <svg className="absolute bottom-0 left-0 w-96 h-96 text-yellow-100" viewBox="0 0 100 100">
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" opacity="0.5"/>
        </svg>
        
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-green-100" viewBox="0 0 100 100">
          <polygon points="50,10 90,35 75,85 25,85 10,35" fill="currentColor" opacity="0.3"/>
        </svg>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-pulse">
          <Crown className="w-12 h-12 text-yellow-300" />
        </div>
        <div className="absolute bottom-32 right-32 animate-bounce" style={{animationDelay: '1s'}}>
          <Award className="w-10 h-10 text-blue-300" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse" style={{animationDelay: '2s'}}>
          <TrendingUp className="w-8 h-8 text-green-300" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-poppins">
            Trusted by <span className="text-red-500">Thousands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Our numbers speak for themselves - join our growing family of satisfied customers
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>
              <div className={`absolute inset-0 ${stat.bgColor} group-hover:opacity-0 transition-opacity duration-300 rounded-3xl`}></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-colors duration-300 ${stat.bgColor} group-hover:bg-white/20`}>
                  <stat.icon className={`w-8 h-8 transition-colors duration-300 ${stat.iconColor} group-hover:text-white`} />
                </div>
                
                {/* Number */}
                <div className="text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-white transition-colors duration-300 mb-2 font-poppins">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <div className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2 font-poppins">
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 font-inter text-sm">
                  {stat.description}
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <stat.icon className="w-12 h-12 text-gray-900 group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl px-8 py-6 shadow-xl border border-gray-100">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="font-bold text-gray-900 font-poppins">99% Customer Satisfaction</span>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-gray-900 font-poppins">Quality Guaranteed</span>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-gray-900 font-poppins">Premium Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Curve Divider at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '60px' }}>
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,0 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}