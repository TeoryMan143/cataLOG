import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { mercadoConfig } from '@/core/payment/config';
import { db } from '@/core/db/config';
import {
  cart,
  cartItems,
  orders,
  paymentItems,
  payments,
} from '@/core/db/tables';
import { eq } from 'drizzle-orm';
import type { PaymentMetadata } from '@/core/lib/payments';

export async function POST(req: NextRequest) {
  const params = new URL(req.nextUrl).searchParams;

  const paymentId = params.get('data.id');

  if (!paymentId) return NextResponse.json({ success: false });

  const paymentController = new Payment(mercadoConfig);

  const payment = await paymentController.get({ id: paymentId });

  if (payment.status === 'rejected') {
    return NextResponse.json({ success: false });
  }

  const {
    items,
    user_id: userId,
    address,
  } = payment.metadata as PaymentMetadata;

  try {
    const txRes = await db.transaction(async tx => {
      const [newPayment] = await tx
        .insert(payments)
        .values({ userId, mercadoId: paymentId })
        .returning();

      if (!newPayment) {
        tx.rollback();
      }
      await tx
        .insert(paymentItems)
        .values(items.map(itemId => ({ paymentId: newPayment.id, itemId })));

      for (let itemId of items) {
        const itemData = await tx.query.cartItems.findFirst({
          columns: {
            id: true,
          },
          where: eq(cartItems.id, itemId),
          with: {
            product: {
              columns: {
                id: true,
              },
              with: {
                business: {
                  columns: {
                    id: true,
                  },
                },
              },
            },
          },
        });

        const businessId = itemData?.product?.business.id;

        if (!businessId) tx.rollback();

        await tx.insert(orders).values({
          paymentId: newPayment.id,
          userId,
          businessId,
          address,
          itemId,
        });
      }

      await tx.delete(cart).where(eq(cart.accountId, userId));
      return true;
    });

    console.log(txRes);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
