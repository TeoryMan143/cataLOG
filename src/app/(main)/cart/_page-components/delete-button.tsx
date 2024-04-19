'use client';

import { DeleteIcon } from '@/components/icons/delete';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/core/stores/shoping-cart/context';

function DeleteButton({ productId }: { productId: string }) {
  const reduceItem = useCartStore(store => store.removeItem);

  return (
    <Button
      onClick={async e => {
        e.stopPropagation();
        await reduceItem(productId);
      }}
      className='text-xl hover:text-red-600 lg:text-4xl'
      variant='ghost'
    >
      <DeleteIcon />
    </Button>
  );
}
export default DeleteButton;
