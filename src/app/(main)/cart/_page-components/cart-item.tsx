import { getProductImages } from '@/core/lib/db/products';
import { DBCartItem } from '@/core/schemas/cart';
import Image from 'next/image';

async function CartItem({ item }: { item: DBCartItem }) {
  const image = item.productId ? await getProductImages(item.productId) : null;

  return (
    <div>
      <Image src='/product-default.png' alt={item.displayName} />
    </div>
  );
}
export default CartItem;
