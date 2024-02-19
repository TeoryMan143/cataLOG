import { cn } from '@/core/client-utils';
import Link from 'next/link';
import style from './style.module.css';

type Props = React.ComponentPropsWithoutRef<typeof Link> & {
  icon?: React.ReactNode;
};

function NavLink({ className, children, icon, ...props }: Props) {
  return (
    <Link
      className={cn(
        `flex text-center gap-2 text-white py-3 px-1 items-center relative`,
        className,
        style.underLineAnim
      )}
      {...props}
    >
      {icon}
      {children && <span className='flex-1'>{children}</span>}
    </Link>
  );
}
export default NavLink;
