import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const heroSlides = [
  {
    id: 1,
    title: "🌟 PREMIUM DRY FRUITS 🌟",
    subtitle: "Fresh • Yummy • Super Healthy! 🎉",
    description: "Get ready for the ULTIMATE snacking experience! Our premium nuts are so good, you'll do a happy dance! 💃🕺",
    image: "https://images.unsplash.com/photo-1663652851591-e3d9bfb6d8c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHMlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fHwxNzU3ODIzMTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "🛒 GET YOURS NOW!",
    offer: "🎁 50% OFF",
    badge: "🔥 HOT DEAL",
    bgColor: "from-pink-400 via-red-500 to-yellow-500",
    buttonColor: "bg-gradient-to-r from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    title: "🍇 HEALTHY SNACKING REVOLUTION! 🍇",
    subtitle: "Crunchy • Munchy • Super Fun! 😋",
    description: "Transform boring snack time into EPIC healthy adventures! Every bite is like a party in your mouth! 🎊",
    image: "https://images.unsplash.com/photo-1737099950723-45672db31753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZydWl0cyUyMGRhdGVzJTIwZmlncyUyMGhlYWx0aHklMjBzbmFja3N8ZW58MXx8fHwxNzU3ODIzMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "🚀 START ADVENTURE!",
    offer: "🎪 FREE SHIPPING",
    badge: "⭐ BESTSELLER",
    bgColor: "from-green-400 via-blue-500 to-purple-600",
    buttonColor: "bg-gradient-to-r from-green-400 to-blue-500"
  },
  {
    id: 3,
    title: "🌾 FARM FRESH GUARANTEE! 🌾",
    subtitle: "Direct • Fresh • Amazing Quality! 🌈",
    description: "Straight from happy farms to your happy tummy! Our farmers pick the BEST just for YOU! 🚜✨",
    image: "https://images.unsplash.com/photo-1741112480266-62def497fa27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwb3JnYW5pYyUyMG5hdHVyYWwlMjBwcm9kdWNlfGVufDF8fHx8MTc1NzgyMzE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "🌟 DISCOVER MORE!",
    offer: "💎 QUALITY PROMISE",
    badge: "🚜 FARM DIRECT",
    bgColor: "from-yellow-400 via-green-500 to-blue-400",
    buttonColor: "bg-gradient-to-r from-yellow-400 to-green-500"
  }
];

export function CartoonHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
      {/* Super Fun Background */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover opacity-15"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-20`}></div>
        
        {/* Floating Fun Elements */}
        <div className="absolute inset-0">
          {/* Bouncing Emojis */}
          <div className="absolute top-20 left-20 text-6xl animate-bounce" style={{animationDelay: '0s'}}>🎈</div>
          <div className="absolute top-32 right-32 text-5xl animate-bounce" style={{animationDelay: '1s'}}>⭐</div>
          <div className="absolute bottom-40 left-40 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🎉</div>
          <div className="absolute bottom-20 right-20 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🌈</div>
          <div className="absolute top-1/2 left-10 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>✨</div>
          <div className="absolute top-1/3 right-10 text-4xl animate-bounce" style={{animationDelay: '2.5s'}}>🍯</div>
          
          {/* Floating Shapes */}
          <div className="absolute top-16 left-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-16 h-16 bg-pink-400 rounded-full opacity-50 animate-ping"></div>
          <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-blue-400 rounded-full opacity-70 animate-bounce"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Super Fun Content */}
          <div className="text-center lg:text-left space-y-8">
            
            {/* Mega Fun Badge */}
            <div className="inline-flex items-center">
              <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-3 text-lg font-black rounded-full shadow-2xl animate-pulse font-fredoka">
                {slide.badge}
              </Badge>
            </div>

            {/* MEGA Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text leading-tight font-fredoka animate-pulse">
              {slide.title}
            </h1>
            
            <p className="text-2xl lg:text-3xl font-bold text-purple-600 font-comic">
              {slide.subtitle}
            </p>
            
            <p className="text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 font-comic leading-relaxed">
              {slide.description}
            </p>

            {/* MEGA Offer */}
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-black text-2xl shadow-2xl animate-bounce font-fredoka">
              {slide.offer}
            </div>

            {/* SUPER CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
              <Button 
                size="lg" 
                className={`${slide.buttonColor} hover:scale-110 text-white px-10 py-6 text-xl font-black rounded-2xl shadow-2xl transform transition-all duration-300 font-fredoka border-4 border-white`}
              >
                {slide.cta}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-4 border-purple-400 text-purple-600 hover:bg-purple-100 px-10 py-6 text-xl font-black rounded-2xl shadow-xl font-fredoka hover:scale-105 transition-all"
              >
                🎯 VIEW PRODUCTS
              </Button>
            </div>

            {/* Fun Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {[
                { emoji: "🌿", text: "100% Natural" },
                { emoji: "🛡️", text: "Quality Shield" },
                { emoji: "🚚", text: "Super Fast" },
                { emoji: "⭐", text: "5-Star Rated" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 justify-center lg:justify-start bg-white/80 rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
                  <span className="text-2xl">{feature.emoji}</span>
                  <span className="text-sm font-bold text-gray-700 font-comic">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-96 object-cover rounded-3xl shadow-2xl border-8 border-white"
              />
              
              {/* Fun Floating Stats */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl transform rotate-12 border-4 border-white">
                <div className="text-3xl font-black text-white font-fredoka">4.9⭐</div>
                <div className="text-sm text-white font-bold font-comic">SUPER RATING!</div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 shadow-2xl transform -rotate-12 border-4 border-white">
                <div className="text-3xl font-black text-white font-fredoka">50K+</div>
                <div className="text-sm text-white font-bold font-comic">HAPPY FANS!</div>
              </div>
              
              {/* Floating hearts */}
              <div className="absolute top-1/4 -right-8 text-4xl animate-bounce">💖</div>
              <div className="absolute bottom-1/4 -left-8 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🎯</div>
            </div>
          </div>
        </div>
      </div>

      {/* Super Fun Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-yellow-400 w-12 h-4 shadow-lg' 
                : 'bg-white/60 hover:bg-white/80 w-4 h-4'
            }`}
          />
        ))}
      </div>
    </section>
  );
}