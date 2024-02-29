import { db } from '@/core/db/config';
import { productImages, products as productsTable } from '@/core/db/tables';
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
