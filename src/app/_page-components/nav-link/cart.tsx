'use client';

import { cn } from '@/core/client-utils';
import Link from 'next/link';
import style from './style.module.css';
import { useCartStore } from '@/core/stores/shoping-cart/context';

type Props = React.ComponentPropsWithoutRef<typeof Link> & {
  icon?: React.ReactNode;
};

function CartLink({ className, children, icon, ...props }: Props) {
  const ids = useCartStore(state => state.itemIds);

  const count = ids.length;

  return (
    <Link
      className={cn(
        `flex text-center gap-2 text-white py-3 px-1 items-center relative`,
        className,
        style.underLineAnim,
      )}
      {...props}
    >
      <div className='relative'>
        {icon}
        {count > 0 && (
          <span className='p-0.5 text-[12px] rounded-full text-white bg-red-600 absolute z-40 -top-1 -right-2 size-[15px] flex justify-center items-center'>
            {count}
          </span>
        )}
      </div>
      {children && <span className='flex-1'>{children}</span>}
    </Link>
  );
}
export default CartLink;
