import Logo from '@/components/logo';
import RegisterEmailForm from './_register-email-form';
import { cn } from '@/core/utils';
import { workSans } from '@/core/fonts';

function EmailPage() {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <h2
        className={cn(
          workSans.className,
          `
          font-bold text-[1.7rem] text-white text-center
          lg:text-black lg:text-5xl lg:px-10
          `
        )}
      >
        Completa los siguientes datos para obtener tu cuenta cataLOG
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
      <RegisterEmailForm />
    </div>
  );
}
export default EmailPage;
