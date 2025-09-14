import React, { useState } from 'react';
import { Mail, Gift, CheckCircle, Star, Bell, Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1000 400">
          <defs>
            <radialGradient id="gradient1" cx="30%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE047" />
            </radialGradient>
            <radialGradient id="gradient2" cx="70%" cy="60%" r="40%">
              <stop offset="0%" stopColor="#FEF2F2" />
              <stop offset="100%" stopColor="#F87171" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="100" r="150" fill="url(#gradient1)" opacity="0.6"/>
          <circle cx="800" cy="300" r="120" fill="url(#gradient2)" opacity="0.5"/>
          <circle cx="600" cy="150" r="80" fill="#22C55E" opacity="0.3"/>
        </svg>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-bounce" style={{animationDelay: '0s'}}>
          <Mail className="w-8 h-8 text-red-300" />
        </div>
        <div className="absolute top-32 right-32 animate-bounce" style={{animationDelay: '1s'}}>
          <Gift className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="absolute bottom-40 left-40 animate-bounce" style={{animationDelay: '2s'}}>
          <Star className="w-7 h-7 text-green-400" />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce" style={{animationDelay: '0.5s'}}>
          <Heart className="w-5 h-5 text-red-400" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-8 shadow-xl">
          <Bell className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-poppins">
          Stay Updated with <span className="text-red-500">KFL</span>
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 font-inter">
          Get exclusive deals, health tips, and be the first to know about new products!
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 font-poppins">Exclusive Deals</div>
              <div className="text-sm text-gray-600 font-inter">Up to 30% off</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 font-poppins">Health Tips</div>
              <div className="text-sm text-gray-600 font-inter">Weekly insights</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 font-poppins">New Products</div>
              <div className="text-sm text-gray-600 font-inter">First to know</div>
            </div>
          </div>
        </div>

        {/* Newsletter Form */}
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-6 text-lg border-2 border-gray-200 focus:border-red-500 rounded-xl bg-white shadow-lg"
                  required
                />
              </div>
              <Button 
                type="submit"
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-xl transform hover:scale-105 transition-all"
              >
                <Mail className="w-5 h-5 mr-2" />
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 font-inter">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2 font-poppins">Welcome to KFL Family! 🎉</h3>
              <p className="text-green-700 font-inter">
                Thank you for subscribing! Check your email for a special welcome offer.
              </p>
            </div>
          </div>
        )}

        {/* Social Proof */}
        <div className="mt-12 flex items-center justify-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">10K+ Subscribers</span>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-semibold">Trusted by thousands</span>
          </div>
        </div>
      </div>
    </section>
  );
}