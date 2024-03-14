'use server';

import {
  RegisterUserSchema,
  User,
  formUserSchema,
  loginCredentials,
  registerUserSchema,
} from '@/core/schemas/user';
import { ActionResponse } from './types';
import { db } from '@/core/db/config';
import { users } from '@/core/db/tables';
import { hashPassword } from '@/core/server-utils';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { lucia } from '../auth/config';
import { cookies } from 'next/headers';
import { auth } from '../auth';

export async function resgisterUser(
  data: RegisterUserSchema,
): Promise<ActionResponse<User | undefined>> {
  const result = registerUserSchema.safeParse(data);

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
    return { success: false, errorType: 'insertion', errors: ['pass'] };

  const userData = result.data;

  const isNumberValid = new RegExp(
    `^3[0-9]{2}\\s?\\-?[0-9]{3}\\s?\\-?[0-9]{4}$`,
  ).test(userData.number.toString());

  if (!isNumberValid) {
    return {
      success: false,
      errorType: 'validation',
      errors: [{ number: 'Invalid number' }],
    };
  }

  try {
    const password = userData.password;
    const hashedPass = await hashPassword(password);
    const newUserData = { ...userData, password: hashedPass };
    const newUser = await db.insert(users).values(newUserData).returning();
    return { success: true, result: newUser[0] };
  } catch (e: any) {
    console.error(e);
    if (e.constraint === 'users_email_unique') {
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
  data: Object,
): Promise<ActionResponse<{ userId: string }>> {
  try {
    const result = loginCredentials.safeParse(data);

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

    const { email, password } = result.data;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Correo o contraseña incorrectos'],
      };
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Correo o contraseña incorrectos'],
      };
    }

    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      result: {
        userId: user.id,
      },
    };
  } catch (e) {
    console.error(e);
    return { success: false, errorType: 'insertion', errors: ['db'] };
  }
}

export const signOut = async () => {
  try {
    const { session } = await auth();

    if (!session) {
      return {
        error: 'Unauthorized',
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export async function signInGoogle() {
  // await signIn('google');
}
