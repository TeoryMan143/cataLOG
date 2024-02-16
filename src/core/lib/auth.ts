'use server';

import { User, formUserSchema } from '@/core/schemas/user';
import { ActionResponse } from './types';
import { db } from '@/core/db/config';
import { users } from '@/core/db/tables';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { hashPassword } from '@/core/server-utils';

export async function resgisterUser(
  data: unknown
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
    console.error(e);
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

export async function loginUser(
  data: Object
): Promise<ActionResponse | undefined> {
  try {
    await signIn('credentials', { ...data, redirectTo: '/' });
  } catch (e) {
    console.error(e);
    const { type } = e as AuthError;
    if (type === 'CredentialsSignin') {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Unvalid redentials'],
      };
    }
    throw e;
  }
}

export async function signInGoogle() {
  await signIn('google', { redirectTo: '/' });
}
