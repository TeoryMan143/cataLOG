'use client';

import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { forwardRef } from 'react';
import NavLinks from '../nav-links';
import { useSession } from '@/core/auth';
import { UserCircleIcon } from '@/components/icons/user-circle';

type Props = React.ComponentPropsWithRef<'div'> & {
  active: boolean;
  fixed?: boolean;
};

const NavUi = forwardRef<HTMLDivElement, Props>(function NavUi(
  { active, fixed },
  ref,
) {
  const { user } = useSession();

  if (!user) return <p>Error</p>;

  return (
    <div
      ref={ref}
      className={cn(
        `
          w-72 h-[100dvh] bg-black/80 absolute transition-all top-0 z-30 flex flex-col items-center gap-8 px-6 right-0 translate-x-full
          lg:bg-black lg:text-white
        `,
        {
          'translate-x-0 lg:relative': active || fixed,
        },
        {
          'lg:w-min flex-1 justify-center': fixed && !active,
        },
      )}
    >
      <div
        className={cn('relative flex flex-col items-center mt-20', {
          hidden: !active && fixed,
        })}
      >
        <UserCircleIcon className='text-[9rem]' />
        <p className={cn(`text-xl text-center`, workSans.className)}>
          {user?.name}
        </p>
      </div>
      <nav>
        <NavLinks active={active} />
      </nav>
    </div>
  );
});

export default NavUi;
