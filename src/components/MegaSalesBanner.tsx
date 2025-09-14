import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function MegaSalesBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45
  });

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    // Bounce effect every 3 seconds
    const bounceTimer = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 1000);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(bounceTimer);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 relative overflow-hidden">
      {/* MEGA Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Party Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-28 h-28 bg-green-400 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-blue-400 rounded-full opacity-20 animate-ping" style={{animationDelay: '1s'}}></div>
        
        {/* Party Emoji Rain */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-20 text-5xl animate-bounce">🎉</div>
          <div className="absolute top-24 right-32 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎊</div>
          <div className="absolute bottom-40 left-40 text-6xl animate-bounce" style={{animationDelay: '1s'}}>💥</div>
          <div className="absolute bottom-20 right-20 text-5xl animate-bounce" style={{animationDelay: '1.5s'}}>🔥</div>
          <div className="absolute top-1/2 left-16 text-4xl animate-bounce" style={{animationDelay: '2s'}}>⚡</div>
          <div className="absolute top-1/3 right-16 text-5xl animate-bounce" style={{animationDelay: '2.5s'}}>🌟</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce" style={{animationDelay: '3s'}}>🎯</div>
          <div className="absolute top-2/3 right-1/4 text-5xl animate-bounce" style={{animationDelay: '0.3s'}}>💫</div>
        </div>
        
        {/* Wavy Background */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" fill="white" opacity="0.1"/>
          <path d="M0,80 C300,140 600,20 900,80 C1050,110 1150,50 1200,80 L1200,120 L0,120 Z" fill="white" opacity="0.05"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* MEGA Alert Badge */}
        <div className={`inline-flex items-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-black text-lg mb-8 shadow-2xl border-4 border-white transform ${bounce ? 'animate-bounce scale-110' : ''} transition-all font-fredoka`}>
          <span className="text-2xl mr-3 animate-spin">⚡</span>
          🚨 MEGA FLASH SALE ALERT! 🚨
          <span className="text-2xl ml-3 animate-spin">⚡</span>
        </div>

        {/* ULTIMATE Title */}
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-fredoka animate-pulse drop-shadow-2xl">
          INSANE SALE! 
        </h2>
        
        <div className="text-4xl md:text-6xl lg:text-7xl font-black text-yellow-300 mb-6 font-fredoka animate-bounce drop-shadow-xl">
          UP TO 70% OFF! 🎯
        </div>
        
        <p className="text-2xl md:text-3xl text-white mb-12 max-w-4xl mx-auto font-comic font-bold leading-relaxed drop-shadow-lg">
          🎊 The BIGGEST sale of the year is HERE! Grab premium dry fruits at CRAZY low prices! Your wallet will thank you! 💰
        </p>

        {/* MEGA Countdown Timer */}
        <div className="mb-12">
          <div className="text-2xl text-yellow-300 font-bold mb-6 font-comic animate-pulse">
            ⏰ HURRY! Sale ends in:
          </div>
          <div className="flex justify-center items-center space-x-4 mb-8">
            {[
              { value: timeLeft.days, label: 'DAYS' },
              { value: timeLeft.hours, label: 'HOURS' },
              { value: timeLeft.minutes, label: 'MINS' },
              { value: timeLeft.seconds, label: 'SECS' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white text-red-600 px-6 py-4 rounded-2xl font-black text-3xl md:text-4xl font-fredoka shadow-2xl border-4 border-yellow-400 min-w-[80px] transform hover:scale-110 transition-transform">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-white font-bold text-sm mt-2 font-comic">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MEGA CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-red-500 text-gray-900 px-12 py-6 text-2xl font-black rounded-2xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white font-fredoka"
          >
            <span className="text-3xl mr-3">🛒</span>
            SHOP NOW & SAVE BIG!
            <span className="text-3xl ml-3">💰</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-4 border-white text-white hover:bg-white hover:text-purple-600 px-12 py-6 text-2xl font-black rounded-2xl backdrop-blur-sm shadow-xl font-fredoka hover:scale-105 transition-all"
          >
            🎁 VIEW ALL DEALS
          </Button>
        </div>

        {/* MEGA Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { emoji: "⭐", text: "4.9★ SUPER RATED", subtext: "By 50,000+ happy customers!" },
            { emoji: "👑", text: "PREMIUM QUALITY", subtext: "Only the BEST makes it here!" },
            { emoji: "🚚", text: "LIGHTNING FAST", subtext: "Same day delivery available!" }
          ].map((item, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">{item.emoji}</div>
              <div className="text-white font-black text-lg font-fredoka">{item.text}</div>
              <div className="text-yellow-200 text-sm font-comic">{item.subtext}</div>
            </div>
          ))}
        </div>

        {/* MEGA Urgency Message */}
        <div className="mt-12 text-yellow-300 font-black text-xl animate-pulse font-comic">
          🔥 SELLING FAST! Don't miss out on these INCREDIBLE deals! 🔥
        </div>
      </div>
    </section>
  );
}