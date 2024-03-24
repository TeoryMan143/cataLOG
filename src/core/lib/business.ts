'use server';

import { DrizzleError, eq } from 'drizzle-orm';
import { auth } from '@/core/auth';
import {
  DBBusiness,
  RequestBusiness,
  RegisterBusiness,
  requestBusinessSchema,
  dbBusinessSchema,
  EditBusiness,
  editBusinessSchema,
} from '../schemas/business';
import { ActionResponse } from './types';
import { db } from '../db/config';
import { businesses } from '../db/tables';
import { revalidatePath } from 'next/cache';

export async function registerBusiness(
  req: RequestBusiness,
): Promise<ActionResponse<DBBusiness | undefined>> {
  const result = requestBusinessSchema.safeParse(req);

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
      errors: ['Debes iniciar sesión para crear un negocio'],
    };
  }

  const business: RegisterBusiness = {
    ...result.data,
    accountId: user.id,
  };

  try {
    const newBusiness = await db
      .insert(businesses)
      .values(business)
      .returning();
    return { success: true, result: newBusiness[0] };
  } catch (error) {
    console.log(error);
    if (!(error instanceof DrizzleError)) {
      return { success: false, errorType: 'insertion', errors: ['pass'] };
    }
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', error.name, error.message],
    };
  }
}

export async function editBusiness(
  req: EditBusiness,
): Promise<ActionResponse<DBBusiness | undefined>> {
  const result = editBusinessSchema.safeParse(req);

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
      errors: ['Debes iniciar sesión para editar tu negocio'],
    };
  }

  const business = await db.query.businesses.findFirst({
    where: eq(businesses.id, result.data.id),
  });

  if (!business) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Negocio no encontrado'],
    };
  }

  if (business.accountId !== user.id) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Negocio no encontrado'],
    };
  }

  const { id, ...businessData } = result.data;

  try {
    const newBusiness = await db
      .update(businesses)
      .set(businessData)
      .where(eq(businesses.id, id))
      .returning();
    revalidatePath(`/business/${id}`);
    return { success: true, result: newBusiness[0] };
  } catch (error) {
    console.log(error);
    if (!(error instanceof DrizzleError)) {
      return { success: false, errorType: 'insertion', errors: ['pass'] };
    }
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', error.name, error.message],
    };
  }
}

export async function getAcountBusinesses(
  accountId: string,
): Promise<ActionResponse<DBBusiness[]>> {
  try {
    const resBusinesses = await db.query.businesses.findMany({
      where: eq(businesses.accountId, accountId),
    });
    return { success: true, result: resBusinesses };
  } catch (error) {
    if (!(error instanceof DrizzleError))
      return { success: false, errorType: 'insertion', errors: ['pass'] };
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', error.name, error.message],
    };
  }
}
