import { REMOTE_IMG_URL } from '@/core/client-utils';
import { getBusinessByProduct } from '@/core/lib/db/business';
import Image from 'next/image';
import Link from 'next/link';

async function ProductBusinessLink({
  productId,
  noRedirect = false,
}: {
  productId: string;
  noRedirect?: boolean;
}) {
  const business = await getBusinessByProduct(productId);

  if (!business) {
    return 'error';
  }

  return noRedirect ? (
    <div className='text-slate-800 hover:text-black'>
      <div className='flex gap-2 my-2 items-center'>
        <p className='text-sm lg:text-base'>Producto de: {business.name}</p>
        <Image
          src={REMOTE_IMG_URL + business.image}
          alt='Business'
          height={40}
          width={40}
        />
      </div>
    </div>
  ) : (
    <Link
      className='text-slate-800 hover:text-black hover:underline'
      href={`/b/${business.id}`}
    >
      <div className='flex gap-2 my-2 items-center'>
        <p className='text-sm lg:text-base'>Producto de: {business.name}</p>
        <Image
          src={REMOTE_IMG_URL + business.image}
          alt='Business'
          height={40}
          width={40}
        />
      </div>
    </Link>
  );
}
export default ProductBusinessLink;
