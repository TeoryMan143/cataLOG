'use server';

import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, await bcrypt.genSalt());
}
