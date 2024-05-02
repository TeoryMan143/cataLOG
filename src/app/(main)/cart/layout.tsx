import { getUserCartItems } from '@/core/lib/db/cart';
import CheckoutButton from './_page-components/checkout-button';

async function CartLayout({ children }: { children: React.ReactNode }) {
  const items = (await getUserCartItems()) ?? [];

  const total = items.reduce((acc, item) => {
    return item.price * item.amount + acc;
  }, 0);

  return (
    <div className='relative mb-4 h-full'>
      {children}
      <CheckoutButton itemsCount={items.length} total={total} />
    </div>
  );
}
export default CartLayout;
