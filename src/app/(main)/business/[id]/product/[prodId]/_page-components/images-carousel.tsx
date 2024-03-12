import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { REMOTE_IMG_URL } from '@/core/client-utils';
import Image from 'next/image';

function ImagesCarousel({ images }: { images: string[] }) {
  return (
    <Carousel className='bg-[#F4F1EE] border-2 border-[#C8C1C1] rounded-md p-5 max-w-[410px] relative group'>
      <CarouselContent className='flex items-center'>
        {images.map(image => (
          <CarouselItem key={image}>
            <Image
              className='size-[400px] object-cover rounded-sm'
              height={400}
              width={400}
              src={REMOTE_IMG_URL + image}
              alt='Portada producto'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className='
        top-1/2 -translate-y-1/2 opacity-0 transition bg-transparent border-black left-3
        group-hover:opacity-100 disabled:opacity-0 group-hover:disabled:opacity-50
      '
      />
      <CarouselNext
        className='
        top-1/2 -translate-y-1/2 opacity-0 transition bg-transparent border-black right-3
        group-hover:opacity-100 disabled:opacity-0 group-hover:disabled:opacity-50
      '
      />
    </Carousel>
  );
}
export default ImagesCarousel;
