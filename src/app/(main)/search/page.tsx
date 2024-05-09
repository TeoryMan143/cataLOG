'use client';

import { useCallback, useState } from 'react';
import FilterDrawer from './_page-components/filter-drawer';
import { DBCategory } from '@/core/schemas/categories';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getProductsFromComplexQuery } from '@/core/lib/products';
import LoadingSpin from '@/components/icons/loading-spin';
import { cn } from '@/core/client-utils';
import SearchProduct from '@/components/search-var/query/products/search-products';
import NoResults from '@/components/search-var/query/no-results';

function SearchPage() {
  const [queryCategories, setQueryCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const searchParams = useSearchParams();

  const q = searchParams.get('q');

  const handleCategoriesChange = useCallback(
    (cats: DBCategory[]) => {
      setQueryCategories(cats.map(c => c.id));
    },
    [setQueryCategories],
  );

  const handleMinPriceCommit = useCallback(
    (val: number | null) => setMinPrice(val),
    [setMinPrice],
  );
  const handleMaxPriceCommit = useCallback(
    (val: number | null) => setMaxPrice(val),
    [setMaxPrice],
  );

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['query-search-page', q, queryCategories, minPrice, maxPrice],
    queryFn: async () => {
      if (!q) return [];

      const res = await getProductsFromComplexQuery({
        query: q,
        categories: queryCategories,
        minPrice,
        maxPrice,
      });

      if (!res.success) {
        throw new Error('An error occurred ');
      }

      return res.result;
    },
  });

  return (
    <div className='relative h-full'>
      <FilterDrawer
        onCategoriesChange={handleCategoriesChange}
        onMinPriceCommit={handleMinPriceCommit}
        onMaxPriceCommit={handleMaxPriceCommit}
      />
      <div
        className={cn('h-full flex flex-col gap-3 p-2', {
          'justify-center items-center': isLoading,
        })}
      >
        {isLoading ? (
          <LoadingSpin className='text-4xl' />
        ) : (
          <>
            {products?.map(prod => (
              <SearchProduct product={prod} key={prod.id} />
            ))}
          </>
        )}
        {error && <p className='bg-red-200 text-red-600'>Error inesperado</p>}
        {products?.length === 0 && <NoResults />}
      </div>
    </div>
  );
}
export default SearchPage;
