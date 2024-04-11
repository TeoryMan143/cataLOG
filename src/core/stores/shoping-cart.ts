import { create } from 'zustand';
import { getUserCartItems } from '../lib/db/cart';
import { auth } from '../auth';
import { addCartItem, removeCartItem } from '../lib/cart';

type CartStore = {
  itemIds: string[];
  updateItem: (productId: string, amount: number) => void;
  removeItem: (productId: string) => void;
};

const useCartStore = create<CartStore>(set => ({
  itemIds: [],
  updateItem: async (productId, amount) => {
    const res = await addCartItem({ productId, amount });

    if (!res.success) {
      return;
    }

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

auth().then(({ user }) => {
  if (!user) {
    throw new Error('Must be signed in to access the cart');
  }
  getUserCartItems(user.id).then(items =>
    useCartStore.setState({ itemIds: items ? items.map(i => i.id) : [] }),
  );
});
