import Link from 'next/link';
import EditProductForm from './_page-components/edit-product-form';
import { BackIcon } from '@/components/icons/back';
import { getProductById, getProductImages } from '@/core/lib/db/porducts';
import { redirect } from 'next/navigation';
import { getProductCategories } from '@/core/lib/db/categories';

async function EditProductPage({
  params: { id: businessId, prodId },
}: {
  params: {
    id: string;
    prodId: string;
  };
}) {
  const product = await getProductById(prodId);
  const productImages = await getProductImages(prodId);
  const productCategories = await getProductCategories(prodId);

  if (!product || !productImages || !productCategories) redirect('/business');

  return (
    <div className='relative p-6 h-full flex justify-center items-center'>
      <Link
        className='
          text-gray-800 text-xl flex gap-2 absolute left-3 top-3 items-center transition-colors
          hover:text-amber-500
        '
        href={`/business/${businessId}`}
      >
        <BackIcon /> volver al negocio
      </Link>
      <EditProductForm
        businessId={businessId}
        product={product}
        productImages={productImages.map(img => img.image)}
        productCategories={productCategories}
      />
    </div>
  );
}
export default EditProductPage;
