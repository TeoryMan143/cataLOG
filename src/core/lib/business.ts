'use server';

import { DrizzleError, eq } from 'drizzle-orm';
import { auth } from '@/core/auth';
import {
  DBBusiness,
  RequestBusiness,
  RegisterBusiness,
  requestBusinessSchema,
} from '../schemas/business';
import { ActionResponse } from './types';
import { db } from '../db/config';
import { businesses } from '../db/tables';

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
