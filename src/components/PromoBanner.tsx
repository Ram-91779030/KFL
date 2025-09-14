import React from 'react';
import { Gift, Sparkles, ArrowRight, Star, Crown, Zap } from 'lucide-react';
import { Button } from './ui/button';

export function PromoBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-500 via-red-600 to-red-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-white/15 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-yellow-400/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Abstract Shapes */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 400">
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="white"/>
          <path d="M0,200 Q250,150 500,200 T1000,200 L1000,400 L0,400 Z" fill="white"/>
        </svg>
        
        {/* Sparkle Effects */}
        <div className="absolute top-16 left-1/4">
          <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute top-32 right-1/4">
          <Star className="w-6 h-6 text-yellow-300 animate-bounce" />
        </div>
        <div className="absolute bottom-24 left-1/3">
          <Crown className="w-7 h-7 text-yellow-300 animate-pulse" style={{animationDelay: '1s'}} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
            <Zap className="w-4 h-4 mr-2" />
            LIMITED TIME OFFER
            <Sparkles className="w-4 h-4 ml-2" />
          </div>

          {/* Main Content */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-poppins">
            MEGA SALE
          </h2>
          
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-300 mb-4 font-poppins">
            UP TO 50% OFF
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-inter">
            🎉 On all premium dry fruits & nuts • Free delivery on orders above ₹999 • Extra 10% off on first order
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 text-xl font-black rounded-xl shadow-2xl transform hover:scale-105 transition-all"
            >
              <Gift className="w-6 h-6 mr-3" />
              Shop Now & Save
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-xl font-bold rounded-xl backdrop-blur-sm"
            >
              View Deals
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">4.9★ Rated</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Premium Quality</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">50K+ Happy Customers</span>
            </div>
          </div>

          {/* Countdown or Urgency */}
          <div className="mt-8 text-yellow-300 font-bold text-lg animate-pulse">
            ⏰ Hurry! Offer ends in 2 days
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}