import { getProductsListByCategory } from '@/core/lib/products';
import { redirect } from 'next/navigation';
import DrinkScroll from './scroll';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import StarsIcon from '@/components/icons/stars';

async function DrinkProducts() {
  const initProductsRes = await getProductsListByCategory({
    limit: 10,
    offset: 0,
    categoryId: '531e9eb5-d96f-4f94-ac3d-c19862f0001e',
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
        BEBIDAS
      </h3>
      <DrinkScroll initProducts={initProductsRes.result} />
    </div>
  );
}
export default DrinkProducts;
