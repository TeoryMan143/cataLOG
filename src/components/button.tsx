import { cn } from '@/core/client-utils';
import { forwardRef } from 'react';

interface Props extends React.ComponentProps<'button'> {
  variant?: 'dark' | 'light';
  children: React.ReactNode;
  redirect?: string;
}

const RegisterButton = forwardRef<HTMLButtonElement, Props>(
  function RegisterButton(
    { className, variant, children, ...props }: Props,
    ref
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          'bg-white rounded-2xl py-1 active:scale-[.96] transition-transform duration-[40ms]',
          {
            'bg-black text-white': variant === 'dark',
          },
          className
        )}
      >
        {children}
      </button>
    );
  }
);
export default RegisterButton;
