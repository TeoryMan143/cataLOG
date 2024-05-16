'use client';

import PasswordFillIcon from '@/components/icons/password-fill';
import PasswordRegularIcon from '@/components/icons/password-regular';
import Input from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type NewPassword, newPasswordSchema } from './schema';
import { Button } from '@/components/ui/button';

function RecoverPassForm({ email }: { email: string }) {
  const {
    register,
    formState: { isLoading, errors },
  } = useForm<NewPassword>({
    resolver: zodResolver(newPasswordSchema),
  });

  return (
    <form>
      <Input
        className='
          border-black 
          lg:border lg:focus:bg-amber-100 lg:bg-gray-300
        '
        {...register('password')}
        icon={<PasswordRegularIcon className='lg:text-black' />}
        placeholder='Contraseña Nueva'
        error={errors.password}
        type='password'
      />
      <Input
        className='
          border-black 
          lg:border lg:focus:bg-amber-100 lg:bg-gray-300
        '
        {...register('confirmPassword')}
        icon={<PasswordFillIcon className='lg:text-black' />}
        placeholder='Confirmar contraseña'
        error={errors.confirmPassword}
        type='password'
      />
      <div className='flex justify-center'>
        <Button disabled={isLoading}>Cambiar contraseña</Button>
      </div>
    </form>
  );
}
export default RecoverPassForm;
