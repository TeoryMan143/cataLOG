import { NextRequest } from 'next/server';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { db } from '@/core/db/config';
import { eq } from 'drizzle-orm';
import { emailVerification, users } from '@/core/db/tables';
import { lucia } from '@/core/auth/config';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const searchParams = url.searchParams;

    const token = searchParams.get('token');

    if (!token) {
      return Response.json(
        {
          error: 'No token',
        },
        {
          status: 400,
        },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      code: string;
      userId: string;
    };

    const verification = await db.query.emailVerification.findFirst({
      where: eq(emailVerification.userId, decoded.userId),
    });

    if (!verification) {
      return Response.json(
        {
          error: 'Invalid token',
        },
        {
          status: 400,
        },
      );
    }

    await db
      .delete(emailVerification)
      .where(eq(emailVerification.userId, decoded.userId));

    await db
      .update(users)
      .set({ emailVerified: true })
      .where(eq(users.id, decoded.userId));

    const session = await lucia.createSession(decoded.userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return Response.redirect(new URL(process.env.NEXT_PUBLIC_BASE_URL!), 302);
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) {
      return Response.json(
        {
          type: e.name,
          error: e.message,
        },
        {
          status: 400,
        },
      );
    }
    return Response.redirect(
      new URL('/login', process.env.NEXT_PUBLIC_BASE_URL!),
    );
  }
}
