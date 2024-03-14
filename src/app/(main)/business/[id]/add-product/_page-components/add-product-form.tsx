'use client';

import { ComboboxCategories } from '@/app/(main)/business/[id]/add-product/_page-components/combobox';
import { DollarIcon } from '@/components/icons/dollar';
import { UserCircleIcon } from '@/components/icons/user-circle';
import Input from '@/components/input';
import Textarea from '@/components/textarea';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import Button from '@/components/button';
import { CTagIcon } from '@/components/icons/c-tag';
import { SubmitHandler, useForm } from 'react-hook-form';
import { type FormProduct, formProductSchema } from '@/core/schemas/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import UpDropzone from './up-dropzone';
import { type DBCategory } from '@/core/schemas/categories';
import UpImage from './up-image';
import { deleteFileById } from '@/core/lib/files';
import { Toaster, toast } from 'sonner';
import { registerProduct } from '@/core/lib/products';
import { type ActionError } from '@/core/lib/types';
import { useRouter } from 'next/navigation';

function AddProductForm({ businessId }: { businessId: string }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormProduct>({
    resolver: zodResolver(formProductSchema),
  });

  const [images, setImages] = useState<string[]>([]);
  const [serverError, setServerError] = useState<ActionError | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoriesChange = useCallback(
    (cats: DBCategory[]) => {
      setCategories(cats.map(cat => cat.id));
    },
    [setCategories],
  );

  const router = useRouter();

  const submitProduct: SubmitHandler<FormProduct> = async data => {
    const toastId = toast.loading('Cargando producto');

    if (images.length < 1) {
      return toast.error('Agrega al menos una imagen', { id: toastId });
    }

    const res = await registerProduct({
      ...data,
      categories,
      businessId,
      images,
    });

    if (!res.success) return setServerError(res);

    toast.success('Producto registrado', { id: toastId });
    router.push(`/business/${businessId}`);
  };

  return (
    <form onSubmit={handleSubmit(submitProduct)}>
      <div
        className='
        flex gap-2 flex-col-reverse
        lg:flex-row
      '
      >
        <div
          className={cn({
            'p-1 grid grid-cols-[120px_120px] grid-rows-[repeat(3,auto)] gap-2 place-content-center lg:grid-cols-2':
              images.length > 0,
          })}
        >
          {images.map((image, i) => (
            <UpImage
              onDeleteClick={async () => {
                const res = await deleteFileById(image);
                if (!res) {
                  return toast.error('Error al eliminar la imagen');
                }
                setImages(prev => prev.toSpliced(i, 1));
              }}
              image={image}
              i={i + 1}
              key={image}
            />
          ))}
          <UpDropzone
            tiny={images.length > 0}
            onBeforeUploadBegin={files => {
              const filesCount = files.length + images.length;
              if (filesCount > 4) {
                toast.error('No mas de 4 imagenes');
                return [];
              }
              return files;
            }}
            onClientUploadComplete={files => {
              setImages(prev => [...prev, ...files.map(file => file.key)]);
            }}
            endpoint='addProduct'
          />
        </div>
        <div className='p-2 space-y-5 max-w-[600px]'>
          <h1
            className={cn('font-bold text-center text-4xl', workSans.className)}
          >
            Añadir nuevo producto
          </h1>
          <div className='flex gap-2 flex-wrap justify-center'>
            <Input
              className='
                border-black bg-gray-300 border focus:bg-amber-100 
              '
              icon={<UserCircleIcon className='text-black' />}
              placeholder='Nombre de producto'
              error={errors.displayName}
              {...register('displayName')}
            />
            <Input
              className='
                border-black bg-gray-300 border focus:bg-amber-100 
              '
              icon={<DollarIcon className='text-black' />}
              placeholder='Precio'
              type='number'
              error={errors.price}
              {...register('price', { valueAsNumber: true })}
            />
          </div>
          <Textarea
            className='focus:bg-amber-100'
            error={errors.description}
            {...register('description')}
          />
          <ComboboxCategories onCategoriesChange={handleCategoriesChange} />
          <div className='flex justify-center'>
            <Input
              className='
                  border-black bg-gray-300 border focus:bg-amber-100 
                '
              icon={<CTagIcon className='text-black' />}
              placeholder='Unidades existentes'
              error={errors.avialableUnits}
              {...register('avialableUnits', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      {serverError && (
        <div className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
          <p>Server error: {serverError.errorType}</p>
          <ul>
            {serverError.errors?.map(error => (
              <li key={crypto.randomUUID()}>{error.toString()}</li>
            ))}
          </ul>
        </div>
      )}

      <div className='flex justify-center mt-5'>
        <Button
          disabled={isSubmitting}
          className='bg-black text-white rounded-2xl px-12 py-1 text-lg'
        >
          Añadir
        </Button>
      </div>
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
export default AddProductForm;
