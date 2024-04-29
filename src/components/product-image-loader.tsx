'use client';

import { REMOTE_IMG_URL } from '@/core/client-utils';
import { getProductImages } from '@/core/lib/db/products';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

function ProductImageLoader({ productId }: { productId: string }) {
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
    <div className='flex justify-center items-center size-[130px] lg:size-[200px]'>
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
  );
}
export default ProductImageLoader;
