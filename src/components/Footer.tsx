import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'About Us', page: 'about' },
    { label: 'Health Tips', page: 'blog' },
    { label: 'Contact', page: 'contact' }
  ];

  const productCategories = [
    'Dry Fruits',
    'Protein Bars',
    'Healthy Chips'
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      
      {/* Yellow Torn Paper Overlay at Top */}
      <div className="absolute top-0 left-0 right-0 h-20">
        <svg 
          className="w-full h-20" 
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M0,60 C150,45 300,75 450,55 C600,65 750,45 900,65 C1050,55 1150,75 1200,60 L1200,0 L0,0 Z" 
            fill="#FFAF3A"
          />
          <path 
            d="M0,40 C150,25 300,55 450,35 C600,45 750,25 900,45 C1050,35 1150,55 1200,40 L1200,0 L0,0 Z" 
            fill="#FEF3C7"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2 space-y-6">
              {/* Dual Brand Logos */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-poppins">K</span>
                  </div>
                  <div>
                    <div className="font-bold text-xl text-white font-poppins">KFL</div>
                    <div className="text-sm text-green-400 font-inter">Karshak Food Life</div>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg font-poppins">OG</span>
                  </div>
                  <div>
                    <div className="font-bold text-xl text-white font-poppins">OG</div>
                    <div className="text-sm text-yellow-400 font-inter">ORIGINAL</div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed max-w-md font-inter text-sm sm:text-base">
                Premium natural foods sourced directly from trusted farmers. 
                Bringing you the finest dry fruits, protein bars, and healthy chips 
                for a healthier lifestyle.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-inter">+91 94906 05930‬</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-inter">info@karshakfoodlife.com</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mt-1">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-inter">
                    Hyderabad<br />
                    India
                  </span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-4 font-poppins">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className={`p-3 text-gray-400 ${social.color} bg-gray-800 hover:bg-gray-700 rounded-lg transition-all hover:scale-110`}
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 font-poppins">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-gray-300 hover:text-green-400 transition-colors flex items-center group font-inter"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-inter">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-inter">
                    Terms & Conditions
                  </a>
                </li>
              </ul>

              {/* Product Categories */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4 font-poppins">Categories</h4>
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => onNavigate('products')}
                      className="block text-sm text-gray-300 hover:text-yellow-400 transition-colors font-inter"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="font-bold text-lg mb-6 font-poppins">Stay Connected</h3>
              <p className="text-gray-300 mb-6 font-inter">
                Get health tips, recipes, and exclusive offers delivered to your inbox.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 flex-1 focus:border-green-400 rounded-lg font-inter"
                  />
                  <Button className="bg-green-600 hover:bg-green-700 px-4 rounded-lg">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-xs text-gray-400 font-inter">
                  Join 5,000+ health enthusiasts. Unsubscribe anytime.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="font-inter">100% Natural Products</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="font-inter">Direct from Farms</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="font-inter">Free Shipping ₹999+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm font-inter">
              © {currentYear} Karshak Food Life & OG. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors font-inter">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors font-inter">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors font-inter">Return Policy</a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500 font-inter">
              Committed to your health and supporting sustainable farming practices across India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}