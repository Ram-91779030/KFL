import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../store/products';
import { useCartStore } from '../store/cart';
import { ProductDetail } from '../components/ProductDetail';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { fetchProduct, currentProduct, isLoading, error } = useProductsStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (slug) {
      fetchProduct(slug);
    }
  }, [slug, fetchProduct]);

  const handleAddToCart = async (variantId: number, qty: number = 1) => {
    try {
      await addToCart(variantId, qty);
      // Show success message or notification
      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleBack = () => {
    // This will be handled by the parent component for navigation
    console.log('Back to products');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <ProductDetail 
      product={currentProduct}
      onAddToCart={handleAddToCart}
      onBack={handleBack}
    />
  );
};
