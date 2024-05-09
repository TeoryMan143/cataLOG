'use server';

import {
  type DBProduct,
  RequestProduct,
  requestProductSchema,
  DBProductImage,
  editProductSchema,
  EditProduct,
} from '@/core/schemas/product';
import { auth } from '@/core/auth';
import { db } from '../db/config';
import {
  productImages as productImagesTable,
  products,
  productsCategories,
} from '../db/tables';
import {
  DrizzleError,
  and,
  asc,
  desc,
  eq,
  gte,
  like,
  lte,
  or,
  sql,
} from 'drizzle-orm';
import { type ActionResponse } from './types';
import { type DBProductCategory } from '../schemas/categories';
import { revalidatePath } from 'next/cache';
import { deleteFileById } from './files';
import isEmpty from 'just-is-empty';

export async function registerProduct(req: RequestProduct): Promise<
  ActionResponse<{
    product: DBProduct;
    productCategories?: DBProductCategory[];
    productImages?: DBProductImage[];
  }>
> {
  const result = requestProductSchema.safeParse(req);

  let zodErrors: { [x: string]: string }[] = [];

  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors = [...zodErrors, { [issue.path[0]]: issue.message }];
    });

    if (zodErrors.length > 0) {
      return { errors: zodErrors, errorType: 'validation', success: false };
    }
  }

  if (!result.success) {
    return {
      success: false,
      errorType: 'validation',
      errors: [{ pass: 'pass' }],
    };
  }

  const { user } = await auth();

  if (!user) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Must be signed in to register a product'],
    };
  }

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

    revalidatePath(`/business/${product.businessId}/catalog`);

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
  req: EditProduct,
): Promise<
  ActionResponse<{
    product: DBProduct;
    productCategories?: DBProductCategory[];
    productImages?: DBProductImage[];
  }>
> {
  const result = editProductSchema.safeParse(req);

  let zodErrors: { [x: string]: string }[] = [];

  if (!result.success) {
    result.error.issues.forEach(issue => {
      issue.path;
      zodErrors = [...zodErrors, { [issue.path[0]]: issue.message }];
    });

    if (zodErrors.length > 0) {
      return { errors: zodErrors, errorType: 'validation', success: false };
    }
  }

  if (!result.success)
    return {
      success: false,
      errorType: 'validation',
      errors: [{ pass: 'pass' }],
    };

  const { user } = await auth();

  if (!user)
    return {
      success: false,
      errorType: 'auth',
      errors: ['Debes iniciar sesión para crear un negocio'],
    };

  const { categories, images, businessId, deleteImages, ...product } =
    result.data;

  if (!categories) {
    return {
      success: false,
      errorType: 'validation',
      errors: [{ categories: 'Missing categories' }],
    };
  }

  if (!images) {
    return {
      success: false,
      errorType: 'validation',
      errors: [{ categories: 'Missing images' }],
    };
  }

  try {
    const newProduct = isEmpty(product)
      ? await db.select().from(products).where(eq(products.id, productId))
      : await db
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

    deleteImages?.forEach(async img => {
      await deleteFileById(img);
    });

    revalidatePath(`/product/${productId}/catalog`);
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

export async function getProductsListByRating({
  offset,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}): Promise<ActionResponse<DBProduct[]>> {
  try {
    const pageProducts = await db
      .select()
      .from(products)
      .where(gte(products.rating, 4))
      .orderBy(desc(products.rating), desc(products.id))
      .limit(limit)
      .offset(offset ?? 0);
    return {
      success: true,
      result: pageProducts,
    };
  } catch (e: any) {
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}

export async function getProductsListByPrice({
  offset,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}): Promise<ActionResponse<DBProduct[]>> {
  try {
    const pageProducts = await db
      .select()
      .from(products)
      .orderBy(asc(products.price))
      .limit(limit)
      .offset(offset ?? 0);

    return {
      success: true,
      result: pageProducts,
    };
  } catch (e: any) {
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}

export async function getProductsListByCategory({
  offset,
  limit = 10,
  categoryId,
}: {
  offset?: number;
  limit?: number;
  categoryId: string;
}): Promise<ActionResponse<DBProduct[]>> {
  try {
    const pageProducts = await db
      .select({
        id: products.id,
        businessId: products.businessId,
        displayName: products.displayName,
        price: products.price,
        unit: products.unit,
        description: products.description,
        avialableUnits: products.avialableUnits,
        rating: products.rating,
      })
      .from(products)
      .orderBy(asc(products.price))
      .limit(limit)
      .offset(offset ?? 0)
      .innerJoin(
        productsCategories,
        eq(productsCategories.productId, products.id),
      )
      .where(eq(productsCategories.categoryId, categoryId));

    return {
      success: true,
      result: pageProducts,
    };
  } catch (e: any) {
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}

export async function getProductsFromQuery(
  query: string,
  limit = 10,
): Promise<ActionResponse<DBProduct[]>> {
  try {
    const prods = await db.query.products.findMany({
      where: or(
        like(
          sql`LOWER(${products.displayName})` as any,
          `%${query.toLowerCase()}%`,
        ),
        like(
          sql`LOWER(${products.description})` as any,
          `%${query.toLowerCase()}%`,
        ),
      ),
      limit,
    });

    return {
      success: true,
      result: prods,
    };
  } catch (e: any) {
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}

export async function getProductsFromComplexQuery({
  query,
  limit = 100,
  categories: categoryIds,
  minPrice = 0,
  maxPrice,
}: {
  query: string;
  limit?: number;
  categories: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
}): Promise<ActionResponse<DBProduct[]>> {
  try {
    const prods = await db
      .selectDistinct({
        id: products.id,
        description: products.description,
        businessId: products.businessId,
        displayName: products.displayName,
        price: products.price,
        unit: products.unit,
        avialableUnits: products.avialableUnits,
        rating: products.rating,
      })
      .from(products)
      .limit(limit)
      .innerJoin(
        productsCategories,
        eq(productsCategories.productId, products.id),
      )
      .where(
        and(
          or(...categoryIds.map(cat => eq(productsCategories.categoryId, cat))),
          or(
            like(
              sql`LOWER(${products.displayName})` as any,
              `%${query.toLowerCase()}%`,
            ),
            like(
              sql`LOWER(${products.description})` as any,
              `%${query.toLowerCase()}%`,
            ),
          ),
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
        ),
      );

    return {
      success: true,
      result: prods,
    };
  } catch (e: any) {
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}

export async function deleteProductById(
  productId: string,
): Promise<ActionResponse> {
  const { user } = await auth();

  if (!user) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Not allowed'],
    };
  }

  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
      columns: {
        id: true,
      },
      with: {
        business: {
          columns: {
            id: true,
            accountId: true,
          },
        },
      },
    });

    if (!product) {
      return {
        success: false,
        errorType: 'insertion',
        errors: ['Product not found'],
      };
    }

    if (product.business.accountId !== user.id) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Not allowed'],
      };
    }

    await db.delete(products).where(eq(products.id, productId)).returning();

    return {
      success: true,
      result: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db error'],
    };
  }
}
