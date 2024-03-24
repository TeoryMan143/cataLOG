'use client';

import FacebookIcon from '@/components/icons/facebook';
import InstagramIcon from '@/components/icons/instagram';
import WebIcon from '@/components/icons/web';
import WhatsappIcon from '@/components/icons/whatsapp';
import Input from '@/components/input';
import { Button } from '@/components/ui/button';
import {
  type FormBusinessSocial,
  formBusinessSocialSchema,
} from '@/core/schemas/business-social';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import mapVals from 'just-map-values';
import { toast } from 'sonner';
import { uploadSocials } from '@/core/lib/business-social';
import { useParams, useSearchParams } from 'next/navigation';
import { ActionError } from '@/core/lib/types';
import { Dispatch, SetStateAction, useState } from 'react';

function CheckURL({
  href,
  typeFor,
}: {
  href: string;
  typeFor: keyof FormBusinessSocial;
}) {
  const { getValues } = useFormContext<FormBusinessSocial>();

  return (
    <Button
      className='flex justify-center items-center gap-1'
      onClick={() => {
        const value = getValues(typeFor);
        window.open(href + value, '_blank');
      }}
      type='button'
      variant='outline'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 12 12'
      >
        <path
          fill='currentColor'
          d='M4 3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7a.5.5 0 0 1 1 0v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1a.5.5 0 0 1 0 1zm3 0a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .5.5V5a.5.5 0 0 1-1 0V3.707L7.354 5.354a.5.5 0 1 1-.708-.708L8.293 3z'
        />
      </svg>{' '}
      Verificar
    </Button>
  );
}

function AddSocialForm({
  setDialogOpen,
  prevSocials,
}: {
  setDialogOpen: (open: boolean) => void;
  prevSocials?: {
    instagram: string | null;
    facebook: string | null;
    webPage: string | null;
    whatsapp: string | null;
  };
}) {
  const methods = useForm<FormBusinessSocial>({
    resolver: zodResolver(formBusinessSocialSchema),
    defaultValues: {
      facebook: prevSocials?.facebook ?? '',
      instagram: prevSocials?.instagram ?? '',
      webPage: prevSocials?.webPage ?? '',
      whatsapp: prevSocials?.whatsapp ?? '',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const [serverError, setServerError] = useState<ActionError | null>(null);

  const params = useParams();

  const onSubmit: SubmitHandler<FormBusinessSocial> = async data => {
    const toastId = toast.loading('Subiendo información');

    const businessId = params.id as string | undefined;

    if (!businessId) {
      return toast.error('Negocio no encontrado', { id: toastId });
    }

    const socials = mapVals(data, val => {
      if (val.length === 0) {
        return null;
      }
      return val;
    }) as {
      instagram: string | null;
      facebook: string | null;
      webPage: string | null;
      whatsapp: string | null;
    };

    const res = await uploadSocials({ ...socials, businessId });

    if (!res.success && res.errorType === 'validation') {
      toast.error('Error del servidor', { id: toastId });
      return setServerError(res);
    }

    if (!res.success) {
      toast.error('Error del servidor', { id: toastId });
      return setServerError(res);
    }

    toast.success('Registrado correctamente', { id: toastId });
    setDialogOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        className='flex flex-col gap-2 justify-center items-center px-7'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex gap-3'>
          <Input
            boxClassName='rounded-sm overflow-hidden'
            icon={<InstagramIcon />}
            error={errors.instagram}
            {...register('instagram')}
          />
          <CheckURL href='https://www.instagram.com/' typeFor='instagram' />
        </div>
        <div className='flex gap-3'>
          <Input
            boxClassName='rounded-sm overflow-hidden'
            icon={<FacebookIcon />}
            error={errors.facebook}
            {...register('facebook')}
          />
          <CheckURL href='https://www.facebook.com/' typeFor='facebook' />
        </div>
        <div className='flex gap-3'>
          <Input
            boxClassName='rounded-sm overflow-hidden'
            icon={<WebIcon className='text-black' />}
            error={errors.webPage}
            {...register('webPage')}
          />
          <CheckURL href='' typeFor='webPage' />
        </div>
        <Input
          boxClassName='w-full rounded-sm overflow-hidden'
          icon={<WhatsappIcon />}
          error={errors.whatsapp}
          flexible
          {...register('whatsapp', {
            onChange: event => {
              const { value } = event.target;
              const cleanedValue = value.replace(/[^\d\s-]/g, '');
              setValue('whatsapp', cleanedValue);
            },
          })}
        />
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
        <p className='text-black my-5 text-sm font-bold'>
          Los campos vacíos serán omitidos
        </p>
        <Button disabled={isSubmitting}>Confirmar</Button>
      </form>
    </FormProvider>
  );
}
export default AddSocialForm;
