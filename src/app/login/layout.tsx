import Logo from '@/components/logo';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Regístrarse',
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='bg-[url("/bg-login.webp")] absolute w-[100dvw] h-[100dvh] bg-[center_left_-16rem] bg-cover'></div>
      <div className='bg-black/30 w-[100dvw] h-[100dvh] absolute'></div>
      <div className='bg-black/35 w-[23dvw] h-[100dvh] absolute'></div>
      <div className='bg-black/60 w-[35dvw] h-[100dvh] absolute right-0'></div>
      <main className='h-[100dvh] grid place-content-center relative z-10'>
        {children}
        <Link
          href='/register'
          className='
            text-center mt-2 text-gray-100 underline
            hover:text-gray-200
          '
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </main>
      <Logo className='absolute right-0 bottom-0 text-6xl text-white' />
    </>
  );
}
export default LoginLayout;
