'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import Options from './options';

function SearchBar() {
  const [debQuery, setQuery] = useDebounceValue('', 350);
  const router = useRouter();
  const path = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (path.startsWith('search')) {
      router.push(`/search?q=${debQuery}`);
    }
  }, [debQuery, router, path]);

  return (
    <search
      className='
        relative flex-1 text-black group
        lg:mx-48
      '
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        className='absolute top-1/2 -translate-y-1/2 left-1'
      >
        <g fill='none' fillRule='evenodd'>
          <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
          <path
            fill='currentColor'
            d='M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1'
          />
        </g>
      </svg>
      <input
        onKeyDownCapture={e => {
          if (e.key === 'Enter') {
            router.push(`/search?q=${debQuery}`);
          }
        }}
        onChange={e => setQuery(e.target.value)}
        className='w-full py-0.5 px-7 rounded-lg text-center peer'
        ref={inputRef}
      />
      <Options q={debQuery} />
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.blur();
            inputRef.current.value = '';
          }
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 15 15'
          className='absolute top-1/2 -translate-y-1/2 right-1'
        >
          <path
            fill='currentColor'
            d='M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27'
          />
        </svg>
      </button>
    </search>
  );
}
export default SearchBar;
