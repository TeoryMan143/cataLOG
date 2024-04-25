import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { getUserCartItems } from '@/core/lib/db/cart';
import CartItem from './_page-components/cart-item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function CartPage() {
  const items = (await getUserCartItems()) ?? [];

  if (items.length === 0) {
    return (
      <div className='h-full flex flex-col justify-center items-center gap-3'>
        <p className={cn('text-center text-2xl', workSans.className)}>
          Nada en el carrito
        </p>
        <Button asChild>
          <Link href='/'>Ir a comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-3 p-5'>
      {items.map(item => (
        <CartItem item={item} key={item.id} />
      ))}
    </div>
  );
}
export default CartPage;
