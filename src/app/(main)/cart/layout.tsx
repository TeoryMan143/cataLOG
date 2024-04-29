import { getUserCartItems } from '@/core/lib/db/cart';
import CheckoutButton from './_page-components/checkout-button';

async function CartLayout({ children }: { children: React.ReactNode }) {
  const items = (await getUserCartItems()) ?? [];

  return (
    <div className='relative mb-4 h-full'>
      {children}
      <CheckoutButton itemsCount={items.length} />
    </div>
  );
}
export default CartLayout;
