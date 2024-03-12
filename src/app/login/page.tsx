import Logo from '@/components/logo';
import LoginEmailForm from './_login-email-form';
import { Metadata } from 'next';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@root/auth';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
};

async function Login() {
  const session = await auth();

  return (
    <div className='flex flex-col gap-6 items-center'>
      <h2
        className={cn(
          workSans.className,
          `
          font-bold text-5xl text-white mb-10 text-center
          lg:text-black lg:text-6xl lg:mb-8
        `,
        )}
      >
        Ingresa a catalog
      </h2>
      <div
        className='
          bg-black rounded-full p-16 relative border-4 border-white
          lg:bg-transparent lg:border-black
        '
      >
        <Logo
          className='
            text-8xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            lg:text-black
          '
        />
      </div>
      <SessionProvider session={session}>
        <LoginEmailForm />
      </SessionProvider>
    </div>
  );
}
export default Login;
