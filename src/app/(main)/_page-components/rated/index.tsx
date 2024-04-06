import { getProductsListByRating } from '@/core/lib/products';
import { redirect } from 'next/navigation';
import RatedScroll from './scroll';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import StarsIcon from '@/components/icons/stars';

async function RatedProducts() {
  const initProductsRes = await getProductsListByRating({
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
        <StarsIcon
          className='
          relative bottom-[2px] text-lg
          lg:text-3xl
        '
        />{' '}
        PRODUCTOS DESTACADOS
      </h3>
      <RatedScroll initProducts={initProductsRes.result} />
    </div>
  );
}
export default RatedProducts;
