import Logo from '@/components/logo';
import { Metadata } from 'next';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import RegisterBusinessForm from './_register-business-form';
import Link from 'next/link';

function RegisterBusinessPage() {
  return (
    <div
      className='
        flex flex-col gap-6 items-center justify-center 
        lg:px-32 lg:bg-white lg:h-[100dvh]
      '
    >
      <h2
        className={cn(
          workSans.className,
          `
          font-bold text-5xl text-white mb-5 text-center
          lg:text-black lg:text-6xl lg:mb-8
        `
        )}
      >
        Regístra tu negocio
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
      <RegisterBusinessForm />
      <Link
        href='/business'
        className='
            text-center mt-2 text-gray-100 underline
            hover:text-amber-100
            lg:text-black
            lg:hover:text-gray-600
          '
      >
        Ir a mis negocios
      </Link>
    </div>
  );
}
export default RegisterBusinessPage;
