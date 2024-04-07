'use client';

import { DeleteIcon } from '@/components/icons/delete';
import { XIcon } from '@/components/icons/x-icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteProductById } from '@/core/lib/db/products';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function DeleteProduct({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (done) {
      router.replace(`/business/${params.id}`);
    }
  }, [done, router, params.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='
          space-x-2 text-lg bg-red-600 transition
          hover:bg-red-500
          active:scale-95
        '
        >
          <DeleteIcon /> <span>Eliminar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar producto</DialogTitle>
          <DialogDescription>
            Esto eliminará el producto de tu catálogo permanentemente.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-evenly'>
          <Button
            className='
            space-x-2 text-lg bg-red-600 transition
            hover:bg-red-500
            active:scale-95
          '
            onClick={async () => {
              setIsLoading(true);
              const success = await deleteProductById(productId);
              setDone(!!success);
              setIsLoading(false);
            }}
          >
            {isLoading ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                viewBox='0 0 24 24'
                className='animate-spin-clockwise'
              >
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 3a9 9 0 1 0 9 9'
                />
              </svg>
            ) : (
              <>
                <DeleteIcon /> <span>Eliminar</span>
              </>
            )}
          </Button>
          <DialogClose asChild>
            <Button
              className='
              space-x-2 text-lg transition
              active:scale-95
              '
              variant='outline'
            >
              <XIcon /> <span>Cancelar</span>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteProduct;
