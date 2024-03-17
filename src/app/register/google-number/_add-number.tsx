'use client';

import PhoneIcon from '@/components/icons/phone';
import Input from '@/components/input';
import { Button } from '@/components/ui/button';
import { signUpWithGoogle } from '@/core/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const numberSchema = z.object({
  number: z
    .string({ required_error: 'Campo requerido' })
    .min(1, 'Ingresa un numero')
    .regex(
      new RegExp(`^3[0-9]{2}\\s?\\-?[0-9]{3}\\s?\\-?[0-9]{4}$`),
      'Ingresa un numero valido',
    ),
});

function AddNumber() {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof numberSchema>>({
    resolver: zodResolver(numberSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof numberSchema>> = async data => {
    const toastId = toast.loading('Cargando información');

    const res = await signUpWithGoogle(data.number);

    if (
      !res.success &&
      (res.errorType === 'token-validation' ||
        res.errorType === 'insertion' ||
        res.errorType === 'unknown')
    ) {
      setError('number', {
        message: res.errors[0],
      });
      return toast.error('Error del servidor', { id: toastId });
    }

    toast.success('Registrado correctamente', { id: toastId });
    router.replace('/');
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <Input
        className='
          border-black 
          lg:border lg:focus:bg-amber-100 lg:bg-gray-300
        '
        {...register('number', {
          onChange: event => {
            const { value } = event.target;
            const cleanedValue = value.replace(/[^\d\s-]/g, '');
            setValue('number', cleanedValue);
          },
        })}
        icon={<PhoneIcon className='lg:text-black' />}
        placeholder='Número de teléfono'
        error={errors.number}
      />
      <Button disabled={isSubmitting}>Añadir numero</Button>
    </form>
  );
}
export default AddNumber;
