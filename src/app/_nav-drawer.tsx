'use client';

import { cn } from '@/core/utils';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

function NavDrawer() {
  const [active, setActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <button className='text-2xl' onClick={() => setActive(!active)}>
        <Icon icon='fa6-solid:bars' />
      </button>
      <div
        className={cn(
          `absolute w-screen h-screen bg-gray-500/45 hidden justify-end`,
          {
            flex: active,
          }
        )}
      >
        <nav
          ref={navRef}
          className={cn(`w-72 h-full bg-black/80 relative translate-x-full`, {
            'translate-x-0': active,
          })}
        >
          NavDrawer
        </nav>
      </div>
    </>
  );
}
export default NavDrawer;
