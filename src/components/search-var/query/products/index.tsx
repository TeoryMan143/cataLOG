import { getProductsFromQuery } from '@/core/lib/products';
import { useQuery } from '@tanstack/react-query';
import SearchSk from '../skeleton';
import SearchProduct from './search-products';

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
      {data?.length === 0 && (
        <div className='flex items-center flex-col gap-2'>
          <p className='text-center text-xl'>
            No se encontraron productos coincidentes
          </p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            x='0px'
            y='0px'
            viewBox='0 0 32 32'
            height='1em'
            width='1em'
            className='text-3xl lg:text-6xl'
          >
            <g>
              <path d='M27.28,25.86C29.59,23.22,31,19.78,31,16c0-8.27-6.73-15-15-15S1,7.73,1,16s6.73,15,15,15c3.78,0,7.22-1.41,9.86-3.72   l3.43,3.43C29.49,30.9,29.74,31,30,31s0.51-0.1,0.71-0.29c0.39-0.39,0.39-1.02,0-1.41L27.28,25.86z M3,16C3,8.83,8.83,3,16,3   s13,5.83,13,13s-5.83,13-13,13S3,23.17,3,16z M10,13c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S10,14.1,10,13z M22,13c0,1.1-0.9,2-2,2   s-2-0.9-2-2s0.9-2,2-2S22,11.9,22,13z M21.5,19.59c0.22,0.5,0,1.1-0.51,1.32c-0.13,0.06-0.27,0.09-0.4,0.09   c-0.38,0-0.75-0.22-0.92-0.6C19.03,18.94,17.58,18,16,18s-3.03,0.94-3.68,2.41c-0.22,0.5-0.81,0.74-1.32,0.51   c-0.5-0.22-0.73-0.81-0.51-1.32C11.46,17.41,13.63,16,16,16S20.54,17.41,21.5,19.59z' />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
export default ProductsQuery;
