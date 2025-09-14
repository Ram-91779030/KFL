import React from 'react';
import { Shield, Truck, Heart, Award, Leaf, Star, Clock, Users, Gift, Crown } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every product undergoes rigorous quality checks",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same day delivery in major cities",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    icon: Heart,
    title: "Loved by 50K+",
    description: "Trusted by thousands of happy customers",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600"
  },
  {
    icon: Award,
    title: "Premium Grade",
    description: "Only the finest quality products",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No artificial preservatives or additives",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Star,
    title: "4.9 Rating",
    description: "Consistently rated excellent by customers",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-64 h-64 text-red-100" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="20" cy="20" r="8" opacity="0.6"/>
          <circle cx="40" cy="10" r="5" opacity="0.4"/>
          <circle cx="60" cy="25" r="6" opacity="0.8"/>
          <circle cx="80" cy="15" r="4" opacity="0.5"/>
          <circle cx="30" cy="40" r="7" opacity="0.7"/>
        </svg>
        
        <svg className="absolute bottom-0 right-0 w-80 h-80 text-yellow-100" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20,80 Q40,60 60,80 T100,80 L100,100 L0,100 Z" opacity="0.6"/>
          <path d="M10,90 Q30,70 50,90 T90,90 L100,100 L0,100 Z" opacity="0.4"/>
        </svg>
        
        <svg className="absolute top-1/2 left-1/4 w-32 h-32 text-green-100" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,90 10,90" opacity="0.5"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-poppins">
            Why Choose <span className="text-red-500">KFL</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            We're committed to bringing you the finest quality products with exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              <div className={`absolute inset-0 ${feature.bgColor} group-hover:opacity-0 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-colors duration-300 ${feature.bgColor} group-hover:bg-white/20`}>
                  <feature.icon className={`w-7 h-7 transition-colors duration-300 ${feature.iconColor} group-hover:text-white`} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-3 font-poppins">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 font-inter">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <feature.icon className="w-16 h-16 text-gray-900 group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-full px-8 py-4">
            <Users className="w-6 h-6 text-red-500" />
            <span className="text-lg font-semibold text-gray-900 font-inter">
              Join 50,000+ Happy Customers Today!
            </span>
            <Gift className="w-6 h-6 text-yellow-500" />
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
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}