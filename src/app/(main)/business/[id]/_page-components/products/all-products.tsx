import { getBusinessProducts } from '@/core/lib/db/porducts';
import ProductPrev from './product-prev';

async function AllProducts({ businessId }: { businessId: string }) {
  const products = await getBusinessProducts(businessId);

  if (!products) {
    return (
      <p className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
        Hubo un error obteniendo los productos
      </p>
    );
  }

  return (
    <ul className='flex gap-3 flex-wrap'>
      {products.map(prod => (
        <li key={prod.id}>
          <ProductPrev product={prod} businessId={businessId} />
        </li>
      ))}
    </ul>
  );
}
export default AllProducts;
