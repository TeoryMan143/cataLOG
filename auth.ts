import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

export const {} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize() {
        return null;
      },
    }),
  ],
});
