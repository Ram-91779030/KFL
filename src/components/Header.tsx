import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, Heart, ChevronDown, User, MapPin, Phone, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount?: number;
  isAuthenticated?: boolean;
}

export function Header({ currentPage, onNavigate, cartCount = 0, isAuthenticated = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products', hasDropdown: true },
    { id: 'healthy-living', label: 'Healthy Living' },
    { id: 'farmer-connect', label: 'Farmer Connect' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'media-room', label: 'Media Room' },
    { id: 'distributor', label: 'Become Distributor' },
  ];

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      {/* Clean Top Ribbon */}
      <div className={`bg-red-500 text-white py-2 text-sm transition-all duration-300 ${
        isScrolled ? 'py-1' : 'py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 94906 05930‬</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Free shipping across India • Same day delivery available</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>4.9/5 Rating • 50K+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔥 Flash Sale: 40% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Main Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Clean Logo Section */}
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-3 group"
              >
                {/* KFL Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-black text-xl font-poppins">K</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-black text-xl text-gray-900 font-poppins">KFL</div>
                    <div className="text-xs text-red-500 font-semibold -mt-1 font-inter">KARSHAK FOOD LIFE</div>
                  </div>
                </div>
                
                {/* Simple Separator */}
                <div className="hidden lg:block w-px h-8 bg-gray-300 mx-4"></div>
                
                {/* OG Logo */}
                <div className="hidden lg:flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-gray-900 font-black text-xl font-poppins">OG</span>
                  </div>
                  <div>
                    <div className="font-black text-xl text-gray-900 font-poppins">OG</div>
                    <div className="text-xs text-yellow-600 font-semibold -mt-1 font-inter">ORIGINAL</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Clean Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 font-inter relative group hover:scale-105 ${
                    currentPage === item.id || currentPage === `/${item.id}`
                      ? 'text-red-500 bg-red-50 shadow-md border border-red-100'
                      : 'text-gray-700 hover:text-red-500 hover:bg-red-50 hover:shadow-md hover:border hover:border-red-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-all duration-300 group-hover:rotate-180 group-hover:text-red-500" />
                  )}
                  
                  {/* Enhanced Active indicator */}
                  {(currentPage === item.id || currentPage === `/${item.id}`) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-red-500 rounded-full shadow-sm"></div>
                  )}
                  
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"></div>
                </button>
              ))}
            </nav>

            {/* Tablet Navigation - Show fewer items */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              {navItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-300 font-inter relative group hover:scale-105 ${
                    currentPage === item.id || currentPage === `/${item.id}`
                      ? 'text-red-500 bg-red-50 shadow-md border border-red-100'
                      : 'text-gray-700 hover:text-red-500 hover:bg-red-50 hover:shadow-md hover:border hover:border-red-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-3 w-3 transition-all duration-300 group-hover:rotate-180 group-hover:text-red-500" />
                  )}
                  
                  {/* Enhanced Active indicator */}
                  {(currentPage === item.id || currentPage === `/${item.id}`) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full shadow-sm"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Enhanced Right Side Actions */}
            <div className="flex items-center space-x-2">
              
              {/* Search */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex text-gray-600 hover:text-red-500 hover:bg-red-50 hover:shadow-md rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-100"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex text-gray-600 hover:text-red-500 hover:bg-red-50 hover:shadow-md rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-100"
              >
                <Heart className="h-5 w-5" />
              </Button>

              {/* Cart with enhanced animation */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-gray-600 hover:text-red-500 hover:bg-red-50 hover:shadow-md rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-100"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center p-0 font-poppins font-bold shadow-lg animate-pulse">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* User Profile */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex text-gray-600 hover:text-red-500 hover:bg-red-50 hover:shadow-md rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-100"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Enhanced Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-600 hover:text-red-500 hover:bg-red-50 hover:shadow-md rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 space-y-2 max-h-96 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 text-base font-semibold transition-all duration-300 font-inter rounded-lg hover:scale-105 ${
                    currentPage === item.id || currentPage === `/${item.id}`
                      ? 'text-red-500 bg-red-50 border border-red-100 shadow-sm'
                      : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                  )}
                </button>
              ))}
              
              {/* Mobile Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between px-4">
                  <span className="text-sm font-medium text-gray-600">Quick Actions</span>
                </div>
                <div className="grid grid-cols-2 gap-3 px-4">
                  <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm font-medium">Cart ({cartCount})</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">Wishlist</span>
                  </button>
                </div>
              </div>
              
              {/* Mobile OG Brand */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-black text-sm font-poppins">OG</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900 font-poppins">ORIGINAL</div>
                    <div className="text-xs text-yellow-600 font-inter">Sub-brand of KFL</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}