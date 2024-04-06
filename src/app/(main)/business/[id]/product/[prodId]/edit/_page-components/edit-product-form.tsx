'use client';

import { ComboboxCategories } from './combobox';
import { DollarIcon } from '@/components/icons/dollar';
import { UserCircleIcon } from '@/components/icons/user-circle';
import Input from '@/components/input';
import Textarea from '@/components/textarea';
import { cn, extractDifference } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import Button from '@/components/button';
import { CTagIcon } from '@/components/icons/c-tag';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  type FormProduct,
  formProductSchema,
  DBProduct,
} from '@/core/schemas/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import UpDropzone from './up-dropzone';
import { type DBCategory } from '@/core/schemas/categories';
import UpImage from './up-image';
import { toast } from 'sonner';
import { editProduct } from '@/core/lib/products';
import { type ActionError } from '@/core/lib/types';
import { useRouter } from 'next/navigation';
import { UnitSelector } from '../../../../_page-components/unit-selector';
import { UnitValue } from '../../../../_page-components/unit-selector/data';
import NavDrawer from '@/app/_page-components/nav-drawer';

function EditProductForm({
  businessId,
  product,
  productCategories,
  productImages,
}: {
  businessId: string;
  product: DBProduct;
  productCategories: DBCategory[];
  productImages: string[];
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormProduct>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      price: product.price,
      avialableUnits: product.avialableUnits,
      displayName: product.displayName,
      description: product.description,
    },
  });

  const [images, setImages] = useState<string[]>(productImages);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [serverError, setServerError] = useState<ActionError | null>(null);
  const [categories, setCategories] = useState<string[]>(() => {
    return productCategories.map(c => c.id);
  });
  const [unit, setUnit] = useState(product.unit);

  const handleCategoriesChange = useCallback(
    (cats: DBCategory[]) => {
      setCategories(cats.map(cat => cat.id));
    },
    [setCategories],
  );

  const handleUnitChange = useCallback(
    (gUnit: UnitValue) => {
      setUnit(gUnit);
    },
    [setUnit],
  );

  const submitEditProduct: SubmitHandler<FormProduct> = async data => {
    const toastId = toast.loading('Cargando producto');

    if (images.length < 1) {
      return toast.error('Agrega al menos una imagen', { id: toastId });
    }

    const originalProduct = {
      ...product,
    };

    const newProductData = {
      ...data,
    };

    const productDiff = extractDifference(originalProduct, newProductData);

    const res = await editProduct(product.id, {
      ...productDiff,
      images,
      categories,
      deleteImages,
      businessId,
      unit,
    });

    if (!res.success) return setServerError(res);

    toast.success('Producto registrado', { id: toastId });
    router.push(`/business/${businessId}/product/${product.id}`);
  };

  return (
    <form onSubmit={handleSubmit(submitEditProduct)}>
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
              onDeleteClick={img => {
                setDeleteImages(prev => [...prev, img]);
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
            Editar producto
          </h1>
          <div className='flex gap-2 flex-wrap justify-center lg:flex-nowrap'>
            <Input
              className='
                border-black bg-gray-300 border focus:bg-amber-100 
              '
              boxClassName='grow'
              icon={<UserCircleIcon className='text-black' />}
              placeholder='Nombre de producto'
              error={errors.displayName}
              flexible
              {...register('displayName')}
            />
            <div className='flex grow'>
              <Input
                className='
                  border-black bg-gray-300 border focus:bg-amber-100 border-r-transparent
                '
                boxClassName='grow'
                icon={<DollarIcon className='text-black' />}
                placeholder='Precio'
                type='number'
                error={errors.price}
                flexible
                {...register('price', { valueAsNumber: true })}
              />
              <UnitSelector
                onUnitChange={handleUnitChange}
                initialValue={product.unit}
              />
            </div>
          </div>
          <Textarea
            className='focus:bg-amber-100'
            error={errors.description}
            placeholder='Descripción'
            {...register('description')}
          />
          <ComboboxCategories
            onCategoriesChange={handleCategoriesChange}
            initialSelected={[...productCategories]}
          />
          <div className='flex justify-center items-center gap-2'>
            <Input
              className='
                  border-black bg-gray-300 border focus:bg-amber-100 
                '
              icon={<CTagIcon className='text-black' />}
              placeholder='Unidades existentes'
              error={errors.avialableUnits}
              {...register('avialableUnits', { valueAsNumber: true })}
            />
            <p>{unit}</p>
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
          Editar
        </Button>
      </div>
    </form>
  );
}
export default EditProductForm;
