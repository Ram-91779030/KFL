import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
      size="sm"
    >
      <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}