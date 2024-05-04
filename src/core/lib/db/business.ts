'use server';

import { db } from '@/core/db/config';
import { businessSocial, businesses, products } from '@/core/db/tables';
import { DBBusiness } from '@/core/schemas/business';
import { eq } from 'drizzle-orm';

export async function getBusinessById(id: string): Promise<DBBusiness | null> {
  try {
    const result = await db.query.businesses.findFirst({
      where: eq(businesses.id, id),
    });
    if (!result) return null;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getBusinessSocials(businessId: string) {
  try {
    const result = await db.query.businessSocial.findFirst({
      where: eq(businessSocial.businessId, businessId),
    });
    if (!result) return null;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getBusinessByProduct(
  productId: string,
): Promise<DBBusiness | null> {
  try {
    const result = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: eq(products.id, productId),
      with: {
        business: true,
      },
    });
    if (!result) return null;
    return result.business;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getBusinessImage(id: string) {
  try {
    const [bussImg] = await db
      .select({ image: businesses.image })
      .from(businesses)
      .where(eq(businesses.id, id));

    return bussImg.image;
  } catch (e: any) {
    console.error(e);
    return null;
  }
}
