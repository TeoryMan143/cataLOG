'use client';

import { EmailIcon } from '@/components/icons/mail';
import Input from '@/components/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { recoverPassword } from '@/core/lib/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().email();

function ForgotPassword() {
  const [inputValue, setInputValue] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendEmail = async () => {
    const toastId = toast.loading('Enviando...');

    if (inputValue === '') {
      return toast.error('Añade un correo', { id: toastId });
    }

    const result = emailSchema.safeParse(inputValue);

    if (!result.success) {
      return toast.error('Correo invalido', { id: toastId });
    }

    const res = await recoverPassword(result.data);

    if (!res.success) {
      return toast.error('Ha ucurrido un error enviando el correo', {
        id: toastId,
      });
    }

    setSent(true);
    toast.success('Correo de recuperación enviado', { id: toastId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='
            text-center text-gray-100 underline text-base
            hover:text-amber-100
            lg:text-black
            lg:hover:text-gray-600
          '
          type='button'
          variant='link'
        >
          Olvide mi contraseña
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn('mb-4 text-2xl text-center', workSans.className)}
          >
            {sent ? 'Revisa tu correo electrónico' : 'Escribe tu email'}
          </DialogTitle>
          <DialogDescription className='text-center'>
            Enviar correo de recuperación de contraseña
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async e => {
            e.preventDefault();
            await handleSendEmail();
          }}
          className='flex flex-col items-center gap-2'
        >
          {sent ? (
            <svg
              className='text-7xl text-black'
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='m18 8l-8 5l-8-5V6l8 5l8-5m0-2H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m6 3h-2v6h2zm0 8h-2v2h2z'
              />
            </svg>
          ) : (
            <>
              <Input
                icon={<EmailIcon className='text-black' />}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Correo electrónico'
              />
              <Button className='mt-4'>Enviar correo</Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default ForgotPassword;
