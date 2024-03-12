'use client';

import { BarsIcon } from '@/components/icons/bars';
import NavUi from './nav-drawer/nav-ui';
import { useState } from 'react';
import { XIcon } from '@/components/icons/x-icon';
import { cn } from '@/core/client-utils';
import styles from '../page.module.css';

function AsideNav() {
  const [active, setActive] = useState(true);

  return (
    <aside
      className={cn(
        'hidden lg:block relative bg-black flex-col items-center transition-all',
        styles.asideArea,
        {
          'w-min': !active,
        },
      )}
    >
      <button
        className={cn('absolute text-white text-2xl right-3 top-2 z-40', {
          'relative inset-auto m-4 basis-0': !active,
        })}
        onClick={() => setActive(value => !value)}
      >
        {active ? <BarsIcon /> : <XIcon />}
      </button>
      <NavUi active={active} fixed />
    </aside>
  );
}
export default AsideNav;
