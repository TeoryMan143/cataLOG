import Logo from '@/components/logo';
import { Metadata } from 'next';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import RegisterBusinessForm from './_register-business-form';
import Link from 'next/link';
import { BackIcon } from '@/components/icons/back';

function RegisterBusinessPage() {
  return (
    <div
      className='
        flex flex-col gap-6 items-center justify-center relative overflow-y-auto py-12
        lg:px-32 lg:bg-white lg:h-[100dvh]
      '
    >
      <Link
        className='
          text-white flex gap-2 absolute left-3 top-5 items-center transition-colors
          hover:text-amber-100
          lg:text-gray-800 lg:top-3
          lg:hover:text-amber-500
        '
        href='/'
      >
        <BackIcon /> volver a cataLOG
      </Link>
      <h2
        className={cn(
          workSans.className,
          `
            font-bold text-5xl text-white mb-5 text-center mt-36
            lg:text-black lg:text-6xl lg:mb-8
          `
        )}
      >
        Regístra tu negocio
      </h2>
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
