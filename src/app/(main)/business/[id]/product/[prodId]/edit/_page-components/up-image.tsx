import { REMOTE_IMG_URL } from '@/core/client-utils';
import Image from 'next/image';

function UpImage({
  image,
  i,
  onDeleteClick,
}: {
  image: string;
  i: number;
  onDeleteClick?: (img: string) => void;
}) {
  return (
    <div
      className='
              relative group rounded-sm overflow-hidden size-[120px]
            '
    >
      <Image
        className='object-cover rounded-sm size-full'
        src={REMOTE_IMG_URL + image}
        width={120}
        height={120}
        alt={`Imagen producto ${i}`}
      />
      <div
        className='
          absolute size-full bottom-0 z-20 transition-colors
          group-hover:bg-slate-400/30
        '
      ></div>
      <button
        type='button'
        onClick={() => {
          if (onDeleteClick) {
            onDeleteClick(image);
          }
        }}
        className='
          absolute left-2 bottom-2 text-gray-600 translate-y-10 transition-transform z-30 text-3xl
          hover:text-red-400 group-hover:translate-y-0
        '
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M17 13H7v-2h10m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2'
          />
        </svg>
      </button>
    </div>
  );
}
export default UpImage;
