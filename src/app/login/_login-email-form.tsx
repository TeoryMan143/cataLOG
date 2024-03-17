'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { type LoginCredentials, loginCredentials } from '@/core/schemas/user';
import { loginUser, resendVerifyEmail } from '@/core/lib/auth';
import type { ActionError, ActionResponse } from '@/core/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmailIcon } from '@/components/icons/mail';
import PasswordFillIcon from '@/components/icons/password-fill';
import { useRouter } from 'next/navigation';
import { useCountdown } from 'usehooks-ts';
import EmailVerifyDialog from '../_page-components/email-verify-dialog';

function LoginEmailForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentials),
  });

  const router = useRouter();

  const [serverError, setServerError] = useState<ActionError | null>(null);
  const [credentialsError, setCredentialsError] = useState(false);
  const [openEmailVerify, setOpenEmailVerify] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [count, { resetCountdown, startCountdown, stopCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count, stopCountdown, resetCountdown]);

  const handleResend = async () => {
    const res = await resendVerifyEmail(getValues('email'));
    if (!res.success) {
      setVerifyError(res.errorType === 'validation' ? null : res.errors[0]);
      toast.error('Error del servidor');
      return setServerError(res);
    }
    startCountdown();
  };

  const onSubmit: SubmitHandler<LoginCredentials> = async data => {
    const toastId = toast.loading('Verificando informacion...');
    const res = await loginUser(data);

    if (!res.success && res.errorType === 'auth') {
      toast.error('Email o contraseña incorrectos', { id: toastId });
      return setCredentialsError(true);
    }

    if (!res.success && res.errorType === 'email-verification') {
      toast.error('Correo no verificado', { id: toastId });
      setOpenEmailVerify(true);
      startCountdown();
      return setServerError(res);
    }

    if (!res.success) {
      toast.error('Error del servidor', { id: toastId });
      return setServerError(res!);
    }

    router.replace('/');
    toast.success('Se inicío sesión correctamente', { id: toastId });
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <EmailVerifyDialog
        onResendClick={handleResend}
        open={openEmailVerify}
        count={count}
        error={verifyError}
      />
      <Input
        className='
          border-black 
          lg:border lg:focus:bg-amber-100 lg:bg-gray-300
        '
        placeholder='Correo electrónico'
        icon={<EmailIcon className='text-xl lg:text-black' />}
        {...register('email')}
        error={errors.email}
      />
      <Input
        className='
            border-black 
            lg:border lg:focus:bg-amber-100 lg:bg-gray-300
          '
        placeholder='Contraseña'
        icon={<PasswordFillIcon className='lg:text-black' />}
        type='password'
        {...register('password')}
        error={errors.password}
      />

      {serverError && (
        <div className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
          <p>Server error: {serverError.errorType}</p>
          <ul>
            {serverError.errors?.map(error => (
              <li key={crypto.randomUUID()}>{error.toString()}</li>
            ))}
          </ul>
        </div>
      )}

      {credentialsError && (
        <div className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
          <p className='text-center'>
            Correo electrónico o contraseña incorrectos
          </p>
        </div>
      )}

      <Button
        disabled={isSubmitting}
        variant='dark'
        type='submit'
        className='
          w-72 py-2 mt-5
          hover:bg-gray-900
          disabled:bg-gray-600
        '
      >
        Iniciar sesión
      </Button>
    </form>
  );
}
export default LoginEmailForm;
