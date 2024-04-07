import { getBusinessProducts } from '@/core/lib/db/products';
import ProductPrev from '../../../../../../components/product-prev';

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
    <ul className='flex gap-3 flex-wrap p-5'>
      {products.map(prod => (
        <li key={prod.id}>
          <ProductPrev product={prod} admin />
        </li>
      ))}
    </ul>
  );
}
export default AllProducts;
