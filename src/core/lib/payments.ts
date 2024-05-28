'use server';

import { Preference } from 'mercadopago';
import { ActionResponse } from './types';
import { mercadoConfig } from '../payment/config';
import { getUserCartItems } from './db/cart';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { redirect } from 'next/navigation';
import { auth } from '../auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const WEBHOOK_URL =
  process.env.VERCEL_ENV === 'development'
    ? 'https://3afb-186-168-216-106.ngrok-free.app'
    : BASE_URL;

export type PaymentMetadata = {
  items: string[];
  user_id: string;
  address: string;
};

export async function checkout(address: string): Promise<ActionResponse> {
  const { user } = await auth();

  if (!user) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Must be signed in to perform a purchase'],
    };
  }

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
      notification_url: `${WEBHOOK_URL}/api/payment/webhook`,
      back_urls: {
        success: `${BASE_URL}/pay/success`,
        failure: `${BASE_URL}/pay/failure`,
      },
      metadata: {
        items: cartItems.map(i => i.id),
        user_id: user.id,
        address,
      } satisfies PaymentMetadata,
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
