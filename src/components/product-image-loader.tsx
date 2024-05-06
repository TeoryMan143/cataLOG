'use client';

import { REMOTE_IMG_URL, cn } from '@/core/client-utils';
import { getProductImages } from '@/core/lib/db/products';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import LoadingSpin from './icons/loading-spin';

function ProductImageLoader({
  productId,
  tiny = false,
}: {
  productId: string;
  tiny?: boolean;
}) {
  const {
    data: mainImage,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ['pro-imgs', productId],
    queryFn: async () => {
      const images = await getProductImages(productId);

      if (!images) {
        throw new Error('No images found');
      }

      return images[0].image;
    },
  });

  return error ? (
    <p className='bg-red-200 text-red-600 mt-1 text-center max-w-80 p-0.5'>
      Hubo un error obteniendo los productos
    </p>
  ) : loading ? (
    <div
      className={cn(
        'flex justify-center items-center size-[130px] lg:size-[200px]',
        {
          'size-[70px]': tiny,
        },
      )}
    >
      <LoadingSpin className='text-4xl' />
    </div>
  ) : (
    <Image
      className={cn('size-[130px] lg:size-[200px] object-cover rounded-sm', {
        'size-[70px] lg:size-[200px]': tiny,
      })}
      src={REMOTE_IMG_URL + mainImage}
      alt='Portada producto'
      height={200}
      width={200}
    />
  );
}
export default ProductImageLoader;
