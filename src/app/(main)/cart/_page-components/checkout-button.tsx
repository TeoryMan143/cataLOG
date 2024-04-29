'use client';

import HashTagIcon from '@/components/icons/number';
import Input from '@/components/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { checkout } from '@/core/lib/payments';
import { useState } from 'react';
import { toast } from 'sonner';

function CheckoutButton({ itemsCount }: { itemsCount: number }) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  return (
    <>
      <Dialog onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={async () => {
              if (itemsCount < 1) {
                return toast.error('Agrega al menos un ítem al carrito');
              }
            }}
            className='
          absolute bottom-3 left-1/2 -translate-x-1/2 w-[80dvw] -z-10
          lg:translate-x-0 lg:right-3 lg:w-auto lg:px-6
        '
          >
            Realizar pago
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir dirección</DialogTitle>
          </DialogHeader>
          <div className='flex justify-center'>
            <Input
              icon={<HashTagIcon className='text-black' />}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <Button
            onClick={async () => {
              if (address) {
                await checkout(address);
              }
            }}
          >
            Comprar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CheckoutButton;
