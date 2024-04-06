import { getProductCategories } from '@/core/lib/db/categories';

async function Categories({ productId }: { productId: string }) {
  const categories = await getProductCategories(productId);

  if (!categories) {
    return (
      <p className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
        Hubo un error obteniendo las categorias.
      </p>
    );
  }

  return (
    <ul className='inline-flex rounded-sm overflow-clip flex-wrap'>
      {categories.map(cat => (
        <li
          key={cat.id}
          className='bg-gray-900 relative text-white py-1 px-3 ring-1 ring-white rounded-sm'
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
}
export default Categories;
