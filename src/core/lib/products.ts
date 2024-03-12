'use server';

import {
  type DBProduct,
  RequestProduct,
  requestProductSchema,
  DBProductImage,
} from '@/core/schemas/product';
import { auth } from '@root/auth';
import { db } from '../db/config';
import {
  productImages as productImagesTable,
  products,
  productsCategories,
} from '../db/tables';
import { DrizzleError, and, eq } from 'drizzle-orm';
import { type ActionResponse } from './types';
import { type DBProductCategory } from '../schemas/categories';
import { revalidatePath } from 'next/cache';

export async function registerProduct(req: RequestProduct): Promise<
  ActionResponse<{
    product: DBProduct;
    productCategories?: DBProductCategory[];
    productImages?: DBProductImage[];
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

  const { categories, images, ...product } = result.data;

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
    const productImages = await db
      .insert(productImagesTable)
      .values(
        images.map(img => ({
          image: img,
          productId: newProduct[0].id,
        })),
      )
      .returning();
    return {
      success: true,
      result: {
        product: newProduct[0],
        productCategories,
        productImages,
      },
    };
  } catch (error) {
    console.error(error);
    if (!(error instanceof DrizzleError))
      return { success: false, errorType: 'insertion', errors: ['pass'] };
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', error.name, error.message],
    };
  }
}

export async function editProduct(
  productId: string,
  req: Partial<RequestProduct>,
): Promise<
  ActionResponse<{
    product: DBProduct;
    productCategories?: DBProductCategory[];
    productImages?: DBProductImage[];
  }>
> {
  const result = requestProductSchema.partial().safeParse(req);

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

  const { categories, images, businessId, ...product } = result.data;

  if (!categories) {
    return {
      success: false,
      errorType: 'validation',
      errors: ['Missing categories'],
    };
  }

  if (!images) {
    return {
      success: false,
      errorType: 'validation',
      errors: ['Missing images'],
    };
  }

  try {
    const newProduct = await db
      .update(products)
      .set(product)
      .where(eq(products.id, productId))
      .returning();

    await db
      .delete(productsCategories)
      .where(eq(productsCategories.productId, productId));

    const productCategories = await Promise.allSettled(
      categories.map(async cat => {
        const res = await db
          .insert(productsCategories)
          .values({ productId, categoryId: cat })
          .returning();
        return res[0];
      }),
    );

    await db
      .delete(productImagesTable)
      .where(eq(productImagesTable.productId, productId));

    const productImages = await Promise.allSettled(
      images.map(async img => {
        const res = await db
          .insert(productImagesTable)
          .values({ productId, image: img })
          .returning();
        return res[0];
      }),
    );

    revalidatePath(`/product/${productId}`);
    revalidatePath(`/business/${businessId}/product/${productId}`);

    return {
      success: true,
      result: {
        product: newProduct[0],
        productCategories: productCategories.map(pc => {
          if (pc.status === 'fulfilled') {
            return pc.value;
          }
        }) as DBProductCategory[],
        productImages: productImages.map(pc => {
          if (pc.status === 'fulfilled') {
            return pc.value;
          }
        }) as DBProductImage[],
      },
    };
  } catch (error) {
    console.error(error);
    if (!(error instanceof DrizzleError))
      return { success: false, errorType: 'insertion', errors: ['pass'] };
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', error.name, error.message],
    };
  }
}
