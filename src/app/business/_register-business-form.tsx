'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { loginUser } from '@/core/lib/auth';
import type { ActionResponse } from '@/core/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { FormBusiness, formBusinessSchema } from '@/core/schemas/business';

function RegisterBusinessForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormBusiness>({
    resolver: zodResolver(formBusinessSchema),
  });

  const [serverError, setServerError] = useState<ActionResponse<any> | null>(
    null
  );

  const onSubmit: SubmitHandler<FormBusiness> = async data => {
    //TODO: Submit business
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <Input
        className='
          border-black 
          lg:border lg:focus:bg-amber-100 lg:bg-gray-300
        '
        placeholder='Nombre de la empresa'
        icon={<Icon icon='ph:user-circle-fill' className='lg:text-black' />}
        {...register('name')}
        error={errors.name}
      />
      <Input
        className='
            border-black 
            lg:border lg:focus:bg-amber-100 lg:bg-gray-300
          '
        placeholder='NIT'
        icon={<Icon icon='f7:number' className='lg:text-black' />}
        type='password'
        {...register('nit')}
        error={errors.nit}
      />
      <Input
        className='
          border-black 
          lg:border lg:focus:bg-amber-100 lg:bg-gray-300
        '
        placeholder='Dirección'
        icon={
          <Icon
            icon='mdi:map-marker-radius-outline'
            className='lg:text-black'
          />
        }
        type='password'
        {...register('address')}
        error={errors.address}
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
        Registrar
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
export default RegisterBusinessForm;
