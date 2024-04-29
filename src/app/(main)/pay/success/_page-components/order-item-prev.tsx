import ProductBusinessLink from '@/components/product-business-link';
import ProductImageLoader from '@/components/product-image-loader';
import { formatToCOP } from '@/core/client-utils';
import { DBCartItem } from '@/core/schemas/cart';
import Link from 'next/link';

type Props = {
  item: DBCartItem & {
    orderId: string;
  };
};

function OrderItemPrev({
  item: { displayName, amount, unit, price, orderId, productId },
}: Props) {
  if (!productId) return 'error';

  return (
    <Link
      className='flex p-3 gap-2 border-gray-600 border-2 rounded-md hover:shadow-md'
      href={`/history#${orderId}`}
    >
      <div>
        <ProductImageLoader productId={productId} />
      </div>
      <div className='flex flex-col gap-2 ml-2'>
        <h2 className='font-bold text-xl truncate'>{displayName}</h2>
        <p>
          {amount + unit} {formatToCOP(price * amount)} COP
        </p>
        <ProductBusinessLink productId={productId} noRedirect />
      </div>
    </Link>
  );
}
export default OrderItemPrev;
