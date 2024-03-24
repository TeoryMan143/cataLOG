'use server';
import {
  type RequestBusinessSocial,
  requestBusinessSocialSchema,
} from '@/core/schemas/business-social';
import { auth } from '../auth';
import { redirect } from 'next/navigation';
import { db } from '../db/config';
import { DrizzleError, eq } from 'drizzle-orm';
import { businessSocial, businesses } from '../db/tables';
import { ActionResponse } from './types';
import { revalidatePath } from 'next/cache';

export async function uploadSocials(
  req: RequestBusinessSocial,
): Promise<ActionResponse> {
  const result = requestBusinessSocialSchema.safeParse(req);

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
    redirect('/login');
  }

  const socialInfo = result.data;

  const business = await db.query.businesses
    .findFirst({
      where: eq(businesses.id, socialInfo.businessId),
    })
    .catch(() => {
      redirect('/login');
    });

  if (!business) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Not authorized !ex'],
    };
  }

  if (business.accountId !== user.id) {
    return {
      success: false,
      errorType: 'auth',
      errors: ['Not authorized !eq'],
    };
  }

  try {
    const { businessId, ...newInfo } = socialInfo;

    const allEmpty = Object.values(newInfo).every(val => val === null);

    if (allEmpty) {
      await db
        .delete(businessSocial)
        .where(eq(businessSocial.businessId, businessId));
      revalidatePath(`/business/${business.id}`);
      return {
        success: true,
        result: undefined,
      };
    }

    const existSocials = await db.query.businessSocial.findFirst({
      where: eq(businessSocial.businessId, business.id),
    });

    if (!existSocials) {
      await db.insert(businessSocial).values(socialInfo);
      revalidatePath(`/business/${business.id}`);
      return {
        success: true,
        result: undefined,
      };
    }

    await db
      .update(businessSocial)
      .set(newInfo)
      .where(eq(businessSocial.businessId, business.id));
    revalidatePath(`/business/${business.id}`);
    return {
      success: true,
      result: undefined,
    };
  } catch (e: any) {
    if (e instanceof DrizzleError) {
      return {
        success: false,
        errorType: 'insertion',
        errors: [e.message],
      };
    }
    return {
      success: false,
      errorType: 'unknown',
      errors: [e.message],
    };
  }
}
