import { REMOTE_IMG_URL, cn, formatToCOP } from '@/core/client-utils';
import { DBBusiness } from '@/core/schemas/business';
import Image from 'next/image';
import Link from 'next/link';

function SearchBusinesses({
  business: { id, name, image, address },
}: {
  business: DBBusiness;
}) {
  return (
    <Link className='flex gap-1 hover:bg-amber-50' href={`/v?p=${id}`}>
      <div
        className='
          size-20 p-2 overflow-hidden
          lg:size-[150px]
        '
      >
        <Image
          className='size-[70px] lg:size-[200px] object-cover rounded-sm'
          src={REMOTE_IMG_URL + image}
          alt='business icon'
          height={200}
          width={200}
        />
      </div>
      <div className='space-y-2 flex-1'>
        <h2 className='font-bold truncate'>{name}</h2>
        <div className='flex gap-2'>
          <p>{address}</p>
        </div>
      </div>
    </Link>
  );
}
export default SearchBusinesses;
