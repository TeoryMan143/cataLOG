import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

type Props = React.ComponentPropsWithRef<typeof Dialog> & {
  count: number;
  onResendClick: () => Promise<void>;
  error?: string | null;
};

function EmailVerifyDialog({ count, onResendClick, error, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog {...props}>
      <DialogContent noClose>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl'>
            Verifica tu correo electrónico
          </DialogTitle>
          <DialogDescription className='text-center text-xl'>
            Revisa tu bandeja de entrada para verificar el correo
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-3'>
          <svg
            className='text-9xl text-black'
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M12 .64L8.23 3H5v2L2.97 6.29C2.39 6.64 2 7.27 2 8v10a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V8c0-.73-.39-1.36-.97-1.71L19 5V3h-3.23M7 5h10v4.88L12 13L7 9.88M8 6v1.5h8V6M5 7.38v1.25L4 8m15-.62L20 8l-1 .63M8 8.5V10h8V8.5Z'
            />
          </svg>
          {error && (
            <p className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
              {error}
            </p>
          )}
          <Button
            disabled={(count > 0 && count < 60) || isLoading}
            onClick={async () => {
              setIsLoading(true);
              await onResendClick();
              setIsLoading(false);
            }}
            className='self-center'
          >
            Reenviar email {count > 0 && count < 60 && `en ${count} segundos`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default EmailVerifyDialog;
