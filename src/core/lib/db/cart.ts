'use server';

import { db } from '@/core/db/config';
import { users } from '@/core/db/tables';
import { DBCartItem } from '@/core/schemas/cart';
import { eq } from 'drizzle-orm';

export async function getUserCartItems(
  userId: string,
): Promise<DBCartItem[] | null> {
  try {
    const itemIds = await db.query.cart.findMany({
      where: eq(users.id, userId),
      with: {
        item: true,
      },
      columns: {
        itemId: false,
        accountId: false,
      },
    });
    return itemIds.map(i => i.item);
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}
