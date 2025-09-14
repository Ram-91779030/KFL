import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../store/products';
import { useCartStore } from '../store/cart';
import { Hero } from '../components/Hero';
import { CategoryHighlights } from '../components/CategoryHighlights';
import { Statistics } from '../components/Statistics';
import { PromoBanner } from '../components/PromoBanner';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { AboutUs } from '../components/AboutUs';
import { Blog } from '../components/Blog';
import { NewsletterSection } from '../components/NewsletterSection';
import { CountdownBanner } from '../components/CountdownBanner';
import { FeaturesSection } from '../components/FeaturesSection';

export const HomePage: React.FC = () => {
  const { fetchBanners, fetchCategories, banners, categories, isLoading } = useProductsStore();
  const { initCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize cart and fetch data
    initCart();
    fetchBanners();
    fetchCategories();
  }, [initCart, fetchBanners, fetchCategories]);

  const handleCategoryClick = (category: any) => {
    if (category && category.slug) {
      navigate(`/products?category=${category.slug}`);
    } else {
      navigate('/products');
    }
  };

  const handleHeroAction = (action: string) => {
    switch (action) {
      case 'shop':
        navigate('/products');
        break;
      case 'explore':
        navigate('/products');
        break;
      case 'learn':
        navigate('/about');
        break;
      default:
        navigate('/products');
    }
  };

  return (
    <>
      <CountdownBanner />
      <Hero onAction={handleHeroAction} banners={banners} />
      <FeaturesSection />
      <CategoryHighlights 
        categories={categories}
        isLoading={isLoading}
        onCategoryClick={handleCategoryClick}
      />
      <Statistics />
      <PromoBanner />
      <TestimonialsSection />
      <AboutUs />
      <Blog />
      <NewsletterSection />
    </>
  );
};
