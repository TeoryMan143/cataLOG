import ProductImageLoader from '@/components/product-image-loader';
import { cn, formatToCOP } from '@/core/client-utils';
import { DBProduct } from '@/core/schemas/product';
import Link from 'next/link';

function SearchProduct({
  product: { displayName, id, price, avialableUnits },
}: {
  product: DBProduct;
}) {
  return (
    <Link className='flex gap-1 hover:bg-amber-50' href={`/v?p=${id}`}>
      <div
        className='
          size-20 p-2 overflow-hidden
          lg:size-[150px]
        '
      >
        <ProductImageLoader productId={id} tiny />
      </div>
      <div className='space-y-2 flex-1'>
        <h2
          className='
            font-bold truncate
            lg:text-2xl
          '
        >
          {displayName}
        </h2>
        <div className='flex gap-2 text-lg'>
          <p>{formatToCOP(price)} COP</p>
          <p
            className={cn('text-green-600', {
              'text-red-600': avialableUnits <= 0,
            })}
          >
            {avialableUnits <= 0 ? 'Agotado' : 'Disponible'}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default SearchProduct;
