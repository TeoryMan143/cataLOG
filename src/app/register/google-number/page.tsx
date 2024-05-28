import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import AddNumber from './_add-number';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

function GoogleNumberPage() {
  const hasGoogleToken = cookies().has('google_token');

  if (!hasGoogleToken) {
    redirect('/login', RedirectType.replace);
  }

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
        Añade un numero telefonico
      </h2>
      <AddNumber />
    </div>
  );
}
export default GoogleNumberPage;
