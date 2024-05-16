'use server';

import {
  RegisterUserSchema,
  User,
  loginCredentials,
  registerUserSchema,
} from '@/core/schemas/user';
import { ActionResponse, GoogleUser } from './types';
import { db } from '@/core/db/config';
import { emailVerification, oauthAccounts, users } from '@/core/db/tables';
import { hashPassword, sendEmail } from '@/core/server-utils';
import { DrizzleError, eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { lucia } from '../auth/config';
import { cookies } from 'next/headers';
import { auth } from '../auth';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import EmailVerify from '../../../emails/email-verify';
import { GoogleTokens, generateCodeVerifier, generateState } from 'arctic';
import { google } from '../auth/oauth-providers';
import { z } from 'zod';
import ForgotPassword from '@root/emails/forgot-password';

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

    const code = Math.random().toString(36).substring(2, 8);

    const txRes = await db.transaction(async tx => {
      const newUser = await tx.insert(users).values(newUserData).returning();
      const { id: userId, email } = newUser[0];
      await tx.insert(emailVerification).values({
        code,
        userId,
        sentAt: new Date(),
      });

      const token = jwt.sign({ email, userId, code }, process.env.JWT_SECRET!, {
        expiresIn: '5m',
      });

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

      const emailData = await sendEmail({
        to: [email],
        subject: 'Verifica tu cuenta de cataLOG',
        react: EmailVerify({ url }),
      });

      if (emailData.error) {
        console.error(emailData.error);
        tx.rollback();
        return { emailSuccess: false };
      }

      return { emailSuccess: true, newUser: newUser[0] };
    });

    if (!txRes.emailSuccess) {
      return {
        success: false,
        errorType: 'email-verification',
        errors: ['Email error'],
      };
    }

    if (!txRes.newUser) {
      return {
        success: false,
        errorType: 'insertion',
        errors: ['Error creating user'],
      };
    }

    return { success: true, result: txRes.newUser };
  } catch (e: any) {
    console.error(e);
    if (e.constraint === 'email_idx') {
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

    const oatuhAcc = await db.query.oauthAccounts.findFirst({
      where: eq(oauthAccounts.userId, user.id),
    });

    if (oatuhAcc) {
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

    if (!user.emailVerified) {
      const code = Math.random().toString(36).substring(2, 8);

      await db.insert(emailVerification).values({
        code,
        userId: user.id,
        sentAt: new Date(),
      });

      const token = jwt.sign(
        { email, userId: user.id, code },
        process.env.JWT_SECRET!,
        {
          expiresIn: '5m',
        },
      );

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

      const emailData = await sendEmail({
        to: [email],
        subject: 'Verifica tu cuenta de cataLOG',
        react: EmailVerify({ url }),
      });

      if (emailData.error) {
        return {
          success: false,
          errorType: 'email-verification',
          errors: ['Email error'],
        };
      }

      return {
        success: false,
        errorType: 'email-verification',
        errors: ['Correo no verificado'],
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

export async function resendVerifyEmail(
  email: string,
): Promise<ActionResponse> {
  try {
    const user = await db.query.users.findFirst({
      where: table => eq(table.email, email),
    });

    if (!user) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['User not found'],
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Email already verified'],
      };
    }

    const existedCode = await db.query.emailVerification.findFirst({
      where: eq(emailVerification.userId, user.id),
    });

    if (!existedCode) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['User already verified'],
      };
    }

    const sentAt = new Date(existedCode.sentAt);
    const isOneMinuteHasPassed =
      new Date().getTime() - sentAt.getTime() > 60000;

    if (!isOneMinuteHasPassed) {
      return {
        success: false,
        errorType: 'auth',
        errors: [
          'Email already sent, next email in ' +
            (60 -
              Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
            ' seconds',
        ],
      };
    }

    const code = Math.random().toString(36).substring(2, 8);

    await db
      .update(emailVerification)
      .set({
        code,
        sentAt: new Date(),
      })
      .where(eq(emailVerification.userId, user.id));

    const token = jwt.sign(
      { email, userId: user.id, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: '5m',
      },
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

    const emailData = await sendEmail({
      to: [email],
      subject: 'Verifica tu cuenta de cataLOG',
      react: EmailVerify({ url }),
    });

    if (emailData.error) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Email could not be send'],
      };
    }

    return {
      success: true,
      result: undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      errorType: 'auth',
      errors: [error.message],
    };
  }
}

export async function createGoogleAuthorizationURL(): Promise<
  ActionResponse<string>
> {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set('codeVerifier', codeVerifier, {
      httpOnly: true,
    });

    cookies().set('state', state, {
      httpOnly: true,
    });

    const authorizationURL = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ['email', 'profile'],
      },
    );

    return {
      success: true,
      result: authorizationURL.toString(),
    };
  } catch (e) {
    return {
      success: false,
      errorType: 'insertion',
      errors: ['Unable to create authorization URL'],
    };
  }
}

const numberSchema = z
  .string({ required_error: 'Campo requerido' })
  .min(1, 'Ingresa un numero')
  .regex(
    new RegExp(`^3[0-9]{2}\\s?\\-?[0-9]{3}\\s?\\-?[0-9]{4}$`),
    'Ingresa un numero valido',
  )
  .transform(v => +v);

export async function signUpWithGoogle(
  reqNumber: string,
): Promise<ActionResponse<User>> {
  const result = numberSchema.safeParse(reqNumber);

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

  const number = result.data;

  try {
    const token = cookies().get('google_token')?.value;

    if (!token) {
      return {
        success: false,
        errorType: 'token-validation',
        errors: ['Token not found'],
      };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as GoogleUser &
      GoogleTokens & {
        accessTokenExpiresAt: string;
      };

    const [newUser] = await db
      .insert(users)
      .values({
        name: decoded.name,
        email: decoded.email,
        password: crypto.randomUUID(),
        emailVerified: decoded.verified_email,
        number,
        image: decoded.picture,
      })
      .returning();

    const { accessToken, accessTokenExpiresAt, refreshToken } = decoded;

    await db.insert(oauthAccounts).values({
      accessToken,
      provider: 'google',
      providerUserId: decoded.id,
      userId: newUser.id,
      refreshToken,
      expiresAt: new Date(accessTokenExpiresAt),
    });

    const session = await lucia.createSession(newUser.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookies().delete('state');
    cookies().delete('codeVerifier');
    cookies().delete('google_token');

    return {
      success: true,
      result: newUser,
    };
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) {
      return {
        success: false,
        errorType: 'token-validation',
        errors: [e.message],
      };
    }
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

export async function recoverPassword(email: string): Promise<ActionResponse> {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '5m',
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/recoverpass?token=${token}`;

    const emailData = await sendEmail({
      to: [email],
      subject: 'Verifica tu cuenta de cataLOG',
      react: ForgotPassword({ url }),
    });

    if (emailData.error) {
      return {
        success: false,
        errorType: 'auth',
        errors: ['Email could not be send'],
      };
    }

    return {
      success: true,
      result: undefined,
    };
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) {
      return {
        success: false,
        errorType: 'token-validation',
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

export async function validateNewPasswordToken(
  token: string,
): Promise<ActionResponse<string>> {
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    return {
      success: true,
      result: email,
    };
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) {
      return {
        success: false,
        errorType: 'token-validation',
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
