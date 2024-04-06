import { getProductCategories } from '@/core/lib/db/categories';

async function Categories({ productId }: { productId: string }) {
  const categories = await getProductCategories(productId);

  if (!categories) {
    return (
      <p className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
        Hubo un error obteniendo las categorias
      </p>
    );
  }

  return (
    <ul className='flex'>
      {categories.map(cat => (
        <li
          key={cat.id}
          className='bg-gray-900 relative text-white py-1 px-3 ring-1 ring-white'
        >
          {cat.name}
          <div className='absolute size-0 border-t-[16.9px] border-t-transparent border-b-[16.9px] border-b-transparent border-l-gray-900 border-l-[30px] -right-7 box-content top-1/2 -translate-y-1/2'></div>
        </li>
      ))}
    </ul>
  );
}
export default Categories;
