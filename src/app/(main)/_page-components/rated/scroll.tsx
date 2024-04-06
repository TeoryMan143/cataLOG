'use client';

import ProductPrev from '@/components/product-prev';
import ProductPrevSk from '@/components/product-prev/skeleton';
import { getProductsListByRating } from '@/core/lib/products';
import { DBProduct } from '@/core/schemas/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

function RatedScroll({ initProducts }: { initProducts: DBProduct[] }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 1,
  });

  const INIT_PAGE_PARAM = 10;

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['q-rated-products'],
      queryFn: async ({ pageParam }) => {
        const res = await getProductsListByRating({
          limit: INIT_PAGE_PARAM,
          offset: pageParam,
        });

        if (!res.success) {
          throw new Error(res.errors[0] as string);
        }

        return res.result;
      },
      initialPageParam: INIT_PAGE_PARAM,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) {
          return;
        }
        const next = pages.flatMap(p => p).length;
        return next;
      },
      initialData: {
        pages: [initProducts],
        pageParams: [0],
      },
    });

  const products = useMemo(() => data.pages.flatMap(p => p), [data.pages]);

  if (isIntersecting) fetchNextPage();

  return (
    <ul className='overflow-x-auto flex max-w-[100dvw] gap-2 p-1'>
      {products.map((p, i) => {
        if (i === products.length - 1) {
          return (
            <li key={p.id} className='min-w-40 lg:min-w-60' ref={ref}>
              <ProductPrev product={p} />
            </li>
          );
        }
        return (
          <li key={p.id} className='min-w-40 lg:min-w-60'>
            <ProductPrev product={p} />
          </li>
        );
      })}
      {isFetchingNextPage &&
        hasNextPage &&
        Array.from({ length: 5 }).map((_, i) => (
          <li className='min-w-40 lg:min-w-60' key={i}>
            <ProductPrevSk />
          </li>
        ))}
    </ul>
  );
}
export default RatedScroll;
