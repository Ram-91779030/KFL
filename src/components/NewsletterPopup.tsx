import React, { useState } from 'react';
import { X, Mail, Gift, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface NewsletterPopupProps {
  onClose: () => void;
}

export function NewsletterPopup({ onClose }: NewsletterPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>

        {!isSubmitted ? (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get 15% Off Your First Order!
              </h2>
              <p className="text-gray-600">
                Join our community of health-conscious food lovers and get exclusive offers, 
                recipes, and wellness tips.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-gray-700">Exclusive discounts on premium products</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm text-gray-700">Healthy recipes and nutrition tips</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-gray-700">Early access to new arrivals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm text-gray-700">Farmer stories and sustainability updates</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
              >
                Get My 15% Discount
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-1">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span className="text-xs text-gray-600">100% Natural</span>
                </div>
                <div className="text-xs text-gray-400">•</div>
                <div className="text-xs text-gray-600">500+ Happy Customers</div>
                <div className="text-xs text-gray-400">•</div>
                <div className="text-xs text-gray-600">No Spam</div>
              </div>
            </div>

            {/* Fine Print */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to KFL Family!
            </h2>
            <p className="text-gray-600 mb-4">
              Check your email for your exclusive 15% discount code.
            </p>
            <p className="text-sm text-gray-500">
              We're excited to have you on this healthy journey!
            </p>
          </div>
        )}

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full transform translate-x-16 -translate-y-16" />
        </div>
      </Card>
    </div>
  );
}