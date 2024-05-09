import { DBBusiness } from '@/core/schemas/business';
import Image from 'next/image';
import Link from 'next/link';
import { getProductCount } from '../_actions';
import { REMOTE_IMG_URL } from '@/core/client-utils';

async function BusinessListPre({
  business: { name, image, id },
}: {
  business: DBBusiness;
}) {
  const items = await getProductCount(id);

  return (
    <Link
      href={`/business/${id}/catalog`}
      className='
      flex p-8 border border-black gap-12 shadow-md rounded-lg
      hover:bg-amber-100
    '
    >
      <Image
        className='size-[150px] rounded-full ring-2 ring-offset-2 ring-black object-cover'
        src={REMOTE_IMG_URL + image}
        height={150}
        width={150}
        alt={`Icono ${name}`}
      ></Image>
      <div className='space-y-4'>
        <h3
          className='
          text-3xl font-bold
          lg:text-5xl
        '
        >
          {name}
        </h3>
        <p>Productos añadidos: {items}</p>
      </div>
    </Link>
  );
}
export default BusinessListPre;
