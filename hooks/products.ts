import { create } from "zustand";

export const useStore = create((set) => ({
  products: [],
  addProduct: (product: any) => {
    set((state: any) => ({ products: [...state.products, product] }));
  },
}));
