'use client';

import { UserCircleIcon } from '@/components/icons/user-circle';
import Input from '@/components/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteBusiness } from '@/core/lib/business';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

function DeleteButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState('');

  const valid = useMemo(() => inputName === name, [inputName, name]);

  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='destructive'>Eliminar Negocio</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estas seguro?</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center gap-3'>
          <div className='space-y-2'>
            <p className='text-center'>
              Escribe <strong>{name}</strong> para eliminar
            </p>
            <Input
              className='border-black border'
              icon={<UserCircleIcon className='text-black' />}
              onChange={e => setInputName(e.target.value)}
            />
          </div>
          <div className='flex justify-center gap-3'>
            <Button
              disabled={!valid}
              variant='destructive'
              onClick={async () => {
                const toastId = toast.loading('Eliminando');
                const res = await deleteBusiness(id, name);

                if (!res.success) {
                  return toast.error('No se pudo eliminar', { id: toastId });
                }

                toast.success('Se eliminó correctamemte', { id: toastId });

                router.replace('/business');
              }}
            >
              Eliminar
            </Button>
            <Button onClick={() => setOpen(false)} variant='outline'>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteButton;
