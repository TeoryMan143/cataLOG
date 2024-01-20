import { cn } from '@/core/utils';

interface Props extends React.ComponentProps<'button'> {
  variant?: string;
  children: React.ReactNode;
}

function RegisterButton({ className, variant, children }: Props) {
  return (
    <button
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
