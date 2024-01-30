'use client';

import { out } from './hooks';

function SignOutButton() {
  return (
    <button className='py-2 px-4 bg-black text-white' onClick={() => out()}>
      Log Out
    </button>
  );
}
export default SignOutButton;
