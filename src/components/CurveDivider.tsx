import React from 'react';

interface CurveDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  height?: string;
  className?: string;
  style?: 'smooth' | 'wave' | 'elegant' | 'organic';
  gradient?: boolean;
  shadow?: boolean;
}

export function CurveDivider({ 
  position = 'bottom', 
  color = '#ffffff', 
  height = '100px',
  className = '',
  style = 'smooth',
  gradient = false,
  shadow = false
}: CurveDividerProps) {
  const isTop = position === 'top';
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  // Enhanced mathematical curves for better precision and beauty
  const getCurvePath = (curveStyle: string, isTopPosition: boolean) => {
    const curves = {
      smooth: {
        top: "M0,120 C240,20 360,100 600,60 C840,20 960,100 1200,60 L1200,0 L0,0 Z",
        bottom: "M0,0 C240,100 360,20 600,60 C840,100 960,20 1200,60 L1200,120 L0,120 Z"
      },
      wave: {
        top: "M0,120 C200,40 400,80 600,60 C800,40 1000,80 1200,60 L1200,0 L0,0 Z",
        bottom: "M0,0 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z"
      },
      elegant: {
        top: "M0,120 C160,10 320,110 480,30 C640,110 800,10 960,90 C1040,20 1120,80 1200,40 L1200,0 L0,0 Z",
        bottom: "M0,0 C160,110 320,10 480,90 C640,10 800,110 960,30 C1040,100 1120,40 1200,80 L1200,120 L0,120 Z"
      },
      organic: {
        top: "M0,120 C120,60 240,20 360,40 C480,30 600,80 720,50 C840,70 960,10 1080,60 C1140,40 1170,80 1200,50 L1200,0 L0,0 Z",
        bottom: "M0,0 C120,60 240,100 360,80 C480,90 600,40 720,70 C840,50 960,110 1080,60 C1140,80 1170,40 1200,70 L1200,120 L0,120 Z"
      }
    };
    
    return curves[curveStyle as keyof typeof curves]?.[isTopPosition ? 'top' : 'bottom'] || curves.smooth[isTopPosition ? 'top' : 'bottom'];
  };
  
  const curvePath = getCurvePath(style, isTop);
  
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {gradient && (
            <linearGradient id={`gradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
          )}
        </defs>
        
        {/* Shadow layer for depth */}
        {shadow && (
          <path
            d={isTop ? 
              "M0,120 C240,25 360,105 600,65 C840,25 960,105 1200,65 L1200,5 L0,5 Z" :
              "M0,5 C240,105 360,25 600,65 C840,105 960,25 1200,65 L1200,125 L0,125 Z"
            }
            fill="rgba(0,0,0,0.05)"
          />
        )}
        
        {/* Main curve */}
        <path
          d={curvePath}
          fill={gradient ? `url(#gradient-${uniqueId})` : color}
        />
        
        {/* Highlight curve for sophistication */}
        {style === 'elegant' && (
          <path
            d={isTop ?
              "M0,120 C200,30 400,90 600,50 C800,30 1000,90 1200,50 L1200,40 C1000,80 800,20 600,40 C400,80 200,20 0,110 Z" :
              "M0,0 C200,90 400,30 600,70 C800,90 1000,30 1200,70 L1200,80 C1000,40 800,100 600,80 C400,40 200,100 0,10 Z"
            }
            fill="rgba(255,255,255,0.3)"
          />
        )}
      </svg>
    </div>
  );
}

// Enhanced predefined curve styles with better alignment
export function RedCurveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  return (
    <CurveDivider 
      position={position} 
      color="#EF4444" 
      height="100px"
      style="elegant"
      gradient={true}
      shadow={true}
      className={className}
    />
  );
}

export function YellowCurveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  return (
    <CurveDivider 
      position={position} 
      color="#FDE047" 
      height="90px"
      style="organic"
      gradient={true}
      shadow={true}
      className={className}
    />
  );
}

export function GreenCurveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  return (
    <CurveDivider 
      position={position} 
      color="#22C55E" 
      height="95px"
      style="smooth"
      gradient={true}
      shadow={true}
      className={className}
    />
  );
}

export function BlueCurveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  return (
    <CurveDivider 
      position={position} 
      color="#3B82F6" 
      height="100px"
      style="wave"
      gradient={true}
      shadow={true}
      className={className}
    />
  );
}

export function WhiteCurveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  return (
    <CurveDivider 
      position={position} 
      color="#ffffff" 
      height="100px"
      style="smooth"
      gradient={false}
      shadow={true}
      className={className}
    />
  );
}

export function GrayCurveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  return (
    <CurveDivider 
      position={position} 
      color="#F8FAFC" 
      height="90px"
      style="elegant"
      gradient={true}
      shadow={false}
      className={className}
    />
  );
}

// Multi-layered curve for ultimate sophistication
export function LayeredCurveDivider({ 
  position = 'bottom', 
  primaryColor = '#ffffff',
  secondaryColor = '#f8fafc',
  className = '' 
}: { 
  position?: 'top' | 'bottom';
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Background layer */}
      <CurveDivider 
        position={position} 
        color={secondaryColor} 
        height="120px"
        style="wave"
        gradient={false}
        shadow={false}
        className="absolute top-0"
      />
      
      {/* Foreground layer */}
      <CurveDivider 
        position={position} 
        color={primaryColor} 
        height="100px"
        style="smooth"
        gradient={true}
        shadow={true}
      />
    </div>
  );
}