'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import Input from '@/components/input';
import Button from '@/components/button';
import { type FormUserSchema, formUserSchema } from '@/core/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResgisterInputs } from '../_types';
import { resgisterUser } from '@/lib/auth';
import { useState } from 'react';
import type { ActionResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

function RegisterEmailForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormUserSchema>({
    resolver: zodResolver(formUserSchema),
  });

  const router = useRouter();

  const [serverError, setServerError] = useState<ActionResponse<any> | null>(
    null
  );

  const inputs: ResgisterInputs[] = [
    {
      name: 'name',
      icon: <Icon icon='ph:user-circle-fill' />,
      placeholder: 'Nombre completo',
      error: errors.name,
    },
    {
      name: 'email',
      icon: <Icon icon='uiw:mail' className='text-xl' />,
      placeholder: 'Correo electrónico',
      error: errors.email,
    },
    {
      name: 'number',
      icon: <Icon icon='material-symbols:phone-android-outline-rounded' />,
      placeholder: 'Número de teléfono',
      error: errors.number,
      type: 'number',
    },
    {
      name: 'password',
      icon: <Icon icon='fluent:password-20-regular' />,
      placeholder: 'Contraseña',
      error: errors.password,
      type: 'password',
    },
    {
      name: 'confirmPassword',
      icon: <Icon icon='fluent:password-20-filled' />,
      placeholder: 'Confirmar contraseña',
      error: errors.confirmPassword,
      type: 'password',
    },
  ];

  const onSubmit: SubmitHandler<FormUserSchema> = async data => {
    const toastId = toast.loading('Registrando informacion...');

    const res = await resgisterUser(data);

    if (res.errorType === 'duplicated-email' && res.errors) {
      toast.error('Email duplicado', { id: toastId });
      return setError('email', { message: res.errors[0] });
    }

    if (!res.success) {
      toast.error('Error del servidor', { id: toastId });
      return setServerError(res);
    }

    toast.success('Registrado correctamente', { id: toastId });

    reset();
    router.push('/login');
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(({ icon: Icon, name, ...otherProps }) => (
        <Input
          {...register(name, { valueAsNumber: name === 'number' })}
          icon={Icon}
          key={crypto.randomUUID()}
          {...otherProps}
        />
      ))}

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
        ¡Crear cuenta cataLOG!
      </Button>
      <Toaster />
    </form>
  );
}
export default RegisterEmailForm;