'use client';

import { cn } from '@/core/utils';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithRef<'input'> {
  icon?: React.ReactElement<React.ComponentProps<'svg'>>;
  error?: FieldError;
}

const Input = forwardRef<null, Props>(function Input(
  { className, icon: Icon, error, ...props },
  ref
) {
  return (
    <div>
      <div className='relative'>
        <span
          className={cn(
            'absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-white z-10',
            {
              'text-red-600': error,
            }
          )}
        >
          {Icon}
        </span>
        <input
          className={cn(
            `
            w-72 bg-gray-300/55 py-2 text-center backdrop-blur-sm text-black
            placeholder:italic placeholder:text-slate-800 placeholder:tracking-widest placeholder:text-sm
            focus:backdrop-blur-none focus:bg-gray-500
            `,
            className
          )}
          {...props}
          ref={ref}
        />
      </div>
      {error && (
        <p className='bg-red-200 text-red-600 mt-1 text-center max-w-72 p-0.5'>
          {error.message}
        </p>
      )}
    </div>
  );
});

export default Input;
