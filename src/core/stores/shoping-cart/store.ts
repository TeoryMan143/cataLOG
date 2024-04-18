import { createStore } from 'zustand';
import { addCartItem, removeCartItem } from '../../lib/cart';

export type CartStore = {
  itemIds: string[];
  updateItem: (productId: string, amount: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
};

export const createCartStore = (
  initstate: { itemIds: string[] } = { itemIds: [] },
) =>
  createStore<CartStore>(set => ({
    ...initstate,
    updateItem: async (productId, amount) => {
      const res = await addCartItem({ productId, amount });

      if (!res.success) return;

      set(state => {
        if (!state.itemIds.includes(res.result.id)) {
          return { itemIds: [...state.itemIds, res.result.id] };
        }
        return {};
      });
    },
    removeItem: async (productId: string) => {
      const res = await removeCartItem(productId);
      if (res.success) {
        set(state => ({
          itemIds: state.itemIds.filter(id => id !== res.result),
        }));
      }
    },
  }));
