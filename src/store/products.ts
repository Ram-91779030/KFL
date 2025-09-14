import { create } from 'zustand';
import { publicApi } from '../api/endpoints';
import type { Category, Product, Banner, ProductFilters, ApiResponse } from '../types';

interface ProductsState {
  categories: Category[];
  products: Product[];
  banners: Banner[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  
  // Actions
  fetchCategories: () => Promise<void>;
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchProduct: (slug: string) => Promise<void>;
  fetchBanners: () => Promise<void>;
  setError: (error: string | null) => void;
  clearCurrentProduct: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  categories: [],
  products: [],
  banners: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await publicApi.getCategories();
      set({ categories, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch categories',
        isLoading: false 
      });
    }
  },

  fetchProducts: async (filters?: ProductFilters) => {
    set({ isLoading: true, error: null });
    try {
      const response: ApiResponse<Product> = await publicApi.getProducts(filters);
      set({ 
        products: response.results,
        pagination: {
          count: response.count,
          next: response.next,
          previous: response.previous,
        },
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch products',
        isLoading: false 
      });
    }
  },

  fetchProduct: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const product = await publicApi.getProduct(slug);
      set({ currentProduct: product, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch product',
        isLoading: false 
      });
    }
  },

  fetchBanners: async () => {
    set({ isLoading: true, error: null });
    try {
      const banners = await publicApi.getBanners();
      set({ banners, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch banners',
        isLoading: false 
      });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearCurrentProduct: () => {
    set({ currentProduct: null });
  },
}));
