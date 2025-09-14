import React, { useEffect } from 'react';

interface PerformanceOptimizerProps {
  enableAnalytics?: boolean;
  enableLazyLoading?: boolean;
  enablePreloading?: boolean;
}

export function PerformanceOptimizer({ 
  enableAnalytics = true,
  enableLazyLoading = true,
  enablePreloading = true
}: PerformanceOptimizerProps) {

  useEffect(() => {
    // Google Analytics
    if (enableAnalytics && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
      });

      // Track page views
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }

    // Lazy loading optimization
    if (enableLazyLoading && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Preload critical resources
    if (enablePreloading) {
      const criticalResources = [
        '/fonts/Poppins-Regular.woff2',
        '/fonts/Inter-Regular.woff2',
        '/images/hero-bg.jpg',
        '/images/logo.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.woff2') ? 'font' : 'image';
        if (resource.endsWith('.woff2')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    }

    // Service Worker registration for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          // Core Web Vitals
          const metrics = {
            FCP: perfData.firstContentfulPaint,
            LCP: perfData.loadEventEnd - perfData.loadEventStart,
            FID: 0, // Will be measured by user interaction
            CLS: 0, // Will be measured by layout shift
          };

          // Send to analytics
          if (enableAnalytics && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: 'Core Web Vitals',
              value: Math.round(metrics.FCP),
              custom_map: {
                metric_1: 'FCP',
                metric_2: 'LCP',
                metric_3: 'FID',
                metric_4: 'CLS'
              }
            });
          }
        }, 0);
      });
    }

  }, [enableAnalytics, enableLazyLoading, enablePreloading]);

  return null; // This component doesn't render anything
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
