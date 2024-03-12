'use server';

import { db } from '@/core/db/config';
import { categories } from '@/core/db/tables';

export const getCategories = async () => {
  try {
    const res = await db.select().from(categories);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getProductCategories(productId: string) {
  try {
    const res = await db.query.productsCategories.findMany({
      where: (prodCat, { eq }) => eq(prodCat.productId, productId),
      with: {
        category: true,
      },
    });
    return res.map(prodCat => prodCat.category);
  } catch (error) {
    console.error(error);
    return null;
  }
}
