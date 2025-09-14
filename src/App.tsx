import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { AboutUs } from './components/AboutUs';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NewsletterPopup } from './components/NewsletterPopup';
import { PageTransition } from './components/PageTransition';
import { Breadcrumb } from './components/Breadcrumb';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { EnhancedScrollProgressBar } from './components/EnhancedScrollProgressBar';
import { MobileScrollProgressBar } from './components/MobileScrollProgressBar';
import { SEOHead } from './components/SEOHead';
import { PerformanceOptimizer } from './components/PerformanceOptimizer';
import { QuickActions } from './components/QuickActions';
import { NotificationToast, useToast } from './components/NotificationToast';
import { useCartStore } from './store/cart';
import { useAuthStore } from './store/auth';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ShoppingBag, Heart, Users, Phone, BookOpen, Leaf, Camera, Handshake } from 'lucide-react';

export default function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { notifications, toast, removeToast } = useToast();
  const { cart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Show newsletter popup after 5 seconds (increased for better UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Page navigation with loading state
  const handleNavigation = (page: string) => {
    setPageLoading(true);
    setTimeout(() => {
      navigate(`/${page}`);
      setPageLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  // Get breadcrumb items based on current page
  const getBreadcrumbItems = () => {
    const items = [];
    const path = location.pathname;
    
    if (path === '/products') {
      items.push({ label: 'Products', page: 'products', icon: ShoppingBag });
    } else if (path.startsWith('/products/')) {
      items.push(
        { label: 'Products', page: 'products', icon: ShoppingBag },
        { label: 'Product Details', page: 'product-detail' }
      );
    } else if (path === '/about') {
      items.push({ label: 'About Us', page: 'about', icon: Users });
    } else if (path === '/blog') {
      items.push({ label: 'Blog', page: 'blog', icon: BookOpen });
    } else if (path === '/contact') {
      items.push({ label: 'Contact', page: 'contact', icon: Phone });
    } else if (path === '/healthy-living') {
      items.push({ label: 'Healthy Living', page: 'healthy-living', icon: Heart });
    } else if (path === '/farmer-connect') {
      items.push({ label: 'Farmer Connect', page: 'farmer-connect', icon: Leaf });
    } else if (path === '/media-room') {
      items.push({ label: 'Media Room', page: 'media-room', icon: Camera });
    } else if (path === '/distributor') {
      items.push({ label: 'Become a Distributor', page: 'distributor', icon: Handshake });
    } else if (path === '/cart') {
      items.push({ label: 'Shopping Cart', page: 'cart', icon: ShoppingBag });
    }
    
    return items;
  };

  // Handle search
  const handleSearch = (query: string) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    toast.info('Search Results', `Showing results for "${query}"`);
  };

  // Handle cart actions
  const handleCartClick = () => {
    navigate('/cart');
  };

  // Handle wishlist actions
  const handleWishlistClick = () => {
    toast.info('Wishlist', 'Wishlist functionality coming soon!');
  };

  // Get cart count for header
  const cartCount = cart?.total_items || 0;

  // Determine domain based on current URL or environment
  const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('ogbar.in')) return 'ogbar';
      if (hostname.includes('karshakfoodlife.com')) return 'karshakfoodlife';
    }
    return 'karshakfoodlife'; // default
  };

  // Get page-specific title
  const getPageTitle = (pathname: string) => {
    const domain = getCurrentDomain();
    const baseTitle = domain === 'ogbar' ? 'OG Bar - ORIGINAL' : 'KFL - Karshak Food Life';
    
    switch (pathname) {
      case '/':
      case '/home':
        return `${baseTitle} | Premium Natural Foods & Healthy Living`;
      case '/products':
        return `Products | ${baseTitle} - Premium Natural Foods`;
      case '/about':
        return `About Us | ${baseTitle} - Our Story & Mission`;
      case '/blog':
        return `Health Blog | ${baseTitle} - Nutrition Tips & Recipes`;
      case '/contact':
        return `Contact Us | ${baseTitle} - Get in Touch`;
      case '/healthy-living':
        return `Healthy Living | ${baseTitle} - Wellness & Nutrition Guide`;
      case '/farmer-connect':
        return `Farmer Connect | ${baseTitle} - Direct from Farm`;
      case '/media-room':
        return `Media Room | ${baseTitle} - Press & News`;
      case '/distributor':
        return `Become a Distributor | ${baseTitle} - Partnership Opportunities`;
      case '/cart':
        return `Shopping Cart | ${baseTitle} - Your Healthy Choices`;
      default:
        return `${baseTitle} | Premium Natural Foods & Healthy Living`;
    }
  };

  // Get page-specific description
  const getPageDescription = (pathname: string) => {
    const domain = getCurrentDomain();
    const baseDesc = domain === 'ogbar' 
      ? 'Premium natural protein bars from OG (ORIGINAL). Healthy, nutritious, and delicious protein bars made with natural ingredients.'
      : 'Discover premium natural foods from KFL (Karshak Food Life) and OG (ORIGINAL). Premium dry fruits, protein bars, healthy snacks, and organic spices.';
    
    switch (pathname) {
      case '/':
      case '/home':
        return `${baseDesc} Farm-fresh quality delivered to your doorstep across India.`;
      case '/products':
        return `Browse our extensive collection of premium natural foods including dry fruits, protein bars, healthy snacks, and organic spices. Quality guaranteed.`;
      case '/about':
        return `Learn about KFL's mission to bring you the finest natural foods. Our story, values, and commitment to healthy living and sustainable farming.`;
      case '/blog':
        return `Discover health tips, nutrition guides, and delicious recipes using our premium natural foods. Expert advice for a healthier lifestyle.`;
      case '/contact':
        return `Get in touch with KFL for customer support, wholesale inquiries, or partnership opportunities. We're here to help with your healthy food needs.`;
      case '/healthy-living':
        return `Explore our comprehensive guide to healthy living with natural foods. Nutrition tips, wellness advice, and lifestyle recommendations.`;
      case '/farmer-connect':
        return `Connect directly with farmers through KFL. Learn about our sustainable farming partnerships and farm-to-table approach.`;
      case '/media-room':
        return `Latest news, press releases, and media coverage about KFL and our commitment to natural, healthy foods.`;
      case '/distributor':
        return `Join KFL as a distributor and help us spread healthy living across India. Partnership opportunities and business benefits.`;
      case '/cart':
        return `Review your selected premium natural foods. Secure checkout and fast delivery across India.`;
      default:
        return baseDesc;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PerformanceOptimizer 
        enableAnalytics={true}
        enableLazyLoading={true}
        enablePreloading={true}
      />
      <SEOHead 
        domain={getCurrentDomain()}
        title={getPageTitle(location.pathname)}
        description={getPageDescription(location.pathname)}
        url={`https://${getCurrentDomain() === 'ogbar' ? 'ogbar.in' : 'karshakfoodlife.in'}${location.pathname}`}
      />
      <MobileScrollProgressBar 
        height={4} 
        showPercentage={true}
        showOnMobile={true}
        showOnDesktop={true}
      />
      <Header 
        currentPage={location.pathname}
        onNavigate={handleNavigation}
        cartCount={cartCount}
        isAuthenticated={isAuthenticated}
      />
      
      <Breadcrumb 
        items={getBreadcrumbItems()}
        onNavigate={handleNavigation}
      />
      
      <main>
        <PageTransition isLoading={pageLoading}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/healthy-living" element={<AboutUs />} />
            <Route path="/farmer-connect" element={<AboutUs />} />
            <Route path="/media-room" element={<AboutUs />} />
            <Route path="/distributor" element={<AboutUs />} />
            {/* Add more routes as needed */}
          </Routes>
        </PageTransition>
      </main>
      
      <Footer onNavigate={handleNavigation} />
      
      {/* Enhanced UI Components */}
      <ScrollToTop />
      <QuickActions 
        cartCount={cartCount}
        wishlistCount={1}
        onCartClick={handleCartClick}
        onWishlistClick={handleWishlistClick}
        onSearchSubmit={handleSearch}
      />
      <NotificationToast 
        notifications={notifications}
        onRemove={removeToast}
      />
      
      {showNewsletter && (
        <NewsletterPopup 
          onClose={() => {
            setShowNewsletter(false);
            toast.success('Welcome!', 'Thanks for visiting KFL. Enjoy exploring our healthy products!');
          }} 
        />
      )}
    </div>
  );
}