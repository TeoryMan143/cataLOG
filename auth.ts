import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from '@auth/core/providers/credentials';
import Google from 'next-auth/providers/google';
import { getUserByEmail } from '@/core/lib/db/users';
import { loginCredentials } from '@/core/schemas/user';
import bcrypt from 'bcrypt';
import { resgisterUser } from '@/core/lib/auth';

export const handler = NextAuth({
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
      console.log(profile);
      console.log(account);
      if (account?.provider === 'google') {
        if (!profile) return false;
        const user = await getUserByEmail(profile.email!);
        if (user) {
          const { id, ...rest } = user;
          const newUser = await resgisterUser(rest);
          console.log(newUser);
        }
      }
      return true;
    },
  },
});

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = handler;
