import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/lib/db/users';
import { loginCredentials } from '@/core/schemas/user';
// import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credencials) {
        const result = loginCredentials.safeParse(credencials);
        if (!result.success) return null;

        const { email, password } = result.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        // const passwordsMatch = await bcrypt.compare(password, user.password);
        // if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
});
