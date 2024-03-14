'use server';

import { db } from '@/core/db/config';
import { products } from '@/core/db/tables';
import { count, eq } from 'drizzle-orm';

export async function getProductCount(businessId: string) {
  try {
    const items = await db
      .select({
        count: count(),
      })
      .from(products)
      .where(eq(products.businessId, businessId));
    return items[0].count;
  } catch (error) {
    console.error(error);
  }
}
