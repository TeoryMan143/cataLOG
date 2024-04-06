'use client';

import StarIcon from './icons/star';
import StarFilledIcon from './icons/star-filled';

type Props = {
  rating: number;
};

function ProductRating({ rating }: Props) {
  return (
    <div className='flex gap-2 text-4xl'>
      {Array.from({ length: 5 }).map((_, key) => {
        if (key <= rating) {
          return <StarFilledIcon className='text-amber-300' key={key} />;
        }

        return <StarIcon key={key} />;
      })}
    </div>
  );
}
export default ProductRating;
