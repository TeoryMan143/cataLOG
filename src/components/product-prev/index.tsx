'use client';

import { REMOTE_IMG_URL, cn, formatToCOP } from '@/core/client-utils';
import { getProductImages } from '@/core/lib/db/products';
import { DBProduct } from '@/core/schemas/product';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import ProductImageLoader from '../product-image-loader';

function ProductPrev({
  product: { id, displayName, price, avialableUnits, businessId },
  admin = false,
}: {
  product: DBProduct;
  admin?: boolean;
}) {
  const avialable = avialableUnits > 0;

  return (
    <div
      className='
        bg-[#F4F1EE] border-2 border-[#C8C1C1] rounded-md transition-colors max-h-72 max-w-52 overflow-hidden h-full flex items-center
        lg:max-h-80 lg:max-w-64
        hover:bg-amber-100
      '
    >
      <Link
        className='inline-block p-4 space-y-2'
        href={admin ? `/business/${businessId}/product/${id}` : `/v?p=${id}`}
      >
        <ProductImageLoader productId={id} />
        <div>
          <p
            className='
            text-black text-center line-clamp-1
            lg:text-xl
          '
          >
            {displayName}
          </p>
          <p
            className='
            text-xs text-center
            lg:text-lg 
          '
          >
            <span>{formatToCOP(price)}</span>{' '}
            <span
              className={cn('text-green-400', {
                'text-red-500': !avialable,
              })}
            >
              {avialable ? 'Disponible' : 'No disponible'}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
export default ProductPrev;
