import CartControl from '@/components/cart-control';
import Categories from '@/components/categories';
import ImagesCarousel from '@/components/images-carousel';
import ProductRating from '@/components/product-rating';
import { Button } from '@/components/ui/button';
import { REMOTE_IMG_URL, UNITS, cn, formatToCOP } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { getBusinessById } from '@/core/lib/db/business';
import { getProductItem } from '@/core/lib/db/cart';
import { getProductByIdWithImages } from '@/core/lib/db/products';
import Image from 'next/image';
import Link from 'next/link';
import { RedirectType, redirect } from 'next/navigation';

type Props = {
  searchParams: {
    p: string | null;
  };
};

async function ViewProductPage({ searchParams: { p: prodId } }: Props) {
  if (!prodId) redirect('/404');

  const product = await getProductByIdWithImages(prodId);
  const images = product?.images;

  if (!product || !images) redirect('/', RedirectType.replace);

  const {
    avialableUnits,
    displayName,
    price,
    description,
    unit,
    rating,
    businessId,
  } = product;

  const unitLabel = UNITS.find(u => u.value === unit)?.label;

  const item = await getProductItem(prodId);

  const business = await getBusinessById(businessId);

  if (!business) redirect('/', RedirectType.replace);

  return (
    <div className='p-6'>
      <div
        className='
          flex gap-3 flex-col items-center
          lg:flex-row lg:items-start
        '
      >
        <div className='flex flex-col'>
          <h1
            className={cn(
              'text-3xl text-center font-bold lg:hidden mb-3',
              workSans.className,
            )}
          >
            {displayName}
          </h1>
          <ImagesCarousel images={images.map(img => img.image)} />
          <Link
            className='text-slate-800 hover:text-black'
            href={`/b/${businessId}`}
          >
            <div className='flex gap-2 my-2 items-center'>
              <p>Producto de: {business.name}</p>
              <Image
                src={REMOTE_IMG_URL + business.image}
                alt='Business'
                height={40}
                width={40}
              />
            </div>
          </Link>
          <p className='mt-3 text-xl font-semibold'>
            Cantidad disponible: {avialableUnits}
            {unit}
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-4'>
          <div>
            <h1
              className={cn(
                'hidden text-5xl font-bold lg:block',
                workSans.className,
              )}
            >
              {displayName}
            </h1>
            <p className='text-lg mt-1'>
              {formatToCOP(price)} COP / {unitLabel}
            </p>
          </div>
          <ProductRating rating={Math.floor(rating)} />
          <div className='space-y-3'>
            <p className='font-semibold mb-2'>Descripción del producto</p>
            <Categories productId={prodId} />
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div
        className='
          flex justify-center mt-4
          lg:justify-start
        '
      >
        <CartControl
          productId={prodId}
          availableUnits={avialableUnits}
          itemAmount={item?.amount}
        />
      </div>
    </div>
  );
}
export default ViewProductPage;
