'use server';

import { signOut } from '../../../../auth';

export const out = async () => {
  await signOut();
};
