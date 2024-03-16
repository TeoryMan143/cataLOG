import RegisterEmailForm from './_page-components/register-user-form';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';

function EmailPage() {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <h2
        className={cn(
          workSans.className,
          `
          font-bold text-[1.7rem] text-white text-center
          lg:text-black lg:px-10
          `,
        )}
      >
        Completa los siguientes datos para obtener tu cuenta cataLOG
      </h2>
      <RegisterEmailForm />
    </div>
  );
}
export default EmailPage;
