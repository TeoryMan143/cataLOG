import Logo from '@/components/logo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regístra tu negocio',
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='lg:flex lg:bg-[url("/bg-login.webp")]'>
      <div
        className='
        bg-[url("/bg-login.webp")] absolute w-[100dvw] h-[100dvh] bg-[center_right_-28rem] bg-cover
        lg:hidden
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
      </main>
      <Logo
        className='
          absolute right-0 bottom-0 text-6xl text-white
         lg:hidden
        '
      />
    </div>
  );
}
export default LoginLayout;
