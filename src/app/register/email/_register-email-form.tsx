'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import Input from '@/components/input';
import Button from '@/components/button';
import { type FormUserSchema, formUserSchema } from '@/core/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResgisterInputs } from './_types';
import { resgisterUser } from '@/lib/auth';

function RegisterEmailForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormUserSchema>({
    resolver: zodResolver(formUserSchema),
  });

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
    },
    {
      name: 'password',
      icon: <Icon icon='fluent:password-20-regular' />,
      placeholder: 'Contraseña',
      error: errors.password,
      password: true,
    },
    {
      name: 'confirmPassword',
      icon: <Icon icon='fluent:password-20-filled' />,
      placeholder: 'Confirmar contraseña',
      error: errors.confirmPassword,
      password: true,
    },
  ];

  const onSubmit: SubmitHandler<FormUserSchema> = async data => {
    const res = await resgisterUser(data);
    console.log(res);
    reset();
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(({ icon: Icon, placeholder, error, name, password }) => (
        <Input
          {...register(name)}
          icon={Icon}
          placeholder={placeholder}
          key={crypto.randomUUID()}
          error={error}
          type={password ? 'password' : undefined}
        />
      ))}

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
    </form>
  );
}
export default RegisterEmailForm;
