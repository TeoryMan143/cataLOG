import { REMOTE_IMG_URL } from '@/core/client-utils';
import { getProductImages } from '@/core/lib/db/porducts';
import { DBProduct } from '@/core/schemas/product';
import Image from 'next/image';
import Link from 'next/link';

async function ProductPrev({
  product: { id },
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

  return (
    <Link
      className='bg-[#F4F1EE] border-2 border-[#C8C1C1] rounded-md'
      href={`/business/${businessId}/product/${id}`}
    >
      <Image
        className='size-[250px] object-cover rounded-sm'
        height={250}
        width={250}
        src={REMOTE_IMG_URL + mainImage}
        alt='Portada producto'
      />
      <div>
        
      </div>
    </Link>
  );
}
export default ProductPrev;
