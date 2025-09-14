import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Phone, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface QuickActionsProps {
  cartCount?: number;
  wishlistCount?: number;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}

export function QuickActions({ 
  cartCount = 0, 
  wishlistCount = 0, 
  onCartClick, 
  onWishlistClick,
  onSearchSubmit 
}: QuickActionsProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery.trim());
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl p-6 m-4 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Search Products</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for nuts, dry fruits, snacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
                Search Products
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-white rounded-full shadow-2xl border border-gray-200 p-2 flex items-center space-x-2">
          
          {/* Search */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="rounded-full p-3 hover:bg-gray-100 text-gray-600 hover:text-red-500"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onWishlistClick}
            className="rounded-full p-3 hover:bg-gray-100 text-gray-600 hover:text-red-500 relative"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                {wishlistCount}
              </Badge>
            )}
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onCartClick}
            className="rounded-full p-3 hover:bg-gray-100 text-gray-600 hover:text-red-500 relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                {cartCount}
              </Badge>
            )}
          </Button>

          {/* Call */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('tel:+919876543210')}
            className="rounded-full p-3 hover:bg-gray-100 text-gray-600 hover:text-green-500"
          >
            <Phone className="h-5 w-5" />
          </Button>

          {/* WhatsApp */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://wa.me/919876543210?text=Hi! I need help with KFL products', '_blank')}
            className="rounded-full p-3 hover:bg-gray-100 text-gray-600 hover:text-green-500"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}