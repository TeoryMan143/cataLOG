'use server';

import { db } from '@/core/db/config';
import { products } from '@/core/db/tables';
import { eq, sql } from 'drizzle-orm';

export async function getProductCount(businessId: string) {
  try {
    const items = await db
      .select({
        count: sql<number>`COUNT(${products.displayName})`,
      })
      .from(products)
      .where(eq(products.businessId, businessId));
    return items[0].count;
  } catch (error) {
    console.error(error);
  }
}
