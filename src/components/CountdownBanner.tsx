import React, { useState, useEffect } from 'react';
import { Gift, Clock } from 'lucide-react';

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45
  });

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

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          
          {/* Flash Sale Text */}
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-yellow-300" />
            <span className="font-black text-lg font-poppins">🔥 FLASH SALE!</span>
            <span className="font-bold font-inter">UP TO 50% OFF</span>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-yellow-300" />
            <span className="font-semibold font-inter">Ends in:</span>
            <div className="flex items-center space-x-2">
              <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold text-sm font-poppins min-w-[35px] text-center shadow-md">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold text-sm font-poppins min-w-[35px] text-center shadow-md">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold text-sm font-poppins min-w-[35px] text-center shadow-md">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold text-sm font-poppins min-w-[35px] text-center shadow-md">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="font-bold text-yellow-300 font-inter">
            Shop Now & Save Big! 🛍️
          </div>
        </div>
      </div>
    </div>
  );
}