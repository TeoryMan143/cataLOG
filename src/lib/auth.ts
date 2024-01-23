'use server';

import {
  FormUserSchema,
  formUserSchema,
  formUserSchemaValidator,
} from '@/core/schemas/user';
import { ActionResponse } from './types';
import { db } from '@/core/db/config';
import { users } from '@/core/db/tables';
import { DrizzleError } from 'drizzle-orm';

export async function resgisterUser(
  data: FormUserSchema
): Promise<ActionResponse<any>> {
  const result = formUserSchema.safeParse(data);

  let zodErrors: string[] = [];

  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors = [...zodErrors, issue.message];
    });

    if (zodErrors.length > 0) {
      return { errors: zodErrors, errorType: 'validation', success: false };
    }
  }

  if (!result.success) return { success: false };
  try {
    const newUser = await db.insert(users).values(result.data).returning();
    return { success: true, result: newUser[0] };
  } catch (e) {
    if (e instanceof DrizzleError && e.name === 'error') {
      return {
        success: false,
        errorType: 'duplicated-email',
        errors: ['El correo electrónico ya se encuentra en uso'],
      };
    }
    return { success: false, errorType: 'insertion', errors: ['db'] };
  }
}
