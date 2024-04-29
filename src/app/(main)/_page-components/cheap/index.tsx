import { getProductsListByPrice } from '@/core/lib/products';
import { redirect } from 'next/navigation';
import CheapScroll from './scroll';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { DollarIcon } from '@/components/icons/dollar';

async function CheapProducts() {
  const initProductsRes = await getProductsListByPrice({
    limit: 10,
    offset: 0,
  });

  if (!initProductsRes.success) {
    redirect('/');
  }

  return (
    <div className='m-2'>
      <h3
        className={cn(
          workSans.className,
          `
            tracking-[3px] mb-3 flex items-center justify-center gap-2
            lg:text-2xl
          `,
        )}
      >
        <DollarIcon
          className='
          relative bottom-[2px] text-lg
          lg:text-3xl
        '
        />{' '}
        PRODUCTOS ECONOMICOS
      </h3>
      <CheapScroll initProducts={initProductsRes.result} />
    </div>
  );
}
export default CheapProducts;
