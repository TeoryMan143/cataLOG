import { cn } from '@/core/client-utils';

function LoadingSpin({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      className={cn('animate-spin-clockwise', className)}
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M12 3a9 9 0 1 0 9 9'
      />
    </svg>
  );
}
export default LoadingSpin;
