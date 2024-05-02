import ProductImageLoader from '@/components/product-image-loader';
import { formatToCOP } from '@/core/client-utils';
import { OrderData } from '@/core/lib/db/orders';
import OrderStatus from './order-status';

function Order({
  orderData: {
    displayName,
    productId,
    amount,
    unit,
    price,
    delivery,
    status,
    sentAt,
    orderId,
    address,
  },
}: {
  orderData: OrderData;
}) {
  if (!productId) return 'error';

  return (
    <div
      className='flex gap-2 bg-[#F4F1EE] border-2 border-[#C8C1C1] rounded-md p-3'
      id={orderId}
    >
      <ProductImageLoader productId={productId} />
      <div className='flex flex-col items-center w-full'>
        <h2 className='truncate font-bold text-xl'>{displayName}</h2>
        <div className='flex flex-col justify-center grow'>
          <p>
            {amount + unit} {formatToCOP(price * amount)} COP
          </p>
          <p>
            <span className='font-semibold'>Fecha: </span>
            {sentAt.toLocaleDateString()}
          </p>
          <p>
            <span className='font-semibold'>Dirección de envio: </span>
            {address}
          </p>
          <p className='font-semibold'>Estado:</p>
          <OrderStatus orderId={orderId} status={status} />
        </div>
      </div>
    </div>
  );
}
export default Order;
