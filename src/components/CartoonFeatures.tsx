import React from 'react';

const features = [
  {
    emoji: "🛡️",
    iconify: "fluent-emoji:shield",
    title: "MEGA QUALITY SHIELD!",
    description: "Every single nut gets the VIP treatment! We test everything twice because YOU deserve PERFECT! ✨",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    shadowColor: "shadow-blue-200"
  },
  {
    emoji: "🚀",
    iconify: "fluent-emoji:rocket",
    title: "LIGHTNING FAST DELIVERY!",
    description: "ZOOM! Your order flies to you faster than a superhero! Same day delivery because waiting is boring! ⚡",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    shadowColor: "shadow-green-200"
  },
  {
    emoji: "💖",
    iconify: "fluent-emoji:red-heart",
    title: "50K+ SUPER HAPPY FANS!",
    description: "Our customers don't just love us, they're OBSESSED! Join the happiness club and see why! 🎉",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    shadowColor: "shadow-pink-200"
  },
  {
    emoji: "👑",
    iconify: "fluent-emoji:crown",
    title: "ROYAL PREMIUM GRADE!",
    description: "Only THE BEST nuts make it to your royal tummy! We pick like we're choosing crown jewels! 💎",
    color: "from-yellow-400 to-amber-500",
    bgColor: "bg-yellow-50",
    shadowColor: "shadow-yellow-200"
  },
  {
    emoji: "🌱",
    iconify: "fluent-emoji:seedling",
    title: "100% PURE NATURAL MAGIC!",
    description: "No weird chemicals, no artificial anything! Just pure, natural, mother-earth goodness! 🌍",
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-emerald-50",
    shadowColor: "shadow-emerald-200"
  },
  {
    emoji: "⭐",
    iconify: "fluent-emoji:star",
    title: "AMAZING 4.9⭐ RATING!",
    description: "We're basically the superhero of healthy snacks! Our customers can't stop giving us stars! ⭐⭐⭐⭐⭐",
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50",
    shadowColor: "shadow-purple-200"
  }
];

export function CartoonFeatures() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 relative overflow-hidden">
      {/* Super Fun Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Fun Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-35 animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        
        {/* Fun Emoji Background */}
        <div className="absolute top-16 left-1/3 text-6xl opacity-10 animate-bounce">🎪</div>
        <div className="absolute bottom-40 right-1/4 text-5xl opacity-15 animate-bounce" style={{animationDelay: '1s'}}>🎨</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🌈</div>
        <div className="absolute top-1/3 left-20 text-5xl opacity-10 animate-bounce" style={{animationDelay: '0.5s'}}>🎭</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MEGA Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl border-4 border-white">
            <span className="text-4xl">👑</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text mb-8 font-fredoka">
            Why KFL is ABSOLUTELY AMAZING! 🎉
          </h2>
          <p className="text-2xl text-purple-600 max-w-4xl mx-auto font-comic font-bold">
            Get ready to discover why thousands of people are going CRAZY for our incredible healthy snacks! 🤸‍♀️
          </p>
        </div>

        {/* SUPER Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-3xl p-8 shadow-xl ${feature.shadowColor} hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-yellow-300 hover:-translate-y-4 hover:rotate-1 transform`}
            >
              {/* Fun Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              <div className={`absolute inset-0 ${feature.bgColor} group-hover:opacity-50 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* MEGA Fun Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500 ${feature.bgColor} group-hover:scale-125 group-hover:rotate-12 shadow-lg`}>
                  <span className="text-4xl group-hover:animate-bounce">{feature.emoji}</span>
                </div>
                
                {/* SUPER Title */}
                <h3 className="text-xl font-black text-gray-900 group-hover:text-purple-600 transition-colors duration-500 mb-4 font-fredoka">
                  {feature.title}
                </h3>
                
                {/* Fun Description */}
                <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-500 font-comic leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Fun Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <span className="text-6xl">{feature.emoji}</span>
              </div>
              
              {/* Floating Mini Emojis */}
              <div className="absolute -top-2 -left-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce">✨</div>
              <div className="absolute -bottom-2 -right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce" style={{animationDelay: '0.5s'}}>🎯</div>
            </div>
          ))}
        </div>

        {/* MEGA Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl px-12 py-8 shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300">
            <span className="text-3xl animate-bounce">🎊</span>
            <span className="text-2xl font-black text-white font-fredoka">
              Join 50,000+ SUPER HAPPY Customers Today!
            </span>
            <span className="text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🎈</span>
          </div>
        </div>
      </div>
    </section>
  );
}