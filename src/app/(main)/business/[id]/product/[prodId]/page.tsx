import { getProductById, getProductImages } from '@/core/lib/db/porducts';
import { RedirectType, redirect } from 'next/navigation';
import ImagesCarousel from './_page-components/images-carousel';
import { cn, formatToCOP } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import Categories from './_page-components/categories';
import DeleteProduct from './_page-components/delete';
import EditButton from './_page-components/edit-button';

type Props = {
  params: {
    prodId: string;
    id: string;
  };
};

async function AdminProductPage({ params: { prodId, id: bissId } }: Props) {
  const product = await getProductById(prodId);
  const images = await getProductImages(prodId);

  if (!product || !images) redirect('/business', RedirectType.replace);

  const { avialableUnits, displayName, price, description, businessId } =
    product;

  if (bissId !== businessId) redirect('/', RedirectType.replace);

  return (
    <div className='p-6 flex gap-3'>
      <div className='flex flex-col'>
        <ImagesCarousel images={images.map(img => img.image)} />
        <p className='mt-3 text-xl font-semibold'>
          Unidades disponibles: {avialableUnits}
        </p>
      </div>
      <div className='flex-1 flex flex-col gap-4'>
        <div>
          <h1 className={cn('text-5xl font-bold', workSans.className)}>
            {displayName}
          </h1>
          <p className='text-lg mt-1'>{formatToCOP(price)} COP</p>
        </div>
        <div className='space-y-3'>
          <p className='font-semibold mb-5'>Descripción del producto</p>
          <Categories productId={prodId} />
          <p>{description}</p>
        </div>
        <div className='flex gap-3'>
          <DeleteProduct productId={prodId} />
          <EditButton />
        </div>
      </div>
    </div>
  );
}
export default AdminProductPage;
