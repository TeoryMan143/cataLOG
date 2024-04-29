'use server';

import { auth } from '@/core/auth';
import { db } from '@/core/db/config';
import { cartItems, orders, paymentItems, payments } from '@/core/db/tables';
import { eq } from 'drizzle-orm';

export async function getPaymentItems(mercadoPagoId: string) {
  const { user } = await auth();

  if (!user) {
    return null;
  }

  try {
    const payment = await db
      .selectDistinctOn([cartItems.id], {
        id: cartItems.id,
        displayName: cartItems.displayName,
        price: cartItems.price,
        unit: cartItems.unit,
        amount: cartItems.amount,
        productId: cartItems.productId,
        orderId: orders.id,
        userId: payments.userId,
      })
      .from(paymentItems)
      .innerJoin(payments, eq(paymentItems.paymentId, payments.id))
      .innerJoin(cartItems, eq(paymentItems.itemId, cartItems.id))
      .innerJoin(orders, eq(payments.id, orders.paymentId))
      .where(eq(payments.mercadoId, mercadoPagoId));

    if (payment[0].userId !== user.id) {
      return null;
    }

    return payment.length === 0 ? null : payment;
  } catch (e) {
    console.error(e);
    return null;
  }
}
