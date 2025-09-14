import React, { useState, useEffect } from 'react';

interface EnhancedScrollProgressBarProps {
  height?: number;
  showPercentage?: boolean;
  color?: 'gradient' | 'red' | 'green' | 'blue';
  position?: 'top' | 'bottom';
}

export function EnhancedScrollProgressBar({ 
  height = 3, 
  showPercentage = true, 
  color = 'gradient',
  position = 'top'
}: EnhancedScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
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

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      case 'gradient':
      default:
        return 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500';
    }
  };

  const getPositionClasses = () => {
    return position === 'top' ? 'top-0' : 'bottom-0';
  };

  return (
    <div className={`fixed left-0 w-full z-[70] ${getPositionClasses()}`}>
      {/* Main progress bar */}
      <div 
        className="bg-gray-200/90 backdrop-blur-sm transition-all duration-200"
        style={{ height: `${height}px` }}
      >
        <div 
          className={`h-full ${getColorClasses()} transition-all duration-150 ease-out relative overflow-hidden`}
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          
          {/* Glowing effect */}
          <div className="absolute inset-0 shadow-lg shadow-current/30" />
        </div>
      </div>

      {/* Progress percentage indicator */}
      {showPercentage && scrollProgress > 5 && (
        <div className={`absolute ${position === 'top' ? 'top-1' : 'bottom-1'} right-4 transition-all duration-300 ${
          isScrolling ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
        }`}>
          <div className="text-xs font-bold text-gray-700 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      )}

      {/* Reading time indicator */}
      {scrollProgress > 30 && (
        <div className={`absolute ${position === 'top' ? 'top-1' : 'bottom-1'} left-4 transition-all duration-300 ${
          isScrolling ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
        }`}>
          <div className="text-xs font-medium text-gray-600 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200">
            📖 Reading
          </div>
        </div>
      )}

      {/* Scroll direction indicator */}
      <div className={`absolute ${position === 'top' ? 'top-1' : 'bottom-1'} left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
        isScrolling ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-xs text-gray-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          {scrollProgress > 50 ? '⬇️' : '⬆️'}
        </div>
      </div>
    </div>
  );
}
