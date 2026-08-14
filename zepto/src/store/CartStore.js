import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        const { cart } = get();
        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'zepto-cart',
    }
  )
);