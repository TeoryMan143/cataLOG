'use client';

import { REMOTE_IMG_URL, cn } from '@/core/client-utils';
import { getBusinessImage } from '@/core/lib/db/business';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

function BusinessImageLoader({
  businessId,
  tiny = false,
}: {
  businessId: string;
  tiny?: boolean;
}) {
  const {
    data: mainImage,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ['buss-img', businessId],
    queryFn: async () => {
      const image = await getBusinessImage(businessId);

      if (!image) {
        throw new Error('No image found');
      }

      return image;
    },
  });

  return error ? (
    <p className='bg-red-200 text-red-600 mt-1 text-center max-w-80 p-0.5'>
      Hubo un error obteniendo la imagen
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
      className={cn('size-[130px] lg:size-[200px] object-cover rounded-sm', {
        'size-[70px]': tiny,
      })}
      src={REMOTE_IMG_URL + mainImage}
      alt='Portada producto'
      height={tiny ? 70 : 200}
      width={tiny ? 70 : 200}
    />
  );
}
export default BusinessImageLoader;
