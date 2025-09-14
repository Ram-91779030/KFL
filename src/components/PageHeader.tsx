import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeColor?: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
  icon?: React.ComponentType<any>;
  backgroundImage?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function PageHeader({
  title,
  subtitle,
  description,
  badge,
  badgeColor = 'red',
  icon: Icon,
  backgroundImage,
  showBackButton = false,
  onBack,
  children,
  size = 'md'
}: PageHeaderProps) {
  const sizeClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24'
  };

  const badgeColors = {
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  return (
    <section className={`relative ${sizeClasses[size]} bg-gradient-to-br from-gray-50 via-white to-red-50 overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70"></div>
        </div>
      )}

      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        {/* Top-right circular elements - better aligned */}
        <svg className="absolute top-4 right-4 w-72 h-72 text-red-100" viewBox="0 0 100 100">
          <circle cx="75" cy="25" r="28" fill="currentColor" opacity="0.6"/>
          <circle cx="25" cy="75" r="22" fill="currentColor" opacity="0.4"/>
        </svg>
        
        {/* Bottom-left wave - properly positioned */}
        <svg className="absolute bottom-0 left-0 w-80 h-80 text-yellow-100" viewBox="0 0 100 100">
          <path d="M0,50 Q25,30 50,50 T100,45 L100,100 L0,100 Z" fill="currentColor" opacity="0.5"/>
        </svg>
        
        {/* Center polygon - better balanced */}
        <svg className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-56 h-56 text-green-100" viewBox="0 0 100 100">
          <polygon points="50,15 85,35 75,80 25,80 15,35" fill="currentColor" opacity="0.3"/>
        </svg>
        
        {/* Additional balance element - top-left */}
        <svg className="absolute top-8 left-8 w-48 h-48 text-blue-100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.25"/>
          <circle cx="30" cy="30" r="10" fill="currentColor" opacity="0.2"/>
          <circle cx="70" cy="70" r="8" fill="currentColor" opacity="0.15"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Back Button */}
          {showBackButton && onBack && (
            <div className="mb-6 text-left">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-600 hover:text-red-500 hover:bg-red-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <Badge className={`${badgeColors[badgeColor]} mb-6 px-4 py-2 text-sm font-semibold`}>
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {badge}
            </Badge>
          )}

          {/* Icon */}
          {Icon && !badge && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6">
              <Icon className="w-8 h-8 text-white" />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-poppins leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl sm:text-2xl text-red-600 font-semibold mb-4 font-inter">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-8 font-inter leading-relaxed">
              {description}
            </p>
          )}

          {/* Custom Children */}
          {children}
        </div>
      </div>

      {/* Enhanced Beautiful Curve Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
          style={{ height: '100px' }}
        >
          {/* Multi-layer curve for depth */}
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* Background shadow curve */}
          <path
            d="M0,10 C200,90 400,50 600,70 C800,90 1000,50 1200,70 L1200,120 L0,120 Z"
            fill="rgba(0,0,0,0.05)"
          />
          
          {/* Main elegant curve */}
          <path
            d="M0,0 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z"
            fill="url(#curveGradient)"
          />
          
          {/* Highlight curve for sophistication */}
          <path
            d="M0,0 C150,60 350,20 500,40 C650,60 850,20 1000,40 C1100,50 1150,30 1200,35 L1200,45 C1150,40 1100,60 1000,50 C850,30 650,70 500,50 C350,30 150,70 0,10 Z"
            fill="rgba(255,255,255,0.8)"
          />
        </svg>
      </div>
    </section>
  );
}