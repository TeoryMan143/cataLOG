'use client';

import Button from '@/components/button';
import GoogleIcon from '@/components/icons/google';
import { cn } from '@/core/client-utils';
import { createGoogleAuthorizationURL } from '@/core/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function GoogleButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  const router = useRouter();

  return (
    <Button
      className={cn(
        `        
        font-semibold flex justify-center items-center gap-3
        hover:bg-amber-100
        lg:border-2 lg:border-black lg:py-2
        `,
        className,
      )}
      onClick={async () => {
        const toastId = toast.loading('Iniciando sesión con Google');
        const res = await createGoogleAuthorizationURL();
        if (!res.success && res.errorType === 'insertion') {
          return toast.error(res.errors[0], { id: toastId });
        }
        if (res.success) {
          router.replace(res.result);
        }
      }}
      {...props}
    >
      <GoogleIcon />
      Continuar con Google
    </Button>
  );
}
export default GoogleButton;
