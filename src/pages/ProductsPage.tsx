import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductsStore } from '../store/products';
import { ProductGrid } from '../components/ProductGrid';
import type { ProductFilters } from '../types';

export const ProductsPage: React.FC = () => {
  const { fetchProducts, products, isLoading, error } = useProductsStore();
  const [searchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  
  const [filters, setFilters] = useState<ProductFilters>({
    search: searchQuery,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  useEffect(() => {
    // Update filters when URL params change
    setFilters({
      search: searchQuery,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  const handleProductClick = (product: any) => {
    // This will be handled by the parent component for navigation
    console.log('Product clicked:', product);
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category,
    }));
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({
      ...prev,
      search: query,
    }));
  };

  const handleSort = (sort: string) => {
    setFilters(prev => ({
      ...prev,
      sort: sort as any,
    }));
  };

  const handlePriceFilter = (minPrice?: number, maxPrice?: number) => {
    setFilters(prev => ({
      ...prev,
      min_price: minPrice,
      max_price: maxPrice,
    }));
  };

  return (
    <ProductGrid 
      products={products}
      selectedCategory={selectedCategory}
      isLoading={isLoading}
      error={error}
      onProductClick={handleProductClick}
      onCategoryChange={handleCategoryChange}
      onSearch={handleSearch}
      onSort={handleSort}
      onPriceFilter={handlePriceFilter}
    />
  );
};
