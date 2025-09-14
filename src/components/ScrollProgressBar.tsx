import React, { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100); // Show after scrolling 100px
    };

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div 
        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-150 ease-out shadow-sm relative overflow-hidden"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        
        {/* Progress percentage indicator */}
        {scrollProgress > 10 && (
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-current to-transparent opacity-50" />
        )}
      </div>
      
      {/* Progress percentage text */}
      {scrollProgress > 20 && (
        <div className="absolute right-2 -top-6 text-xs font-bold text-gray-600 bg-white/90 px-2 py-1 rounded-full shadow-sm">
          {Math.round(scrollProgress)}%
        </div>
      )}
    </div>
  );
}
