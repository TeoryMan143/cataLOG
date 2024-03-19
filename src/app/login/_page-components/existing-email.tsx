'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

function ExistEmail(props: React.ComponentPropsWithRef<typeof Dialog>) {
  const router = useRouter();

  return (
    <Dialog defaultOpen {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl'>
            Correo en uso
          </DialogTitle>
          <DialogDescription className='text-center text-xl'>
            El correo electronico de esta cuenta ya se encuentra registrado
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-3'>
          <svg
            className='text-7xl text-black'
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='m18 8l-8 5l-8-5V6l8 5l8-5m0-2H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m6 3h-2v6h2zm0 8h-2v2h2z'
            />
          </svg>
          <DialogClose asChild>
            <Button
              className='self-center'
              onClick={() => router.push('/login')}
            >
              Cerrar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ExistEmail;
