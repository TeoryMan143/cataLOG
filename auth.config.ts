import type { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/core/db/config';

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage =
        nextUrl.pathname.startsWith('/register') ||
        nextUrl.pathname.startsWith('/login');
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      if (isOnLoginPage && !isLoggedIn) return true;
      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
