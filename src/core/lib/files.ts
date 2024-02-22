'use server';

import { utapi } from '../utapi';

export async function deleteFileById(id: string) {
  const result = await utapi.deleteFiles(id);
  return result;
}
