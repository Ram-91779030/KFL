import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function PageTransition({ children, isLoading = false }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
            <div className="absolute inset-0 h-12 w-12 border-4 border-red-200 rounded-full animate-pulse mx-auto"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading...</h3>
          <p className="text-gray-600">Preparing your healthy experience</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}