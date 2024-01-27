'use server';

import { FormUserSchema, User, formUserSchema } from '@/core/schemas/user';
import { ActionResponse } from './types';
import { db } from '@/core/db/config';
import { users } from '@/core/db/tables';
import bcrypt from 'bcrypt';

async function hashPassword(password: string) {
  return bcrypt.hash(password, await bcrypt.genSalt());
}

export async function resgisterUser(
  data: FormUserSchema
): Promise<ActionResponse<User | undefined>> {
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

  const userData = result.data;

  try {
    const password = userData.password;
    const hashedPass = await hashPassword(password);
    const newUserData = { ...userData, password: hashedPass };
    const newUser = await db.insert(users).values(newUserData).returning();
    return { success: true, result: newUser[0] };
  } catch (e) {
    const exp: any = e;
    if (exp.constraint === 'users_email_unique') {
      return {
        success: false,
        errorType: 'duplicated-email',
        errors: ['El correo electrónico ya se encuentra en uso'],
      };
    }
    return { success: false, errorType: 'insertion', errors: ['db'] };
  }
}
