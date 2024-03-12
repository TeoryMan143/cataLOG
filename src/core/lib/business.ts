'use server';

import { DrizzleError, eq } from 'drizzle-orm';
import { auth } from '../../../auth';
import {
  DBBusiness,
  RequestBusiness,
  RegisterBusiness,
  requestBusinessSchema,
} from '../schemas/business';
import { ActionResponse } from './types';
import { db } from '../db/config';
import { businesses } from '../db/tables';
import { getUserByEmail } from './db/users';

export async function registerBusiness(
  req: RequestBusiness,
): Promise<ActionResponse<DBBusiness | undefined>> {
  const result = requestBusinessSchema.safeParse(req);

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
      errors: ['Must be signed in to create a business'],
    };

  const { user } = session;

  const dbUser = await getUserByEmail(user.email!);

  if (!dbUser) {
    return {
      success: false,
      errorType: 'insertion',
      errors: ['db', 'User not found'],
    };
  }

  const business: RegisterBusiness = {
    ...result.data,
    accountId: dbUser.id,
  };

  try {
    const newBusiness = await db
      .insert(businesses)
      .values(business)
      .returning();
    return { success: true, result: newBusiness[0] };
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
