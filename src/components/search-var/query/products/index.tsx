import { getProductsFromQuery } from '@/core/lib/products';
import { useQuery } from '@tanstack/react-query';
import SearchSk from '../skeleton';
import SearchProduct from './search-products';
import NoResults from '../no-results';

type Props = {
  q: string;
};

function ProductsQuery({ q }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['prods-query', q],
    queryFn: async () => {
      const res = await getProductsFromQuery(q);

      if (!res.success) {
        throw new Error(res.errors[0] as string);
      }

      return res.result;
    },
  });

  if (q.length === 0) {
    return <p className='text-center'>Busca algun producto</p>;
  }

  return (
    <div className='flex flex-col'>
      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => <SearchSk key={i} />)}
      {error && (
        <p className='text-red-600 bg-red-200 p-2'>
          Ha ocurrido un error inesperado
        </p>
      )}
      {data?.map(prod => <SearchProduct key={prod.id} product={prod} />)}
      {data?.length === 0 && <NoResults />}
    </div>
  );
}
export default ProductsQuery;
