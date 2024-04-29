'use client';

import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

function BusinessTabs() {
  const { id } = useParams();
  const url = usePathname();

  const catalogActive = useMemo(() => url.endsWith('catalog'), [url]);

  return (
    <div className='flex gap-1 [&>a]:grow [&_h3]:transition mb-3'>
      <Link href={`/business/${id}/catalog`}>
        <h3
          className={cn(
            'py-3 rounded-sm text-2xl text-center tracking-[1rem] border border-black',
            workSans.className,
            {
              'bg-black text-white': catalogActive,
            },
          )}
        >
          Catálogo
        </h3>
      </Link>
      <Link href={`/business/${id}/orders`}>
        <h3
          className={cn(
            'py-3 rounded-sm text-2xl text-center tracking-[1rem] border border-black',
            workSans.className,
            {
              'bg-black text-white': !catalogActive,
            },
          )}
        >
          Ordenes
        </h3>
      </Link>
    </div>
  );
}
export default BusinessTabs;
