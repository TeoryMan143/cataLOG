import { REMOTE_IMG_URL, cn, formatToCOP } from '@/core/client-utils';
import { getProductImages } from '@/core/lib/db/porducts';
import { DBProduct } from '@/core/schemas/product';
import Image from 'next/image';
import Link from 'next/link';

async function ProductPrev({
  product: { id, displayName, price, avialableUnits },
  businessId,
}: {
  product: DBProduct;
  businessId: string;
}) {
  const images = await getProductImages(id);

  if (!images) {
    return (
      <p className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
        Hubo un error obteniendo los productos
      </p>
    );
  }

  const mainImage = images[0].image;

  const avialable = avialableUnits > 0;

  return (
    <Link
      className='inline-block p-4 space-y-3'
      href={`/business/${businessId}/product/${id}`}
    >
      <Image
        className='size-[200px] object-cover rounded-sm'
        height={200}
        width={200}
        src={REMOTE_IMG_URL + mainImage}
        alt='Portada producto'
      />
      <div>
        <p className='text-xl text-black text-center'>{displayName}</p>
        <p className='text-lg text-center'>
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
  );
}
export default ProductPrev;
