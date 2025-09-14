// User types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  addresses?: Address[];
}

export interface Address {
  id: number;
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
}

// Product types
export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  is_active: boolean;
  sort_order: number;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

export interface Variant {
  id: number;
  sku: string;
  title: string;
  mrp: number;
  price: number;
  tax_rate: number;
  weight_grams?: number;
  stock: number;
  is_active: boolean;
  is_in_stock: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: number;
  brand: string;
  nutrition_json: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  variants: Variant[];
  primary_image?: ProductImage;
  min_price: number;
  max_price: number;
}

// Cart types
export interface CartItem {
  id: number;
  variant: Variant;
  variant_id: number;
  qty: number;
  unit_price_snapshot: number;
  total_price: number;
}

export interface Cart {
  id: number;
  user?: number;
  anonymous_token?: string;
  items: CartItem[];
  total_items: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

// Order types
export interface OrderItem {
  id: number;
  variant: number;
  name_snapshot: string;
  qty: number;
  unit_price: number;
  tax_rate: number;
}

export interface Order {
  id: number;
  order_no: string;
  user: number;
  email: string;
  phone: string;
  address_snapshot: Record<string, any>;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  items: OrderItem[];
}

// Banner types
export interface Banner {
  id: number;
  slug: string;
  title: string;
  image: string;
  link_url: string;
  active_from: string;
  active_to: string;
  is_active: boolean;
  is_currently_active: boolean;
}

// Coupon types
export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount_type: 'percent' | 'fixed';
  value: number;
  min_cart: number;
  max_uses?: number;
  uses: number;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  is_valid: boolean;
}

// API Response types
export interface ApiResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface CartInitResponse {
  cart_token?: string;
  cart_id: number;
}

export interface ApplyCouponRequest {
  code: string;
}

export interface ApplyCouponResponse {
  discount: number;
  coupon_code: string;
  message: string;
}

export interface CreateOrderRequest {
  address_id: number;
}

// Filter types
export interface ProductFilters {
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  sort?: 'price' | '-price' | 'new' | 'popular';
}
