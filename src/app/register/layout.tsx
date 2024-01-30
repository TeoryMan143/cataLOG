import Logo from '@/components/logo';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Regístrarse',
};

function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='lg:flex lg:max-h-[100dvh]'>
      <div
        className='
        bg-[url("/bg-register.webp")] absolute w-[100dvw] h-[100dvh] bg-[center_right_-28rem] bg-cover
        lg:relative lg:inset-auto lg:flex-[1.5] lg:bg-center
      '
      ></div>
      <div className='bg-black/30 w-[100dvw] h-[100dvh] absolute lg:hidden'></div>
      <div className='bg-black/35 w-[23dvw] h-[100dvh] absolute lg:hidden'></div>
      <div className='bg-black/60 w-[35dvw] h-[100dvh] absolute right-0 lg:hidden'></div>
      <main
        className='
        h-[100dvh] grid place-content-center relative z-10
        lg:flex-1 lg:max-h-[100dvh]
      '
      >
        {children}
        <Link
          href='/login'
          className='
            text-center mt-2 text-gray-100 underline
            hover:text-amber-100
            lg:text-black
            lg:hover:text-gray-600
          '
        >
          ¿Ya tienes cuenta?
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
export default RegisterLayout;
