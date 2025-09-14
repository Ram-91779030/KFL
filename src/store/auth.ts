import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/endpoints';
import type { User, LoginRequest, RegisterRequest } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          
          // Store tokens
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          
          // Fetch user profile
          await get().fetchProfile();
          
          set({ 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.detail || 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.register(userData);
          
          // Auto-login after registration
          await get().login({
            username: userData.username,
            password: userData.password,
          });
          
          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('cart_token');
        
        set({ 
          user: null,
          isAuthenticated: false,
          error: null 
        });
      },

      fetchProfile: async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const user = await authApi.getProfile();
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error: any) {
          // Token might be expired
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authApi.updateProfile(data);
          set({ 
            user,
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Failed to update profile',
            isLoading: false 
          });
          throw error;
        }
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
