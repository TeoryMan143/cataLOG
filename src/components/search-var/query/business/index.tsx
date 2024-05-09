import { useQuery } from '@tanstack/react-query';
import SearchSk from '../skeleton';
import { getBusinessesFromQuery } from '@/core/lib/business';
import SearchBusinesses from './search-businesses';
import NoResults from '../no-results';

type Props = {
  q: string;
};

function BusinessesQuery({ q }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['buss-query', q],
    queryFn: async () => {
      const res = await getBusinessesFromQuery(q);

      if (!res.success) {
        throw new Error(res.errors[0] as string);
      }

      return res.result;
    },
  });

  if (q.length === 0) {
    return <p className='text-center'>Busca algun negocio</p>;
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
      {data?.map(bus => <SearchBusinesses key={bus.id} business={bus} />)}
      {data?.length === 0 && <NoResults />}
    </div>
  );
}
export default BusinessesQuery;
