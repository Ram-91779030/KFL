// Simple API service for our Vercel backend
const API_BASE_URL = window.location.origin;

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

// Simple API calls to our Vercel backend
export const simpleApi = {
  // Health check
  health: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  },

  // Get all products
  getProducts: async (): Promise<{ products: Product[]; total: number; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    return response.json();
  },

  // Get all categories
  getCategories: async (): Promise<{ categories: Category[]; total: number; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    return response.json();
  },

  // Get single product
  getProduct: async (id: number): Promise<{ product: Product; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (categorySlug: string): Promise<{ products: Product[]; category: string; total: number; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/${categorySlug}/products`);
    return response.json();
  },

  // Contact form
  submitContact: async (data: { name: string; email: string; message: string }): Promise<{ message: string; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Newsletter signup
  newsletterSignup: async (email: string): Promise<{ message: string; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },
};

export default simpleApi;
