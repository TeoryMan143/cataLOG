'use server';

import { DrizzleError, eq } from 'drizzle-orm';
import { auth } from '../auth';
import { db } from '../db/config';
import { ActionResponse } from './types';
import { orders } from '../db/tables';
import { OrderStatus } from '../client-utils';
import { revalidatePath } from 'next/cache';

export async function editOrderStatus({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}): Promise<ActionResponse> {
  const { user } = await auth();

  if (!user) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Must be signed in to edit the order'],
    };
  }

  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        business: {
          columns: {
            accountId: true,
            name: true,
          },
        },
      },
    });

    if (!order) {
      return {
        success: false,
        errorType: 'insertion',
        errors: ['Order not found'],
      };
    }

    if (order.business?.accountId !== user.id) {
      console.log(order.id);
      return {
        success: false,
        errorType: 'auth',
        errors: ['Must be signed in to edit the order'],
      };
    }

    await db.update(orders).set({ status }).where(eq(orders.id, orderId));

    revalidatePath(`/business/${order.businessId}/orders`);

    return {
      success: true,
      result: undefined,
    };
  } catch (e: any) {
    console.error(e);
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
