import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import { getUserByEmail } from '@/lib/db/users';
import { loginCredentials } from '@/core/schemas/user';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
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
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === 'google') {
        console.log(profile);
        return false;
      }
      return true;
    },
  },
});
