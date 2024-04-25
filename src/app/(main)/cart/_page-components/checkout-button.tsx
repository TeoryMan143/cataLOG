'use client';

import { Button } from '@/components/ui/button';
import { checkout } from '@/core/lib/payments';

function CheckoutButton() {
  return (
    <Button
      onClick={async () => {
        const res = await checkout();
        console.log(res);
      }}
      className='absolute bottom-3 left-1/2 -translate-x-1/2 w-[80dvw]'
    >
      Realizar pago
    </Button>
  );
}
export default CheckoutButton;
