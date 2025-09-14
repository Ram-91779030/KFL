import React from 'react';
import { EnhancedCurve } from './EnhancedCurves';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray' | 'gradient';
  topCurve?: {
    enabled: boolean;
    color?: string;
    style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
    height?: number;
  };
  bottomCurve?: {
    enabled: boolean;
    color?: string;
    style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
    height?: number;
  };
}

export function PageContainer({ 
  children, 
  className = '', 
  size = 'xl',
  padding = 'lg',
  background = 'white',
  topCurve,
  bottomCurve
}: PageContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
  };

  return (
    <section className={`relative ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      {/* Top Curve */}
      {topCurve?.enabled && (
        <div className="absolute top-0 left-0 w-full">
          <EnhancedCurve
            position="top"
            color={topCurve.color || '#ffffff'}
            height={topCurve.height || 100}
            style={topCurve.style || 'smooth'}
          />
        </div>
      )}
      
      <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        {children}
      </div>
      
      {/* Bottom Curve */}
      {bottomCurve?.enabled && (
        <div className="absolute bottom-0 left-0 w-full">
          <EnhancedCurve
            position="bottom"
            color={bottomCurve.color || '#ffffff'}
            height={bottomCurve.height || 100}
            style={bottomCurve.style || 'smooth'}
          />
        </div>
      )}
    </section>
  );
}