import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('LODOFOADOFOAS');

      const isLoggedIn = !!auth?.user;
      const isOnLoginPage =
        nextUrl.pathname.startsWith('/register') ||
        nextUrl.pathname.startsWith('/login');
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
