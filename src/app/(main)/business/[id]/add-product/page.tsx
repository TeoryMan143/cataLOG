import Link from 'next/link';
import AddProductForm from './_page-components/add-product-form';
import { BackIcon } from '@/components/icons/back';

function AddProductPage({
  params: { id: businessId },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className='relative p-6 h-full flex justify-center items-center'>
      <Link
        className='
          text-gray-800 text-xl flex gap-2 absolute left-3 top-3 items-center transition-colors
          hover:text-amber-500
        '
        href={`/business/${businessId}/catalog`}
      >
        <BackIcon /> volver al negocio
      </Link>
      <AddProductForm businessId={businessId} />
    </div>
  );
}
export default AddProductPage;
