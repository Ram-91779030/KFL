import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Leaf, Shield, Truck, ArrowRight, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Banner } from '../types';

const heroSlides = [
  {
    id: 1,
    title: "Premium Dry Fruits & Nuts",
    subtitle: "Fresh • Natural • Healthy",
    description: "Discover our handpicked collection of premium dry fruits and nuts, sourced directly from trusted farmers.",
    image: "https://images.unsplash.com/photo-1663652851591-e3d9bfb6d8c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYWxtb25kcyUyMG51dHMlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NTc4MjMxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "Shop Now",
    offer: "25% OFF",
    badge: "New Collection",
    bgColor: "from-red-500 to-red-600"
  },
  {
    id: 2,
    title: "Healthy Snacking Made Easy",
    subtitle: "Nutritious • Delicious • Convenient",
    description: "Transform your snacking habits with our carefully curated selection of healthy, natural alternatives.",
    image: "https://images.unsplash.com/photo-1737099950723-45672db31753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZydWl0cyUyMGRhdGVzJTIwZmlncyUyMGhlYWx0aHklMjBzbmFja3N8ZW58MXx8fHwxNzU3ODIzMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "Explore",
    offer: "Free Shipping",
    badge: "Best Seller",
    bgColor: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Farm Fresh Guarantee",
    subtitle: "Direct • Fresh • Quality",
    description: "We work directly with farmers to bring you the freshest, highest quality products nature has to offer.",
    image: "https://images.unsplash.com/photo-1741112480266-62def497fa27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwb3JnYW5pYyUyMG5hdHVyYWwlMjBwcm9kdWNlfGVufDF8fHx8MTc1NzgyMzE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cta: "Learn More",
    offer: "Quality Promise",
    badge: "Farm Direct",
    bgColor: "from-yellow-500 to-yellow-600"
  }
];

const features = [
  { icon: Leaf, text: "100% Natural", color: "text-green-600" },
  { icon: Shield, text: "Quality Assured", color: "text-blue-600" },
  { icon: Truck, text: "Fast Delivery", color: "text-red-600" },
  { icon: Star, text: "Top Rated", color: "text-yellow-600" }
];

interface HeroProps {
  onAction?: (action: string) => void;
  banners?: Banner[];
}

export function Hero({ onAction, banners }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use dynamic slides from banners or fallback to static slides
  const slides = banners && banners.length > 0 
    ? banners.map((banner, index) => ({
        id: banner.id,
        title: banner.title,
        subtitle: "Fresh • Natural • Healthy",
        description: "Discover our handpicked collection of premium products, sourced directly from trusted farmers.",
        image: banner.image,
        cta: "Shop Now",
        offer: "25% OFF",
        badge: "Featured",
        bgColor: index === 0 ? "from-red-500 to-red-600" : 
                 index === 1 ? "from-green-500 to-green-600" : "from-yellow-500 to-yellow-600"
      }))
    : heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-r from-gray-50 to-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-10`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <Badge className="bg-red-500 text-white px-4 py-2 text-sm font-semibold">
              {slide.badge}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight font-poppins">
              {slide.title}
            </h1>
            
            <p className="text-lg text-red-600 font-semibold font-inter">
              {slide.subtitle}
            </p>
            
            <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0 font-inter">
              {slide.description}
            </p>

            {/* Offer */}
            <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg">
              <Gift className="h-5 w-5 mr-2" />
              {slide.offer}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-bold rounded-lg"
                onClick={() => onAction?.('shop')}
              >
                {slide.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-bold rounded-lg"
                onClick={() => onAction?.('explore')}
              >
                View Products
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 justify-center lg:justify-start">
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  <span className="text-sm font-semibold text-gray-700 font-inter">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              
              {/* Floating Stats */}
              <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-black text-red-500 font-poppins">4.9★</div>
                <div className="text-sm text-gray-600 font-inter">Rating</div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-black text-green-600 font-poppins">50K+</div>
                <div className="text-sm text-gray-600 font-inter">Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-red-500 w-8' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}