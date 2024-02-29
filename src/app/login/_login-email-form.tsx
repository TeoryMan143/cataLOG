'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { type LoginCredentials, loginCredentials } from '@/core/schemas/user';
import { loginUser } from '@/core/lib/auth';
import type { ActionError, ActionResponse } from '@/core/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { EmailIcon } from '@/components/icons/mail';
import PasswordFillIcon from '@/components/icons/password-fill';

function LoginEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentials),
  });

  const [serverError, setServerError] = useState<ActionError | null>(null);

  const [credentialsError, setCredentialsError] = useState(false);

  const { data: session } = useSession();

  const onSubmit: SubmitHandler<LoginCredentials> = async data => {
    const toastId = toast.loading('Verificando informacion...');
    try {
      const res = await loginUser(data);

      if (session?.user) {
        return toast.success('Se ha ingresado correctamente', { id: toastId });
      }

      if (!res?.success && res?.errorType === 'auth') {
        toast.error('Email o contraseña incorrectos', { id: toastId });
        return setCredentialsError(true);
      }

      if (!res?.success) {
        toast.error('Error del servidor', { id: toastId });
        return setServerError(res!);
      }
    } catch (error) {
      console.log('in imcsisas'); // La taberna knows
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
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
              <li key={crypto.randomUUID()}>{error}</li>
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
      <Toaster
        toastOptions={{
          classNames: {
            title: 'lg:text-lg',
          },
        }}
      />
    </form>
  );
}
export default LoginEmailForm;
