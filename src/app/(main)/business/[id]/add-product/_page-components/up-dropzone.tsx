import UploadDropzone from '@/components/upload-dropzone';
import { cn } from '@/core/client-utils';
import React from 'react';

type Props = {
  tiny: boolean;
} & React.ComponentPropsWithoutRef<typeof UploadDropzone>;

function UpDropzone({ tiny, ...props }: Props) {
  return (
    <UploadDropzone
      className='h-full ut-uploading:animate-pulse animate-duration-900 cursor-pointer'
      appearance={{
        container: cn('border-[#C8C1C1] border-2 sm:py-6 text-black group', {
          'size-[120px] p-0': tiny,
        }),
        label: cn(
          `
          text-lg text-black transition-colors max-w-full
          group-hover:text-amber-500
        `,
          {
            'text-xs': tiny,
          },
        ),
        allowedContent: cn('text-base text-[#a39696]', {
          hidden: tiny,
        }),
        button: `
          bg-black rounded-sm py-1 px-3 mt-2
          after:bg-amber-600
        `,
      }}
      content={{
        uploadIcon: (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
            className='transition-colors text-6xl group-hover:text-amber-500'
          >
            <g
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            >
              <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 2h6m-3-3v6' />
              <circle cx='9' cy='9' r='2' />
              <path d='m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
            </g>
          </svg>
        ),
        label: 'Escoge imágenes o arrastralas',
        allowedContent: 'Imagenes de hasta 8MB, máximo 4',
        button: 'Subir archivos',
      }}
      {...props}
    />
  );
}
export default UpDropzone;
