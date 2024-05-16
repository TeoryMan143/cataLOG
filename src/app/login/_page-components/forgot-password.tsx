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
    if (inputValue === '') {
      return toast.error('Añade un correo');
    }

    const result = emailSchema.safeParse(inputValue);

    if (!result.success) {
      return toast.error('Correo invalido');
    }

    const res = await recoverPassword(result.data);

    if (!res.success) {
      return toast.error('Ha ucurrido un error enviando el correo');
    }

    setSent(true);
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
            Escribe tu email
          </DialogTitle>
          <DialogDescription className='text-center'>
            Enviar correo de recuperación de contraseña
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-2'>
          <Input
            icon={<EmailIcon className='text-black' />}
            onChange={e => setInputValue(e.target.value)}
            placeholder='Correo electrónico'
          />
          <Button className='mt-4' onClick={handleSendEmail}>
            Enviar correo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ForgotPassword;
