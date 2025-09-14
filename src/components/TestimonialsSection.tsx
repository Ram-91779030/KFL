import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Award, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "Amazing Quality!",
    text: "The dry fruits from KFL are absolutely fresh and delicious. I've been ordering for 6 months now and the quality is consistently excellent.",
    product: "Premium Almonds",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "Fast Delivery & Great Service",
    text: "Ordered cashews for Diwali celebrations. They arrived the same day, perfectly packed and tasted amazing. My family loved them!",
    product: "Roasted Cashews",
    verified: true
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "Healthy & Delicious",
    text: "As a health conscious person, I'm very particular about quality. KFL's products are 100% natural and incredibly fresh. Highly recommended!",
    product: "Mixed Dry Fruits",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    title: "Perfect for Gifting",
    text: "Bought gift hampers for my clients. The presentation was beautiful and everyone appreciated the premium quality. Will definitely order again!",
    product: "Premium Gift Hamper",
    verified: true
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0">
        <svg className="absolute top-10 right-10 w-40 h-40 text-yellow-100" viewBox="0 0 100 100">
          <circle cx="25" cy="25" r="20" fill="currentColor" opacity="0.6"/>
          <circle cx="75" cy="75" r="15" fill="currentColor" opacity="0.4"/>
          <circle cx="75" cy="25" r="10" fill="currentColor" opacity="0.8"/>
          <circle cx="25" cy="75" r="12" fill="currentColor" opacity="0.5"/>
        </svg>
        
        <svg className="absolute bottom-10 left-10 w-48 h-48 text-red-100" viewBox="0 0 100 100">
          <path d="M10,10 L90,10 L90,90 Z" fill="currentColor" opacity="0.3"/>
          <path d="M20,20 L80,20 L80,80 Z" fill="currentColor" opacity="0.5"/>
        </svg>
        
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-green-100" viewBox="0 0 100 100">
          <path d="M50,10 Q90,50 50,90 Q10,50 50,10" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-poppins">
            What Our <span className="text-red-500">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Customer Image & Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-4">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 shadow-lg"
                  />
                  {currentTestimonial.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                
                <h4 className="font-bold text-xl text-gray-900 font-poppins">{currentTestimonial.name}</h4>
                <p className="text-gray-600 font-inter mb-2">{currentTestimonial.location}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <Award className="w-4 h-4 mr-1" />
                  {currentTestimonial.product}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                  "{currentTestimonial.title}"
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-inter">
                  {currentTestimonial.text}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="rounded-full p-3 border-gray-300 hover:border-red-500 hover:text-red-500"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-red-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="rounded-full p-3 border-gray-300 hover:border-red-500 hover:text-red-500"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-gray-900 font-poppins">4.9/5 Rating</span>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="font-bold text-gray-900 font-poppins">50K+ Happy Customers</span>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-bold text-gray-900 font-poppins">99% Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Curve Divider at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '60px' }}>
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,0 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}