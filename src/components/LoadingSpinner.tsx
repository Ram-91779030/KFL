import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 border-4 border-red-200 rounded-full animate-pulse"></div>
      
      {/* Spinning ring */}
      <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
      
      {/* Inner dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
    </div>
  );
}

// Product card skeleton
export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}

// Page skeleton
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-64 bg-gray-200 mb-8"></div>
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}