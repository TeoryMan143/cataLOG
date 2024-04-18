'use client';

import { useState } from 'react';
import CartAddIcon from './icons/cart-add';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/core/stores/shoping-cart/context';

type Props = {
  productId: string;
  availableUnits: number;
  itemAmount?: number;
};

function CartControl({ productId, availableUnits, itemAmount }: Props) {
  const [amount, setAmount] = useState(itemAmount ?? 0);
  const updateItem = useCartStore(store => store.updateItem);
  const reduceItem = useCartStore(store => store.removeItem);

  const handleAdd = async () => {
    if (amount + 1 > availableUnits) return;
    await updateItem(productId, amount + 1);
    setAmount(amount + 1);
  };

  const handleReduce = async () => {
    await reduceItem(productId);
    setAmount(amount - 1);
  };

  return (
    <div className='flex justify-center items-center gap-5'>
      {amount === 0 ? (
        <Button className='gap-1 text-lg' onClick={handleAdd}>
          <CartAddIcon /> Añadir al carrito
        </Button>
      ) : (
        <>
          <Button size='icon' onClick={handleReduce}>
            <Minus size={20} />
          </Button>
          <span className='text-2xl'>{amount}</span>
          <Button size='icon' onClick={handleAdd}>
            <Plus size={20} />
          </Button>
        </>
      )}
    </div>
  );
}
export default CartControl;
