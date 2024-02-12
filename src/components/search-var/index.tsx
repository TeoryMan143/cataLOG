'use client';

import { Icon } from '@iconify/react';

function SearchBar() {
  return (
    <div className='relative flex-1 text-black'>
      <Icon
        icon='mingcute:search-3-line'
        className='absolute top-1/2 -translate-y-1/2 left-1'
      />
      <input className='w-full py-[2px] px-7 rounded-lg' />
      <Icon
        icon='maki:cross'
        className='absolute top-1/2 -translate-y-1/2 right-1'
      />
    </div>
  );
}
export default SearchBar;
