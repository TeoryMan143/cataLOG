import ProductBusinessLink from '@/components/product-business-link';
import ProductImageLoader from '@/components/product-image-loader';
import { cn, formatToCOP, getStatus } from '@/core/client-utils';
import { OrderData } from '@/core/lib/db/orders';
import Link from 'next/link';

function OrderInfo({
  orderData: {
    displayName,
    productId,
    businessId,
    amount,
    unit,
    sentAt,
    status,
    price,
    delivery,
  },
}: {
  orderData: OrderData;
}) {
  if (!productId || !businessId) return 'error';

  return (
    <div
      className={cn(
        `
          p-3 flex gap-2 border-2 rounded-sm
          lg:max-w-[450px]
        `,
        {
          'border-amber-600': status === 'pending',
          'border-cyan-500': status === 'sent',
          'border-green-500': status === 'arrived',
        },
      )}
    >
      <div className='min-w-28'>
        <ProductImageLoader productId={productId} />
      </div>
      <div className='flex flex-col'>
        <Link
          className='font-bold truncate hover:underline'
          href={`/v?p=${productId}`}
        >
          {displayName}
        </Link>
        <div className='flex flex-col justify-center grow'>
          <ProductBusinessLink productId={productId} />
          <p>
            {amount + unit} {formatToCOP(price * amount)} COP
          </p>
          <p>
            <span className='font-semibold'>Fecha del pedido:</span>{' '}
            {sentAt.toLocaleDateString()}
          </p>
          <p>
            <span className='font-semibold'>Estado: </span>
            <span
              className={cn({
                'text-amber-600': status === 'pending',
                'text-cyan-500': status === 'sent',
                'text-green-500': status === 'arrived',
              })}
            >
              {getStatus(status)}
            </span>
          </p>
          <p>{delivery ? 'Domicilio' : 'Recoger'}</p>
        </div>
      </div>
    </div>
  );
}
export default OrderInfo;
