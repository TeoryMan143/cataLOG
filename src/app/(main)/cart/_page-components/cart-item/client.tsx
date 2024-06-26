'use client';

import { REMOTE_IMG_URL, formatToCOP } from '@/core/client-utils';
import { DBCartItem } from '@/core/schemas/cart';
import Image from 'next/image';
import DeleteButton from '../delete-button';
import { useRouter } from 'next/navigation';

function CartItemClient({ item, image }: { item: DBCartItem; image: string }) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (item.productId) {
          router.push(`/v?p=${item.productId}`);
        }
      }}
      className='
        flex rounded-md overflow-hidden bg-white cursor-pointer 
        hover:shadow-md
      '
    >
      <div className='bg-[#F4F1EE] grid place-content-center p-1'>
        <Image
          className='
            size-24 object-cover rounded-sm
            lg:size-56
          '
          src={image ? REMOTE_IMG_URL + image : '/product-default.png'}
          alt={item.displayName}
          height={224}
          width={224}
        />
      </div>
      <div
        className='
          space-y-2 p-3 flex-1 text-xs 
          lg:text-lg
        '
      >
        <h3
          className='
            font-bold text-lg truncate
            lg:text-3xl
          '
        >
          {item.displayName}
        </h3>
        <p>
          Cantidad: {item.amount} {item.unit}
        </p>
        <p>Precio total: {formatToCOP(item.price * item.amount)}</p>
      </div>
      <div className='grid place-content-center'>
        {item.productId && <DeleteButton productId={item.productId} />}
      </div>
    </div>
  );
}
export default CartItemClient;
