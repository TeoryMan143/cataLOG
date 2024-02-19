'use client';

import { cn } from '@/core/client-utils';
import NavUi from './nav-ui';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

function NavDrawer() {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        className='text-2xl lg:hidden'
        onClick={() => setActive(value => !value)}
      >
        <Icon icon='fa6-solid:bars' />
      </button>
      <NavUi active={active} />
      <div
        className={cn('w-[100dvw] h-[100dvh] absolute hidden bottom-0', {
          block: active,
        })}
        onClick={() => setActive(false)}
      ></div>
    </>
  );
}
export default NavDrawer;
