'use client';

import { cn } from '@/core/client-utils';
import NavUi from './nav-ui';
import { useState } from 'react';

function NavDrawer() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        className='text-2xl lg:hidden'
        onClick={() => setActive(value => !value)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='0.88em'
          height='1em'
          viewBox='0 0 448 512'
        >
          <path
            fill='currentColor'
            d='M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32'
          />
        </svg>
      </button>
      <NavUi active={active} />
      <div
        className={cn('w-[100dvw] h-[100dvh] absolute hidden bottom-0 z-20', {
          block: active,
        })}
        onClick={() => setActive(false)}
      ></div>
    </>
  );
}
export default NavDrawer;
