import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (product) => {
        const { items } = get();
        // Check if the product is already in the wishlist
        const exists = items.some((item) => item.id === product.id);
        
        if (!exists) {
          set({ items: [...items, product] });
        }
      },
      
      removeFromWishlist: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },
      
      isInWishlist: (id) => {
        const { items } = get();
        return items.some((item) => item.id === id);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);