'use server';

import { signOut } from '@/core/lib/auth';
import { redirect } from 'next/navigation';

export const out = async () => {
  await signOut();
  redirect('/');
};
