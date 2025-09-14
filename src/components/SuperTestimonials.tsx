import React, { useState } from 'react';
import { Button } from './ui/button';

const testimonials = [
  {
    id: 1,
    name: "Priya the Snack Queen 👑",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "OMG! THESE ARE LIFE-CHANGING! 🤯",
    text: "I'm totally OBSESSED! These dry fruits are so fresh and delicious, I literally do a happy dance every time my order arrives! My kids fight over who gets the last almond! 😂💃",
    product: "Premium Almonds",
    verified: true,
    emoji: "🤩",
    bgGradient: "from-pink-400 to-purple-500"
  },
  {
    id: 2,
    name: "Rajesh the Health Hero 💪",
    location: "Delhi", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "FASTEST DELIVERY EVER! ⚡",
    text: "BOOM! Ordered cashews for Diwali and they arrived the SAME DAY! The packaging was so beautiful, my guests thought I bought them from a fancy store! Everyone's asking where I got them! 🎊",
    product: "Roasted Cashews",
    verified: true,
    emoji: "🚀",
    bgGradient: "from-blue-400 to-cyan-500"
  },
  {
    id: 3,
    name: "Anita the Fitness Guru 🏋️‍♀️",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "100% NATURAL = 100% AMAZING! 🌱",
    text: "As a fitness trainer, I'm SUPER picky about quality. KFL's products are absolutely PERFECT! Pure, natural, and incredibly fresh. My clients are addicted to these snacks! 💚",
    product: "Mixed Superfood Pack",
    verified: true,
    emoji: "💚",
    bgGradient: "from-green-400 to-emerald-500"
  },
  {
    id: 4,
    name: "Vikram the Gift Master 🎁",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "PERFECT FOR GIFTING! 🎉",
    text: "WOW! The gift hampers are absolutely STUNNING! Bought them for my clients and they're calling me asking where to get more! Best business decision EVER! 📞💼",
    product: "Premium Gift Hamper",
    verified: true,
    emoji: "🎁",
    bgGradient: "from-yellow-400 to-orange-500"
  }
];

export function SuperTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Super Fun Background */}
      <div className="absolute inset-0">
        {/* Floating Party Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-yellow-200 to-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-green-200 to-cyan-300 rounded-full opacity-35 animate-ping"></div>
        
        {/* Happy Emojis */}
        <div className="absolute top-20 left-1/4 text-6xl opacity-20 animate-bounce">😍</div>
        <div className="absolute bottom-40 right-1/3 text-5xl opacity-15 animate-bounce" style={{animationDelay: '1s'}}>🥳</div>
        <div className="absolute top-1/3 left-20 text-4xl opacity-25 animate-bounce" style={{animationDelay: '2s'}}>🎊</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>💖</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MEGA Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-8 shadow-2xl border-4 border-white">
            <span className="text-4xl">💖</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text mb-8 font-fredoka">
            Our SUPER FANS Are Going CRAZY! 🤸‍♀️
          </h2>
          <p className="text-2xl text-purple-600 max-w-4xl mx-auto font-comic font-bold">
            Don't just take our word for it - hear from our absolutely OBSESSED customers! 🎯
          </p>
        </div>

        {/* MEGA Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          <div className={`bg-gradient-to-br ${currentTestimonial.bgGradient} rounded-3xl shadow-2xl p-2 border-4 border-white transform hover:scale-105 transition-all duration-500`}>
            <div className="bg-white rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              
              {/* Fun Quote Bubble */}
              <div className="absolute -top-6 left-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                  <span className="text-2xl">💬</span>
                </div>
              </div>

              {/* Floating Emojis */}
              <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce">{currentTestimonial.emoji}</div>
              <div className="absolute bottom-4 left-4 text-3xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>✨</div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Customer Super Info */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block mb-6">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 shadow-xl border-4 border-white"
                    />
                    {currentTestimonial.verified && (
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-2xl">✅</span>
                      </div>
                    )}
                    {/* Fun Floating Hearts */}
                    <div className="absolute -top-4 -left-4 text-2xl animate-bounce">💕</div>
                    <div className="absolute -bottom-4 -right-8 text-xl animate-bounce" style={{animationDelay: '0.5s'}}>⭐</div>
                  </div>
                  
                  <h4 className="font-black text-2xl text-gray-900 font-fredoka mb-2">{currentTestimonial.name}</h4>
                  <p className="text-purple-600 font-comic font-bold mb-4">📍 {currentTestimonial.location}</p>
                  
                  {/* MEGA Rating */}
                  <div className="flex items-center justify-center lg:justify-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">⭐</span>
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold border-2 border-purple-200">
                    <span className="text-lg mr-2">🎯</span>
                    {currentTestimonial.product}
                  </div>
                </div>

                {/* MEGA Testimonial Content */}
                <div className="lg:col-span-2">
                  <h3 className="text-3xl font-black text-gray-900 mb-6 font-fredoka">
                    "{currentTestimonial.title}"
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed font-comic font-semibold">
                    {currentTestimonial.text}
                  </p>
                  
                  {/* Fun Rating Showcase */}
                  <div className="mt-8 flex items-center justify-center lg:justify-start space-x-4">
                    <div className="bg-yellow-100 rounded-full px-6 py-3 border-2 border-yellow-300">
                      <span className="font-black text-yellow-700 font-fredoka">VERIFIED BUYER ✅</span>
                    </div>
                    <div className="bg-green-100 rounded-full px-6 py-3 border-2 border-green-300">
                      <span className="font-black text-green-700 font-fredoka">5⭐ RATING</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MEGA Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="rounded-full p-4 border-4 border-purple-300 text-purple-600 hover:border-purple-500 hover:text-purple-700 hover:scale-110 transition-all shadow-lg"
            >
              <span className="text-2xl">👈</span>
            </Button>

            {/* Fun Dots Indicator */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full border-2 ${
                    index === currentIndex 
                      ? 'bg-purple-500 border-purple-500 w-12 h-4 shadow-lg' 
                      : 'bg-purple-200 border-purple-300 hover:bg-purple-300 w-4 h-4'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="rounded-full p-4 border-4 border-purple-300 text-purple-600 hover:border-purple-500 hover:text-purple-700 hover:scale-110 transition-all shadow-lg"
            >
              <span className="text-2xl">👉</span>
            </Button>
          </div>
        </div>

        {/* MEGA Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: "⭐", stat: "4.9/5", text: "AMAZING RATING", subtext: "From 2000+ reviews!" },
              { emoji: "💖", stat: "50K+", text: "SUPER HAPPY FANS", subtext: "And growing daily!" },
              { emoji: "✅", stat: "99%", text: "SATISFACTION RATE", subtext: "We make people smile!" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-100 hover:border-purple-300 transform hover:scale-105 transition-all">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <div className="text-3xl font-black text-purple-600 font-fredoka mb-2">{item.stat}</div>
                <div className="font-black text-gray-900 font-fredoka mb-1">{item.text}</div>
                <div className="text-gray-600 font-comic">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}