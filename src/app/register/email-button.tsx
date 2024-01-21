import { cn } from '@/core/utils';
import Link from 'next/link';

interface Props extends React.ComponentProps<typeof Link> {
  variant?: string;
  children: React.ReactNode;
  redirect?: string;
}

function EmailButton({ className, variant, children, ...props }: Props) {
  return (
    <Link
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
    </Link>
  );
}
export default EmailButton;
