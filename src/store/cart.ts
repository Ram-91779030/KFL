import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartApi } from '../api/endpoints';
import type { Cart, CartItem, ApplyCouponResponse } from '../types';

interface CartState {
  cart: Cart | null;
  cartToken: string | null;
  isLoading: boolean;
  error: string | null;
  appliedCoupon: ApplyCouponResponse | null;
  
  // Actions
  initCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  addToCart: (variantId: number, qty?: number) => Promise<void>;
  updateCartItem: (itemId: number, qty: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  clearCart: () => void;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cartToken: null,
      isLoading: false,
      error: null,
      appliedCoupon: null,

      initCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.init();
          set({ 
            cartToken: response.cart_token,
            isLoading: false 
          });
          
          // Store cart token in localStorage for API calls
          if (response.cart_token) {
            localStorage.setItem('cart_token', response.cart_token);
          }
          
          // Fetch cart data
          await get().fetchCart();
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to initialize cart',
            isLoading: false 
          });
        }
      },

      fetchCart: async () => {
        const { cartToken } = get();
        if (!cartToken) {
          await get().initCart();
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.get();
          set({ cart, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to fetch cart',
            isLoading: false 
          });
        }
      },

      addToCart: async (variantId: number, qty: number = 1) => {
        const { cartToken } = get();
        if (!cartToken) {
          await get().initCart();
        }

        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.addItem(variantId, qty);
          set({ cart, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to add item to cart',
            isLoading: false 
          });
        }
      },

      updateCartItem: async (itemId: number, qty: number) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.updateItem(itemId, qty);
          set({ cart, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to update cart item',
            isLoading: false 
          });
        }
      },

      removeFromCart: async (itemId: number) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.removeItem(itemId);
          set({ cart, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to remove item from cart',
            isLoading: false 
          });
        }
      },

      applyCoupon: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.applyCoupon({ code });
          set({ 
            appliedCoupon: response,
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to apply coupon',
            isLoading: false 
          });
        }
      },

      clearCart: () => {
        set({ 
          cart: null,
          appliedCoupon: null,
          error: null 
        });
        localStorage.removeItem('cart_token');
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        cartToken: state.cartToken 
      }),
    }
  )
);
