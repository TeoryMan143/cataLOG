import CheckoutButton from './_page-components/checkout-button';

function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='realtive mb-4'>
      {children}
      <CheckoutButton />
    </div>
  );
}
export default CartLayout;
