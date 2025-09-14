import React from 'react';

interface CurveProps {
  position?: 'top' | 'bottom';
  color?: string;
  height?: number;
  className?: string;
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
  opacity?: number;
}

// Mathematical curve generators for precise, beautiful curves
const getCurvePath = (style: string, position: 'top' | 'bottom', viewBox: { width: number; height: number }) => {
  const { width, height } = viewBox;
  const isTop = position === 'top';
  
  const curves = {
    wave: {
      top: `M0,${height} C${width*0.16},${height*0.33} ${width*0.33},${height*0.66} ${width*0.5},${height*0.5} C${width*0.66},${height*0.33} ${width*0.83},${height*0.66} ${width},${height*0.5} L${width},0 L0,0 Z`,
      bottom: `M0,0 C${width*0.16},${height*0.66} ${width*0.33},${height*0.33} ${width*0.5},${height*0.5} C${width*0.66},${height*0.66} ${width*0.83},${height*0.33} ${width},${height*0.5} L${width},${height} L0,${height} Z`
    },
    smooth: {
      top: `M0,${height} C${width*0.25},${height*0.2} ${width*0.75},${height*0.2} ${width},${height} L${width},0 L0,0 Z`,
      bottom: `M0,0 C${width*0.25},${height*0.8} ${width*0.75},${height*0.8} ${width},0 L${width},${height} L0,${height} Z`
    },
    elegant: {
      top: `M0,${height} C${width*0.2},${height*0.1} ${width*0.4},${height*0.9} ${width*0.6},${height*0.3} C${width*0.8},${height*0.1} ${width*0.9},${height*0.7} ${width},${height*0.4} L${width},0 L0,0 Z`,
      bottom: `M0,0 C${width*0.2},${height*0.9} ${width*0.4},${height*0.1} ${width*0.6},${height*0.7} C${width*0.8},${height*0.9} ${width*0.9},${height*0.3} ${width},${height*0.6} L${width},${height} L0,${height} Z`
    },
    organic: {
      top: `M0,${height} C${width*0.1},${height*0.6} ${width*0.3},${height*0.2} ${width*0.45},${height*0.4} C${width*0.55},${height*0.3} ${width*0.7},${height*0.8} ${width*0.85},${height*0.2} C${width*0.93},${height*0.6} ${width*0.97},${height*0.3} ${width},${height*0.5} L${width},0 L0,0 Z`,
      bottom: `M0,0 C${width*0.1},${height*0.4} ${width*0.3},${height*0.8} ${width*0.45},${height*0.6} C${width*0.55},${height*0.7} ${width*0.7},${height*0.2} ${width*0.85},${height*0.8} C${width*0.93},${height*0.4} ${width*0.97},${height*0.7} ${width},${height*0.5} L${width},${height} L0,${height} Z`
    },
    dramatic: {
      top: `M0,${height} C${width*0.15},${height*0.05} ${width*0.35},${height*0.95} ${width*0.5},${height*0.15} C${width*0.65},${height*0.05} ${width*0.85},${height*0.95} ${width},${height*0.15} L${width},0 L0,0 Z`,
      bottom: `M0,0 C${width*0.15},${height*0.95} ${width*0.35},${height*0.05} ${width*0.5},${height*0.85} C${width*0.65},${height*0.95} ${width*0.85},${height*0.05} ${width},${height*0.85} L${width},${height} L0,${height} Z`
    },
    subtle: {
      top: `M0,${height} C${width*0.33},${height*0.7} ${width*0.66},${height*0.7} ${width},${height} L${width},0 L0,0 Z`,
      bottom: `M0,0 C${width*0.33},${height*0.3} ${width*0.66},${height*0.3} ${width},0 L${width},${height} L0,${height} Z`
    }
  };
  
  return curves[style as keyof typeof curves]?.[isTop ? 'top' : 'bottom'] || curves.wave[isTop ? 'top' : 'bottom'];
};

