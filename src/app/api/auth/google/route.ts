import { google } from '@/core/auth/oauth-providers';
import { db } from '@/core/db/config';
import { oauthAccounts, users } from '@/core/db/tables';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { GoogleUser } from '@/core/lib/types';
import { lucia } from '@/core/auth/config';

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  try {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      return Response.redirect(
        new URL(
          '/api/error?type=google_validation&message=Datos faltantes',
          process.env.NEXT_PUBLIC_BASE_URL!,
        ),
        400,
      );
    }

    const codeVerifier = cookies().get('codeVerifier')?.value;
    const savedState = cookies().get('state')?.value;

    if (!codeVerifier || !savedState) {
      return Response.redirect(
        new URL(
          '/api/error?type=google_validation&message=Datos faltantes',
          process.env.NEXT_PUBLIC_BASE_URL!,
        ),
        400,
      );
    }

    const authorization = await google.validateAuthorizationCode(
      code,
      codeVerifier,
    );

    const googleRes = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${authorization.accessToken}`,
        },
      },
    );

    const googleData = (await googleRes.json()) as GoogleUser;

    const oauthAcc = await db.query.oauthAccounts.findFirst({
      where: eq(oauthAccounts.providerUserId, googleData.id),
      with: {
        user: true,
      },
    });

    if (!oauthAcc?.user) {
      const token = jwt.sign(
        { ...googleData, ...authorization },
        process.env.JWT_SECRET!,
        {
          expiresIn: '15m',
        },
      );
      cookies().set('google_token', token, {
        httpOnly: true,
      });

      return Response.redirect(
        new URL('/register/google-number', process.env.NEXT_PUBLIC_BASE_URL),
        302,
      );
    }

    const { accessToken, accessTokenExpiresAt, refreshToken } = authorization;
    await db
      .update(oauthAccounts)
      .set({ accessToken, expiresAt: accessTokenExpiresAt, refreshToken })
      .where(eq(oauthAccounts.providerUserId, googleData.id));

    const session = await lucia.createSession(oauthAcc.user.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return Response.redirect(
      new URL('/', process.env.NEXT_PUBLIC_BASE_URL!),
      302,
    );
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) {
      return Response.redirect(
        new URL(
          `/api/error?type=token_validation&message=${e.message}`,
          process.env.NEXT_PUBLIC_BASE_URL!,
        ),
        400,
      );
    }
    return Response.redirect(
      new URL(
        `/api/error?type=desconocido&message=${e.message}`,
        process.env.NEXT_PUBLIC_BASE_URL!,
      ),
      500,
    );
  }
}
