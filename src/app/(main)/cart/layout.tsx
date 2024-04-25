import CheckoutButton from './_page-components/checkout-button';

function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative mb-4 h-full'>
      {children}
      <CheckoutButton />
    </div>
  );
}
export default CartLayout;
