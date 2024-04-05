'use client';

import ProductPrev from '@/components/product-prev';
import { getProductsListByRating } from '@/core/lib/products';
import { DBProduct } from '@/core/schemas/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from 'usehooks-ts';

function RatedScroll({ initProducts }: { initProducts: DBProduct[] }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
  });

  const { data } = useInfiniteQuery({
    queryKey: ['q-rated-products'],
    queryFn: async ({ pageParam }) => {
      const res = await getProductsListByRating({
        limit: 10,
        offset: pageParam as number,
      });

      if (!res.success) {
        throw new Error(res.errors[0] as string);
      }

      return res.result;
    },
    initialPageParam: 10,
    getNextPageParam: (_, pages) => {
      return pages.length;
    },
    initialData: {
      pages: [initProducts],
      pageParams: [0],
    },
  });

  return (
    <ul className='overflow-x-auto flex max-w-[100dvw] gap-2 p-1'>
      {data.pages.flat().map(p => (
        <li key={p.id} className='min-w-40'>
          <ProductPrev product={p} />
        </li>
      ))}
    </ul>
  );
}
export default RatedScroll;
