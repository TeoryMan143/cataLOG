'use server';

import { DrizzleError, eq } from 'drizzle-orm';
import { db } from '../db/config';
import { cart, cartItems, products } from '../db/tables';
import { ActionResponse } from './types';
import { DBCartItem } from '../schemas/cart';
import { auth } from '../auth';
import { revalidatePath } from 'next/cache';

type AddCartItemsParams = { amount: number; productId: string };

export async function addCartItem({
  productId,
  amount,
}: AddCartItemsParams): Promise<ActionResponse<DBCartItem>> {
  const { user } = await auth();

  if (!user) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['must be signed in to access the cart'],
    };
  }

  try {
    const item = await db.query.cartItems.findFirst({
      where: eq(cartItems.productId, productId),
    });

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!product) {
      return {
        success: false,
        errorType: 'unknown',
        errors: ['no product found'],
      };
    }

    if (amount > product.avialableUnits) {
      return {
        success: false,
        errorType: 'unknown',
        errors: ['maximum amount exceeded'],
      };
    }

    if (!item) {
      const newItem = await db.transaction(async tr => {
        const itemRet = await tr
          .insert(cartItems)
          .values({
            displayName: product.displayName,
            amount: amount,
            price: product.price,
            unit: product.unit,
            productId: product.id,
          })
          .returning();

        const newItem = itemRet[0];

        await tr
          .insert(cart)
          .values({ accountId: user.id, itemId: newItem.id });
        return newItem;
      });

      return {
        success: true,
        result: newItem,
      };
    }

    const newItemData = await db
      .update(cartItems)
      .set({ amount })
      .where(eq(cartItems.id, item.id))
      .returning();

    revalidatePath('/cart');

    return {
      success: true,
      result: newItemData[0],
    };
  } catch (e: any) {
    if (e instanceof DrizzleError) {
      return {
        success: false,
        errorType: 'insertion',
        errors: [e.message],
      };
    }
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}

export async function removeCartItem(
  productId: string,
): Promise<ActionResponse<string>> {
  try {
    const item = await db.query.cartItems.findFirst({
      where: eq(cartItems.productId, productId),
    });

    if (!item) {
      return {
        success: false,
        errorType: 'unknown',
        errors: ['item not found'],
      };
    }

    await db.delete(cartItems).where(eq(cartItems.id, item.id));

    revalidatePath('/cart');

    return {
      success: true,
      result: item.id,
    };
  } catch (e: any) {
    if (e instanceof DrizzleError) {
      return {
        success: false,
        errorType: 'insertion',
        errors: [e.message],
      };
    }
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}
