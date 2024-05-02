import { BackIcon } from '@/components/icons/back';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import Link from 'next/link';
import EditBusinessForm from './_edit-business-form';
import { getBusinessById } from '@/core/lib/db/business';
import { RedirectType, redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

async function EditBisPage({ params: { id } }: Props) {
  const businessData = await getBusinessById(id);

  if (!businessData) {
    redirect('/business', RedirectType.replace);
  }

  return (
    <div
      className='
        flex flex-col gap-6 items-center justify-center relative overflow-y-auto py-12 h-full
        lg:px-32 lg:bg-white
      '
    >
      <Link
        className='
          text-white flex gap-2 absolute left-3 top-5 items-center transition-colors
          hover:text-amber-100
          lg:text-gray-800 lg:top-3
          lg:hover:text-amber-500
        '
        href={`/business/${id}`}
      >
        <BackIcon /> volver a {businessData.name}
      </Link>
      <h2
        className={cn(
          workSans.className,
          `
            font-bold text-3xl text-white mb-5 text-center
            lg:text-black lg:text-5xl lg:mb-8
          `,
        )}
      >
        Edita la información de tu negocio
      </h2>
      <EditBusinessForm businessData={businessData} />
      <Link
        href='/business'
        className='
          text-center mt-2 text-gray-100 underline
          hover:text-amber-100
          lg:text-black
          lg:hover:text-gray-600
        '
      >
        Ir a mis negocios
      </Link>
    </div>
  );
}
export default EditBisPage;
