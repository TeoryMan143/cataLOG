import { BackIcon } from '@/components/icons/back';
import Link from 'next/link';
import RecoverPassForm from './_page-components/form';
import { RedirectType, redirect } from 'next/navigation';
import { validateNewPasswordToken } from '@/core/lib/auth';

type Props = {
  searchParams: {
    token?: string;
  };
};

async function RecoverPassPage({ searchParams: { token } }: Props) {
  if (!token) redirect('/', RedirectType.replace);

  const res = await validateNewPasswordToken(token);

  if (!res.success) {
    redirect(
      '/api/error?type=token validation&message=El token expiro o es invalido',
    );
  }

  return (
    <div className='h-full grid place-content-center relative'>
      <Link
        className='absolute top-2 left-2 text-lg transition-colors hover:text-amber-200'
        href='/login'
      >
        <BackIcon /> Iniciar sesión
      </Link>
      <RecoverPassForm email={res.result} />
    </div>
  );
}
export default RecoverPassPage;
