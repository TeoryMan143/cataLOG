import { cn } from '@/core/client-utils';

interface Props extends React.ComponentProps<'button'> {
  variant?: 'dark' | 'light';
  children: React.ReactNode;
  redirect?: string;
}

function RegisterButton({ className, variant, children, ...props }: Props) {
  return (
    <button
      {...props}
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
export default RegisterButton;
