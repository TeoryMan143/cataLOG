'use server';

import bcrypt from 'bcrypt';
import { UTApi } from 'uploadthing/server';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, await bcrypt.genSalt());
}
