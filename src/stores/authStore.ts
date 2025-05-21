import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // In a real app, this would make an API call
        // For demo purposes, we're simulating a successful login
        
        // Mock user data
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'customer',
        };
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        set({
          user: mockUser,
          isAuthenticated: true,
        });
      },
      
      register: async (email, password, name) => {
        // In a real app, this would make an API call
        // For demo purposes, we're simulating a successful registration
        
        // Mock user data
        const mockUser: User = {
          id: '1',
          email,
          name,
          role: 'customer',
        };
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        set({
          user: mockUser,
          isAuthenticated: true,
        });
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);