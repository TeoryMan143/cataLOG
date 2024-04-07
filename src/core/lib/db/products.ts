'use server';

import { db } from '@/core/db/config';
import {
  productImages,
  products,
  products as productsTable,
} from '@/core/db/tables';
import { eq } from 'drizzle-orm';

export async function getBusinessProducts(businessId: string) {
  try {
    const products = await db.query.products.findMany({
      where: eq(productsTable.businessId, businessId),
    });
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductImages(productId: string) {
  try {
    const images = await db.query.productImages.findMany({
      where: eq(productImages.productId, productId),
    });
    return images;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductByIdWithImages(productId: string) {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
      with: {
        images: true,
      },
    });
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteProductById(productId: string) {
  try {
    const success = await db
      .delete(products)
      .where(eq(products.id, productId))
      .returning();
    return success;
  } catch (error) {
    console.error(error);
    return null;
  }
}
