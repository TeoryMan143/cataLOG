'use client';

import { cn } from '@/core/client-utils';
import { forwardRef, useMemo, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { Icon as SvgIcon } from '@iconify/react';

interface Props extends React.ComponentPropsWithRef<'input'> {
  icon?: React.ReactNode;
  error?: FieldError;
}

const showType = ({
  isPassword,
  type,
  show,
}: {
  isPassword: boolean;
  type: React.HTMLInputTypeAttribute;
  show: boolean;
}) => {
  if (!isPassword) return type;

  if (show) return 'text';

  return type;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, icon: Icon, error, type, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const show = useMemo(
    () =>
      showType({
        isPassword: type === 'password',
        type: type ?? 'text',
        show: showPassword,
      }),
    [showPassword, type]
  );

  return (
    <div>
      <div className='relative w-72 bg-gray-300/55 flex group overflow-hidden'>
        <span
          className={cn(
            'absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-white z-10',
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
              ml-16 py-2 text-center backdrop-blur-sm text-black flex-1 bg-transparent w-full
              placeholder:italic placeholder:text-slate-800 placeholder:tracking-widest placeholder:text-sm
              focus:backdrop-blur-none focus:bg-gray-500
            `,
            className
          )}
          ref={ref}
          type={show}
          {...props}
        />

        {type === 'password' && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='
              text-black text-lg absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 transition 
              group-hover:opacity-100 group-hover:-translate-x-8
            '
          >
            {!showPassword ? (
              <SvgIcon icon='mdi:eye-outline' />
            ) : (
              <SvgIcon icon='mdi:eye-off-outline' />
            )}
          </button>
        )}
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
