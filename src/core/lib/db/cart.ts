'use server';

import { auth } from '@/core/auth';
import { db } from '@/core/db/config';
import { cart, cartItems, users } from '@/core/db/tables';
import { DBCartItem } from '@/core/schemas/cart';
import { and, eq } from 'drizzle-orm';

export async function getUserCartItems(): Promise<DBCartItem[] | null> {
  const { user } = await auth();

  if (!user) {
    throw new Error('Must be signed in to access the cart');
  }

  try {
    const itemIds = await db.query.cart.findMany({
      where: eq(cart.accountId, user.id),
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

export async function getProductItem(
  productId: string,
): Promise<DBCartItem | null> {
  const { user } = await auth();

  if (!user) {
    throw new Error('Must be signed in to access the cart');
  }

  try {
    const cartRet = await db
      .select({
        id: cartItems.id,
        displayName: cartItems.displayName,
        price: cartItems.price,
        unit: cartItems.unit,
        amount: cartItems.amount,
        productId: cartItems.productId,
      })
      .from(cartItems)
      .innerJoin(cart, eq(cartItems.id, cart.itemId))
      .where(
        and(eq(cart.accountId, user.id), eq(cartItems.productId, productId)),
      );
    return cartRet[0] ?? null;
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}
