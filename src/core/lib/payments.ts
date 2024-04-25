'use server';

import { Preference } from 'mercadopago';
import { ActionResponse } from './types';
import { mercadoConfig } from '../payment/config';
import { getUserCartItems } from './db/cart';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { redirect } from 'next/navigation';

export async function checkout(): Promise<ActionResponse> {
  const cartItems = await getUserCartItems();

  if (!cartItems) {
    return {
      success: false,
      errorType: 'insertion',
      errors: ['No item in shopping cart'],
    };
  }

  const items: Items[] = cartItems.map(
    ({ id, displayName, amount, price }) => ({
      id,
      title: displayName,
      quantity: amount,
      unit_price: price,
      currency_id: 'COP',
      description: displayName,
    }),
  );

  const pref = new Preference(mercadoConfig);

  const payment = await pref.create({
    body: {
      items,
      notification_url:
        'https://228d-181-118-157-130.ngrok-free.app/api/payment/webhook',
    },
    requestOptions: {
      idempotencyKey: process.env.MERCADO_PAGO_IDEMPOTENCY_KEY,
    },
  });

  if (!payment.init_point) {
    redirect(
      "/api/error?type=PaymentError&message=The payment couldn't be processed",
    );
  }

  redirect(payment.init_point);
}
