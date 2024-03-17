'use client';

import Button from '@/components/button';
import FacebookIcon from '@/components/icons/facebook';
import GoogleIcon from '@/components/icons/google';
import { createGoogleAuthorizationURL } from '@/core/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function SocialButtons() {
  const router = useRouter();

  return (
    <>
      <Button
        className='
          font-semibold flex justify-center items-center gap-3
          hover:bg-amber-100
          lg:border-2 lg:border-black lg:py-2
        '
        onClick={async () => {
          const toastId = toast.loading('Iniciando sesión con Google');
          const res = await createGoogleAuthorizationURL();
          if (!res.success && res.errorType === 'insertion') {
            return toast.error(res.errors[0], { id: toastId });
          }
          if (res.success) {
            router.replace(res.result.toString());
          }
        }}
      >
        <GoogleIcon />
        Continuar con Google
      </Button>
      <Button
        className='
          font-semibold flex justify-center items-center gap-3
          hover:bg-amber-100
          lg:border-2 lg:border-black lg:py-2
        '
      >
        <FacebookIcon />
        Continuar con Facebook
      </Button>
    </>
  );
}
export default SocialButtons;
