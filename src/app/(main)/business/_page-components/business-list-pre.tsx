import { DBBusiness } from '@/core/schemas/business';
import Image from 'next/image';
import Link from 'next/link';
import { getProductCount } from '../_actions';
import { REMOTE_IMG_URL } from '@/core/client-utils';

type Props = {
  business: DBBusiness;
};

async function BusinessListPre({ business: { name, image, id } }: Props) {
  const items = await getProductCount(id);

  return (
    <Link
      href={`/business/${id}`}
      className='
      flex p-5 border border-black gap-3 shadow-md 
      hover:bg-amber-100
    '
    >
      <Image
        src={REMOTE_IMG_URL + image}
        height={170}
        width={170}
        alt='Icono {name}'
      ></Image>
      <div>
        <h3 className='text-5xl'>{name}</h3>
        <p>Productos añadidos: {items}</p>
      </div>
    </Link>
  );
}
export default BusinessListPre;
