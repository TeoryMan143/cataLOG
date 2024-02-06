import type { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/core/db/config';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import { getUserByEmail } from '@/core/lib/db/users';
import { loginCredentials } from '@/core/schemas/user';
import bcrypt from 'bcrypt';

export const authConfig = {
  adapter: DrizzleAdapter(db),
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
    async signIn({ profile, account }) {
      if (account?.provider === 'google') {
        console.log(profile);
        return false;
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credencials) {
        const result = loginCredentials.safeParse(credencials);
        if (!result.success) return null;

        const { email, password } = result.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
