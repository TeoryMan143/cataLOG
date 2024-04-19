'use client';

import { DeleteIcon } from '@/components/icons/delete';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/core/stores/shoping-cart/context';

function DeleteButton({ productId }: { productId: string }) {
  const reduceItem = useCartStore(store => store.removeItem);

  return (
    <Button
      onClick={async () => {
        await reduceItem(productId);
      }}
      className='text-xl hover:text-red-600'
      variant='ghost'
    >
      <DeleteIcon />
    </Button>
  );
}
export default DeleteButton;
