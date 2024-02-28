'use server';

import { db } from '@/core/db/config';
import { categories } from '@/core/db/tables';

export async function getCategories() {
  try {
    const res = await db.select().from(categories);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
