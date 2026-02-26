import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartAddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string; // yacht code
  name: string;
  price: number; // base price per hour
  duration: number; // hours
  date: string;
  time: string;
  guestCount: number;
  addOns: CartAddOn[];
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  addAddOn: (itemId: string, addOn: CartAddOn) => void;
  removeAddOn: (itemId: string, addOnId: string) => void;
  updateAddOnQuantity: (itemId: string, addOnId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getItemTotal: (item: CartItem) => number;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => set((state) => {
        // Check if yacht already in cart
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          // Update existing item
          return {
            items: state.items.map(i => 
              i.id === item.id ? { ...i, ...item } : i
            ),
            isOpen: true
          };
        }
        // Add new item
        return {
          items: [...state.items, item],
          isOpen: true
        };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),

      updateItem: (id, updates) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
      })),

      addAddOn: (itemId, addOn) => set((state) => ({
        items: state.items.map(item => {
          if (item.id !== itemId) return item;
          
          const existingAddOn = item.addOns.find(a => a.id === addOn.id);
          if (existingAddOn) {
            // Increase quantity
            return {
              ...item,
              addOns: item.addOns.map(a =>
                a.id === addOn.id ? { ...a, quantity: a.quantity + 1 } : a
              )
            };
          }
          // Add new add-on
          return {
            ...item,
            addOns: [...item.addOns, addOn]
          };
        })
      })),

      removeAddOn: (itemId, addOnId) => set((state) => ({
        items: state.items.map(item =>
          item.id === itemId
            ? { ...item, addOns: item.addOns.filter(a => a.id !== addOnId) }
            : item
        )
      })),

      updateAddOnQuantity: (itemId, addOnId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === itemId
            ? {
                ...item,
                addOns: item.addOns.map(a =>
                  a.id === addOnId ? { ...a, quantity } : a
                )
              }
            : item
        )
      })),

      clearCart: () => set({ items: [], isOpen: false }),

      openCart: () => set({ isOpen: true }),
      
      closeCart: () => set({ isOpen: false }),

      // Calculate item total (yacht base + add-ons)
      getItemTotal: (item) => {
        const yachtTotal = item.price * item.duration;
        const addOnsTotal = item.addOns.reduce(
          (sum, addOn) => sum + (addOn.price * addOn.quantity),
          0
        );
        return yachtTotal + addOnsTotal;
      },

      // Get cart subtotal
      getCartSubtotal: () => {
        const { items, getItemTotal } = get();
        return items.reduce((sum, item) => sum + getItemTotal(item), 0);
      },

      // Get cart total (same as subtotal for now, can add tax later)
      getCartTotal: () => {
        return get().getCartSubtotal();
      },

      // Get total number of items (yachts, not add-ons)
      getItemCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'yacht-cart-storage', // localStorage key
    }
  )
);
