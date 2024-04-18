'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type StoreApi, useStore } from 'zustand';
import { type CartStore, createCartStore } from './store';
import { getUserCartItems } from '@/core/lib/db/cart';

export const CartStoreContext = createContext<StoreApi<CartStore> | null>(null);

export function CartStoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef<StoreApi<CartStore>>();
  const [initData, setInitData] = useState<{ itemIds: string[] }>();

  useEffect(() => {
    const run = async () => {
      const items = await getUserCartItems();
      setInitData({ itemIds: items ? items.map(i => i.id) : [] });
    };

    run();
  }, []);

  storeRef.current = useMemo(() => createCartStore(initData), [initData]);

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
}

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error('useCartStore must be use within CartStoreProvider');
  }

  return useStore(cartStoreContext, selector);
};
