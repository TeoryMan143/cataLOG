'use server';

import { signOut } from '@/core/lib/auth';

export const out = async () => {
  await signOut();
};
