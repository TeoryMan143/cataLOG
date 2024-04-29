import Logo from '@/components/logo';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Regístrarse',
};

function LoginLayout({ children }: { children: React.ReactNode }) {

  const hasGoogleToken = cookies().has('google_token')

  if (hasGoogleToken) {
    redirect('/register/google-number')
  }

  return (
    <div className='lg:flex'>
      <div
        className='
        bg-[url("/bg-login.webp")] absolute w-[100dvw] h-[100dvh] bg-[center_right_-28rem] bg-cover
        lg:relative lg:inset-auto lg:flex-[1.5] lg:bg-center
      '
      ></div>
      <div className='bg-black/30 w-[100dvw] h-[100dvh] absolute lg:hidden'></div>
      <div className='bg-black/35 w-[23dvw] h-[100dvh] absolute lg:hidden'></div>
      <div className='bg-black/60 w-[35dvw] h-[100dvh] absolute right-0 lg:hidden'></div>
      <main
        className='
        h-[100dvh] grid place-content-center relative z-10
        lg:flex-1
      '
      >
        {children}
        <Link
          href='/register'
          className='
            text-center mt-2 text-gray-100 underline
            hover:text-amber-100
            lg:text-black
            lg:hover:text-gray-600
          '
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </main>
      <Logo
        className='
          absolute right-0 bottom-0 text-6xl text-white
         lg:text-black
        '
      />
    </div>
  );
}
export default LoginLayout;
