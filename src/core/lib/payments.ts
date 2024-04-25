'use server';

import { Preference } from 'mercadopago';
import { ActionResponse } from './types';
import { mercadoConfig } from '../payment/config';
import { getUserCartItems } from './db/cart';
import { Items } from 'mercadopago/dist/clients/commonTypes';

export async function checkout(): Promise<ActionResponse<any>> {
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
    }),
  );

  const pref = new Preference(mercadoConfig);

  const payment = await pref.create({
    body: {
      items,
      notification_url: 'http://localhost:3000/api/webhook',
    },
    requestOptions: {
      idempotencyKey: process.env.MERCADO_PAGO_IDEMPOTENCY_KEY,
    },
  });

  console.log(payment);

  return {
    success: true,
    result: 'Sisas',
  };
}
