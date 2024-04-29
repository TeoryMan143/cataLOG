'use server';

import { auth } from '@/core/auth';
import { db } from '@/core/db/config';
import {
  cartItems,
  orders,
  paymentItems,
  payments,
  products,
} from '@/core/db/tables';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export type OrderData = {
  orderId: string;
  status: 'pending' | 'sent' | 'arrived';
  sentAt: Date;
  delivery: boolean;
  displayName: string;
  price: number;
  amount: number;
  unit: 'u' | 'g' | 'lb' | 'kg' | 'ml' | 'l' | 'm';
  productId: string | null;
  businessId: string | null;
  itemId: string;
  address: string;
};

export async function getUserOrders() {
  const { user } = await auth();

  if (!user) redirect('/login');

  try {
    const ordersData = await db
      .selectDistinctOn([paymentItems.itemId], {
        orderId: orders.id,
        status: orders.status,
        sentAt: orders.sentAt,
        delivery: orders.delivery,
        displayName: cartItems.displayName,
        price: cartItems.price,
        amount: cartItems.amount,
        unit: cartItems.unit,
        productId: cartItems.productId,
        businessId: orders.businessId,
        itemId: paymentItems.itemId,
        address: orders.address,
      })
      .from(orders)
      .innerJoin(payments, eq(orders.paymentId, payments.id))
      .innerJoin(paymentItems, eq(paymentItems.paymentId, payments.id))
      .innerJoin(cartItems, eq(paymentItems.itemId, cartItems.id))
      .where(eq(orders.userId, user.id));

    return ordersData.length === 0 ? null : ordersData;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getBusinessOrders(businessId: string) {
  const { user } = await auth();

  if (!user) redirect('/login');

  try {
    const ordersData = await db
      .selectDistinctOn([paymentItems.itemId], {
        orderId: orders.id,
        status: orders.status,
        sentAt: orders.sentAt,
        delivery: orders.delivery,
        displayName: cartItems.displayName,
        price: cartItems.price,
        amount: cartItems.amount,
        unit: cartItems.unit,
        productId: cartItems.productId,
        businessId: orders.businessId,
        itemId: cartItems.id,
        address: orders.address,
      })
      .from(cartItems)
      .innerJoin(paymentItems, eq(cartItems.id, paymentItems.itemId))
      .innerJoin(orders, eq(paymentItems.paymentId, orders.paymentId))
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(
        and(
          eq(products.businessId, businessId),
          eq(orders.businessId, businessId),
        ),
      );

    return ordersData.length === 0 ? null : ordersData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
