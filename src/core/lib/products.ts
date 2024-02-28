'use server';

import {
  type DBProduct,
  RequestProduct,
  requestProductSchema,
} from '@/core/schemas/product';
import { auth } from '@root/auth';
import { db } from '../db/config';
import { products, productsCategories } from '../db/tables';
import { DrizzleError } from 'drizzle-orm';
import { type ActionResponse } from './types';
import { type DBProductCategory } from '../schemas/categories';

export async function registerProduct(req: RequestProduct): Promise<
  ActionResponse<{
    product: DBProduct;
    productCategories?: DBProductCategory[];
  }>
> {
  const result = requestProductSchema.safeParse(req);

  let zodErrors: string[] = [];

  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors = [...zodErrors, issue.message];
    });

    if (zodErrors.length > 0) {
      return { errors: zodErrors, errorType: 'validation', success: false };
    }
  }

  if (!result.success)
    return { success: false, errorType: 'validation', errors: ['pass'] };

  const session = await auth();

  if (!session?.user)
    return {
      success: false,
      errorType: 'auth',
      errors: ['Must be signed in to register a product'],
    };

  const { categories, ...product } = result.data;

  try {
    const newProduct = await db.insert(products).values(product).returning();
    const productCategories = !categories
      ? []
      : await db
          .insert(productsCategories)
          .values(
            categories.map(catId => ({
              productId: newProduct[0].id,
              categoryId: catId,
            })),
          )
          .returning();
    return {
      success: true,
      result: {
        product: newProduct[0],
        productCategories,
      },
    };
  } catch (error) {
    console.error(error)
    if (!(error instanceof DrizzleError))
      return { success: false, errorType: 'insertion', errors: ['pass'] };
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', error.name, error.message],
    };
  }
}
