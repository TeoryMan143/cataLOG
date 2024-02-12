'use client';

import { Icon } from '@iconify/react';

function NavDrawer() {
  return (
    <>
      <button className='text-2xl'>
        <Icon icon='fa6-solid:bars' />
      </button>
      <nav className='hidden'>NavDrawer</nav>
    </>
  );
}
export default NavDrawer;