export function EnhancedCurve({
  position = 'bottom',
  color = '#ffffff',
  height = 80,
  className = '',
  style = 'wave',
  opacity = 1
}: CurveProps) {
  const viewBox = { width: 1200, height: 120 };
  const curvePath = getCurvePath(style, position, viewBox);
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`} 
      style={{ height: `${height}px` }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={curvePath}
          fill={color}
          opacity={opacity}
        />
      </svg>
    </div>
  );
}

// Enhanced curve dividers with perfect alignment
export function PerfectCurveDivider({
  position = 'bottom',
  fromColor = '#ffffff',
  toColor,
  height = 80,
  className = '',
  style = 'wave'
}: CurveProps & { fromColor?: string; toColor?: string }) {
  const viewBox = { width: 1200, height: 120 };
  const curvePath = getCurvePath(style, position, viewBox);
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`} 
      style={{ height: `${height}px` }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {toColor && (
            <linearGradient id={`curve-gradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
          )}
        </defs>
        <path
          d={curvePath}
          fill={toColor ? `url(#curve-gradient-${Math.random()})` : fromColor}
        />
      </svg>
    </div>
  );
}

// Multi-layer curves for depth and sophistication
export function LayeredCurve({
  position = 'bottom',
  colors = ['#ffffff', '#f8fafc', '#f1f5f9'],
  heights = [80, 60, 40],
  className = '',
  style = 'wave'
}: {
  position?: 'top' | 'bottom';
  colors?: string[];
  heights?: number[];
  className?: string;
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
}) {
  return (
    <div className={`relative ${className}`}>
      {colors.map((color, index) => (
        <EnhancedCurve
          key={index}
          position={position}
          color={color}
          height={heights[index] || 80}
          style={style}
          opacity={1 - (index * 0.2)}
          className={index > 0 ? 'absolute top-0 left-0' : ''}
        />
      ))}
    </div>
  );
}

// Animated curves with CSS animations
export function AnimatedCurve({
  position = 'bottom',
  color = '#ffffff',
  height = 80,
  className = '',
  style = 'wave',
  animationType = 'float'
}: CurveProps & { animationType?: 'float' | 'pulse' | 'wave' }) {
  const animationClass = {
    float: 'animate-pulse',
    pulse: 'animate-ping',
    wave: 'animate-bounce'
  }[animationType];

  return (
    <div className={`${animationClass}`}>
      <EnhancedCurve
        position={position}
        color={color}
        height={height}
        className={className}
        style={style}
      />
    </div>
  );
}

// Predefined KFL Brand Curves
export function KFLRedCurve({ position = 'bottom', style = 'elegant', className = '' }: { 
  position?: 'top' | 'bottom'; 
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
  className?: string;
}) {
  return (
    <PerfectCurveDivider
      position={position}
      fromColor="#EF4444"
      toColor="#DC2626"
      height={100}
      style={style}
      className={className}
    />
  );
}

export function KFLGreenCurve({ position = 'bottom', style = 'smooth', className = '' }: { 
  position?: 'top' | 'bottom'; 
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
  className?: string;
}) {
  return (
    <PerfectCurveDivider
      position={position}
      fromColor="#22C55E"
      toColor="#16A34A"
      height={90}
      style={style}
      className={className}
    />
  );
}

export function KFLYellowCurve({ position = 'bottom', style = 'organic', className = '' }: { 
  position?: 'top' | 'bottom'; 
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
  className?: string;
}) {
  return (
    <PerfectCurveDivider
      position={position}
      fromColor="#FDE047"
      toColor="#EAB308"
      height={85}
      style={style}
      className={className}
    />
  );
}

export function KFLWhiteCurve({ position = 'bottom', style = 'subtle', className = '' }: { 
  position?: 'top' | 'bottom'; 
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
  className?: string;
}) {
  return (
    <LayeredCurve
      position={position}
      colors={['#ffffff', '#f8fafc', '#f1f5f9']}
      heights={[100, 80, 60]}
      style={style}
      className={className}
    />
  );
}

export function KFLBlueCurve({ position = 'bottom', style = 'wave', className = '' }: { 
  position?: 'top' | 'bottom'; 
  style?: 'wave' | 'smooth' | 'elegant' | 'organic' | 'dramatic' | 'subtle';
  className?: string;
}) {
  return (
    <PerfectCurveDivider
      position={position}
      fromColor="#3B82F6"
      toColor="#2563EB"
      height={95}
      style={style}
      className={className}
    />
  );
}