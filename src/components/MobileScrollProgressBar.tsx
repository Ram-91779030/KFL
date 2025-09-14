import React, { useState, useEffect } from 'react';

interface MobileScrollProgressBarProps {
  height?: number;
  showPercentage?: boolean;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export function MobileScrollProgressBar({ 
  height = 4, 
  showPercentage = true,
  showOnMobile = true,
  showOnDesktop = true
}: MobileScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    let scrollTimeout: NodeJS.Timeout;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsScrolling(true);

      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Set timeout to hide scrolling indicator
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Initial mobile check
    checkMobile();

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', checkMobile);
    
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Don't render if conditions aren't met
  if ((isMobile && !showOnMobile) || (!isMobile && !showOnDesktop)) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-[70]">
      {/* Main progress bar */}
      <div 
        className="bg-gray-200/90 backdrop-blur-sm transition-all duration-200"
        style={{ height: `${height}px` }}
      >
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-150 ease-out relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          
          {/* Glowing effect */}
          <div className="absolute inset-0 shadow-lg shadow-current/30" />
        </div>
      </div>

      {/* Mobile-specific progress percentage */}
      {showPercentage && scrollProgress > 5 && isMobile && (
        <div className={`absolute top-1 right-2 transition-all duration-300 ${
          isScrolling ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
        }`}>
          <div className="text-xs font-bold text-gray-700 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      )}

      {/* Desktop progress percentage */}
      {showPercentage && scrollProgress > 10 && !isMobile && (
        <div className={`absolute top-1 right-4 transition-all duration-300 ${
          isScrolling ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
        }`}>
          <div className="text-xs font-bold text-gray-700 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      )}

      {/* Reading indicator for mobile */}
      {scrollProgress > 30 && isMobile && (
        <div className={`absolute top-1 left-2 transition-all duration-300 ${
          isScrolling ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
        }`}>
          <div className="text-xs font-medium text-gray-600 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            📖
          </div>
        </div>
      )}

      {/* Reading indicator for desktop */}
      {scrollProgress > 30 && !isMobile && (
        <div className={`absolute top-1 left-4 transition-all duration-300 ${
          isScrolling ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
        }`}>
          <div className="text-xs font-medium text-gray-600 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            📖 Reading
          </div>
        </div>
      )}

      {/* Scroll direction indicator */}
      <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
        isScrolling ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-xs text-gray-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          {scrollProgress > 50 ? '⬇️' : '⬆️'}
        </div>
      </div>
    </div>
  );
}
