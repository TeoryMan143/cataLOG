'use client';

import { cn } from '@/core/client-utils';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import NavLinks from './nav-links';
import { workSans } from '@/core/fonts';

function NavDrawer() {
  const [active, setActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener('click', e => {
      if (
        active &&
        !navRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setActive(false);
      }
    });
  });

  const { data: session } = useSession();

  if (!session) return <p>Error</p>;

  const user = session.user;

  return (
    <>
      <button
        ref={buttonRef}
        className='text-2xl'
        onClick={() => setActive(value => !value)}
      >
        <Icon icon='fa6-solid:bars' />
      </button>
      <div
        ref={navRef}
        className={cn(
          `w-72 h-[100dvh] bg-black/80 absolute -right-full transition-[right] top-0 z-30 flex flex-col items-center gap-8 px-6`,
          {
            '-right-0': active,
          }
        )}
      >
        <div className='relative flex flex-col items-center mt-20'>
          <Icon icon='ph:user-circle-fill' className='text-[9rem]' />
          <p className={cn(`text-xl`, workSans.className)}>{user?.name}</p>
        </div>
        <nav>
          <NavLinks />
        </nav>
      </div>
    </>
  );
}
export default NavDrawer;
