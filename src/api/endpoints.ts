import api, { USE_MOCK_API } from './http';
import { mockApi } from './mockApi';
import type {
  Category,
  Product,
  Banner,
  Cart,
  CartInitResponse,
  ApplyCouponRequest,
  ApplyCouponResponse,
  Address,
  Order,
  CreateOrderRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  ProductFilters,
  ApiResponse,
} from '../types';

// Auth endpoints
export const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    api.post('/auth/login/', data).then(res => res.data),
  
  register: (data: RegisterRequest): Promise<User> =>
    api.post('/auth/register/', data).then(res => res.data),
  
  getProfile: (): Promise<User> =>
    api.get('/auth/profile/').then(res => res.data),
  
  updateProfile: (data: Partial<User>): Promise<User> =>
    api.patch('/auth/profile/', data).then(res => res.data),
};

// Public endpoints
export const publicApi = {
  getCategories: (): Promise<Category[]> => {
    if (USE_MOCK_API) {
      return mockApi.getCategories();
    }
    return api.get('/categories/').then(res => res.data);
  },
  
  getProducts: (filters?: ProductFilters): Promise<ApiResponse<Product>> => {
    if (USE_MOCK_API) {
      return mockApi.getProducts();
    }
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.min_price) params.append('min_price', filters.min_price.toString());
    if (filters?.max_price) params.append('max_price', filters.max_price.toString());
    if (filters?.sort) params.append('sort', filters.sort);
    
    return api.get(`/products/?${params.toString()}`).then(res => res.data);
  },
  
  getProduct: (slug: string): Promise<Product> => {
    if (USE_MOCK_API) {
      return mockApi.getProducts().then(data => 
        data.results.find(p => p.slug === slug) || data.results[0]
      );
    }
    return api.get(`/products/${slug}/`).then(res => res.data);
  },
  
  getBanners: (): Promise<Banner[]> => {
    if (USE_MOCK_API) {
      return mockApi.getBanners();
    }
    return api.get('/banners/active/').then(res => res.data);
  },
};

// Cart endpoints
export const cartApi = {
  init: (): Promise<CartInitResponse> =>
    api.post('/cart/init/').then(res => res.data),
  
  get: (): Promise<Cart> =>
    api.get('/cart/').then(res => res.data),
  
  addItem: (variantId: number, qty: number = 1): Promise<Cart> =>
    api.post('/cart/', { variant_id: variantId, qty }).then(res => res.data),
  
  updateItem: (itemId: number, qty: number): Promise<Cart> =>
    api.patch(`/cart/items/${itemId}/`, { qty }).then(res => res.data),
  
  removeItem: (itemId: number): Promise<Cart> =>
    api.delete(`/cart/items/${itemId}/`).then(res => res.data),
  
  applyCoupon: (data: ApplyCouponRequest): Promise<ApplyCouponResponse> =>
    api.post('/cart/apply-coupon/', data).then(res => res.data),
};

// Address endpoints
export const addressApi = {
  list: (): Promise<Address[]> =>
    api.get('/addresses/').then(res => res.data),
  
  create: (data: Omit<Address, 'id'>): Promise<Address> =>
    api.post('/addresses/', data).then(res => res.data),
  
  update: (id: number, data: Partial<Address>): Promise<Address> =>
    api.patch(`/addresses/${id}/`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/addresses/${id}/`).then(res => res.data),
};

// Order endpoints
export const orderApi = {
  create: (data: CreateOrderRequest): Promise<Order> =>
    api.post('/checkout/create-order/', data).then(res => res.data),
  
  list: (): Promise<Order[]> =>
    api.get('/orders/').then(res => res.data),
  
  get: (id: number): Promise<Order> =>
    api.get(`/orders/${id}/`).then(res => res.data),
};

// Payment endpoints
export const paymentApi = {
  webhook: (provider: string, data: any): Promise<any> =>
    api.post(`/payments/webhook/${provider}/`, data).then(res => res.data),
};
