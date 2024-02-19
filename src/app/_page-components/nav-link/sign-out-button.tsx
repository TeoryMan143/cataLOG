'use client';

import { cn } from '@/core/client-utils';
import { out } from './sign-out-action';
import style from './style.module.css';

function SignOutButton({ active }: { active?: boolean }) {
  return (
    <button
      className={cn(
        `flex text-center gap-2 text-white py-3 px-1 items-center relative`,
        style.underLineAnim
      )}
      onClick={() => out()}
    >
      <svg
        className='text-xl'
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9l-4-4m4 4l-4 4m4-4H9'
        />
      </svg>
      <span className={`flex-1 ${active ? '' : 'hidden'}`}>Cerrar sesión</span>
    </button>
  );
}
export default SignOutButton;
