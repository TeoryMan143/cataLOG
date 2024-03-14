import { getBusinessById } from '@/core/lib/db/business';
import { RedirectType, redirect } from 'next/navigation';
import Image from 'next/image';
import { REMOTE_IMG_URL, cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import SocialLinks from './_page-components/social-links';
import Link from 'next/link';
import { PlusRoundedIcon } from '@/components/icons/plus-rounded';
import { EditIcon } from '@/components/icons/edit';
import AllProducts from './_page-components/products/all-products';
import { auth } from '@/core/auth';

type Props = {
  params: {
    id?: string;
  };
};

async function BusinessPage({ params: { id } }: Props) {
  if (!id) {
    redirect('/business', RedirectType.replace);
  }

  const business = await getBusinessById(id);

  if (!business) {
    redirect('/business', RedirectType.replace);
  }

  const { user } = await auth();

  if (user?.id !== business.accountId) {
    redirect('/business', RedirectType.replace);
  }

  const { banner, name, image } = business;

  return (
    <div className='p-6'>
      <header className='space-y-6'>
        <Image
          className='h-60 w-full object-cover rounded-lg'
          src={REMOTE_IMG_URL + banner}
          alt={`Banner ${name}`}
          height={240}
          width={1000}
        />
        <div className='flex gap-7 p-3'>
          <Image
            className='rounded-full ring-2 ring-offset-2 ring-black object-cover'
            src={REMOTE_IMG_URL + image}
            height={200}
            width={200}
            alt={`Icono ${name}`}
          />
          <div className='space-y-4'>
            <h3 className={cn('text-5xl font-bold', workSans.className)}>
              {name}
            </h3>
            <SocialLinks id={id} />
            <div className='flex gap-4'>
              <Link
                href={`/business/${id}/add-product`}
                className='
                  flex items-center gap-1 font-medium text-lg p-2 border-2 border-black transition
                  hover:bg-amber-100
                  active:scale-95
                '
              >
                <PlusRoundedIcon /> Añadir producto
              </Link>
              <Link
                href='/add-product'
                className='
                  flex items-center gap-1 font-medium text-lg p-2 border-2 border-black transition
                  hover:bg-amber-100
                  active:scale-95
                '
              >
                <EditIcon /> Editar negocio
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className='mt-2'>
        <h3
          className={cn(
            'py-3 bg-black rounded-sm text-white text-2xl text-center tracking-widest',
            workSans.className,
          )}
        >
          Catálogo
        </h3>
        <AllProducts businessId={id} />
      </section>
    </div>
  );
}
export default BusinessPage;
