'use client';

import { Button } from '@/components/ui/button';
import { checkout } from '@/core/lib/payments';

function CheckoutButton() {
  return (
    <Button
      onClick={async () => await checkout()}
      className='
        absolute bottom-3 left-1/2 -translate-x-1/2 w-[80dvw]
        lg:translate-x-0 lg:right-3 lg:w-auto lg:px-6
      '
    >
      Realizar pago
    </Button>
  );
}
export default CheckoutButton;
