import { BackIcon } from '@/components/icons/back';
import Link from 'next/link';
import RecoverPassForm from './_page-components/form';
import { RedirectType, redirect } from 'next/navigation';
import { validateNewPasswordToken } from '@/core/lib/auth';
import { cookies } from 'next/headers';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';

async function RecoverPassPage() {
  const token = cookies().get('recover_token')?.value;

  if (!token) redirect('/login', RedirectType.replace);

  const res = await validateNewPasswordToken(token);

  if (!res.success) {
    redirect(
      '/api/error?type=token validation&message=El token expiro o no es invalido',
    );
  }

  return (
    <div className='h-full grid place-content-center'>
      <div className='flex flex-col gap-4'>
        <h2
          className={cn('font-bold text-center text-3xl', workSans.className)}
        >
          Nueva contraseña
        </h2>
        <RecoverPassForm email={res.result} />
        <Link
          className='text-lg transition-colors hover:text-amber-200 text-center underline'
          href='/login'
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
export default RecoverPassPage;
