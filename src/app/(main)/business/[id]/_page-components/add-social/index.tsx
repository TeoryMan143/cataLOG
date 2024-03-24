'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import AddSocialForm from './form';
import { useState } from 'react';

type Props =
  | { existing?: false; prevSocials?: undefined }
  | {
      existing: true;
      prevSocials: {
        instagram: string | null;
        facebook: string | null;
        webPage: string | null;
        whatsapp: string | null;
      };
    };

function AddSocial({ existing, prevSocials }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className='
          flex items-center gap-1 font-medium text-lg p-2 border-2 border-black transition
          hover:bg-amber-100
          active:scale-95
        '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M16.5 12c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2c0 .37-.03.73-.08 1.08c.69.1 1.33.32 1.92.64c.1-.56.16-1.13.16-1.72c0-5.5-4.5-10-10-10C6.47 2 2 6.5 2 12s4.5 10 10 10c.59 0 1.16-.06 1.72-.16A5.9 5.9 0 0 1 13 19c0-.29.03-.57.07-.85c-.32.63-.67 1.24-1.07 1.81c-.83-1.2-1.5-2.53-1.91-3.96h3.72a5.95 5.95 0 0 1 2.59-2.4c.06-.53.1-1.06.1-1.6M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m6.34 6H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25-9.56c1.84.63 3.37 1.9 4.33 3.56h-2.95a15.65 15.65 0 0 0-1.38-3.56M23 18v2h-3v3h-2v-3h-3v-2h3v-3h2v3z'
            />
          </svg>{' '}
          {existing ? 'Editar redes sociales' : 'Añadir redes sociales'}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn('text-2xl text-center', workSans.className)}
          >
            Añade las redes sociales de tu negocio
          </DialogTitle>
        </DialogHeader>
        <AddSocialForm setDialogOpen={setOpen} prevSocials={prevSocials} />
      </DialogContent>
    </Dialog>
  );
}
export default AddSocial;
