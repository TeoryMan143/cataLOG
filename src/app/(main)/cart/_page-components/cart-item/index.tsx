import { getProductImages } from '@/core/lib/db/products';
import { DBCartItem } from '@/core/schemas/cart';
import CartItemClient from './client';
import { toast } from 'sonner';

async function CartItem({ item }: { item: DBCartItem }) {
  const image = item.productId ? await getProductImages(item.productId) : null;

  if (!image) {
    toast.error('Error obteniendo imagen');
    return <p className='text-red-500'>Unexpected error</p>;
  }

  return <CartItemClient item={item} image={image[0].image} />;
}
export default CartItem;
