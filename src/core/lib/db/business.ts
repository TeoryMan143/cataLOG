import { db } from '@/core/db/config';
import { businessSocial, businesses } from '@/core/db/tables';
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

export async function getBusinessSocials(id: string) {
  try {
    const result = await db.query.businessSocial.findFirst({
      where: eq(businessSocial.id, id),
    });
    if (!result) return null;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
