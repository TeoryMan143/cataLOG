'use client';

import { Icon } from '@iconify/react';
import Input from '@/components/input';
import Button from '@/components/button';

function RegisterEmailForm() {
  return (
    <form className='flex flex-col gap-3' onSubmit={e => e.preventDefault()}>
      <Input
        icon={<Icon icon='ph:user-circle-fill' />}
        placeholder='Nombre completo'
      />
      <Input
        icon={<Icon icon='uiw:mail' className='text-xl' />}
        placeholder='Correo electrónico'
      />
      <Input
        icon={<Icon icon='material-symbols:phone-android-outline-rounded' />}
        placeholder='Número de teléfono'
      />

      <Button
        variant='dark'
        type='submit'
        className='
          w-72 py-2 mt-5
          hover:bg-gray-900
        '
      >
        ¡Crear cuenta cataLOG!
      </Button>
    </form>
  );
}
export default RegisterEmailForm;
