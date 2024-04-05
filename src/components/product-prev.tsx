'use client';

import { REMOTE_IMG_URL, cn, formatToCOP } from '@/core/client-utils';
import { getProductImages } from '@/core/lib/db/porducts';
import { DBProduct } from '@/core/schemas/product';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

function ProductPrev({
  product: { id, displayName, price, avialableUnits, businessId },
  admin = false,
}: {
  product: DBProduct;
  admin?: boolean;
}) {
  const {
    data: mainImage,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ['pro-imgs', id],
    queryFn: async () => {
      const images = await getProductImages(id);

      if (!images) {
        throw new Error('No images found');
      }

      return images[0].image;
    },
  });

  const avialable = avialableUnits > 0;

  return (
    <div
      className='
        bg-[#F4F1EE] border-2 border-[#C8C1C1] rounded-md transition-colors max-h-72 max-w-52 overflow-hidden h-full flex items-center
        lg:max-h-80 lg:max-w-72
        hover:bg-amber-100
      '
    >
      <Link
        className='inline-block p-4 space-y-2'
        href={admin ? `/business/${businessId}/product/${id}` : `v/p=${id}`}
      >
        {error ? (
          <p className='bg-red-200 text-red-600 mt-1 text-center max-w-80 p-0.5'>
            Hubo un error obteniendo los productos
          </p>
        ) : loading ? (
          <div className='flex justify-center items-center size-[130px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='animate-spin-clockwise text-4xl'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 3a9 9 0 1 0 9 9'
              />
            </svg>
          </div>
        ) : (
          <Image
            className='size-[130px] lg:size-[200px] object-cover rounded-sm'
            src={REMOTE_IMG_URL + mainImage}
            alt='Portada producto'
            height={130}
            width={130}
          />
        )}
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
