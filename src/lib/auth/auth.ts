/* eslint-disable @typescript-eslint/no-explicit-any */
import { callApi } from '@/app/config/axios';
import prisma from '@/app/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface User extends DefaultUser {
    emailVerified: string | Date;
    role?: string;
  }
  interface Session {
    user: {
      emailVerified?: string | Date;
      role?: string;
    } & DefaultSession['user'];
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.TOKEN_KEY!,
  ...authConfig,
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account && account.type == 'oauth') {
        console.log('oauth user', user);
        return true;
      }

      if (!user) return false;

      if (!user.emailVerified) {
        return false;
      }

      return true;
    },
    jwt: async ({ token }) => {
      const response: { data: { isSuccess: boolean; result: any } } = await callApi.post('/auth/user/detail', {
        email: token.email,
      });
      console.log(response.data);

      token.emailVerified = response.data.result.emailVerified;
      token.role = response.data.result.role;

      console.log('ini dari jwt token', token);

      return token;
    },
    session: async ({ session, token }) => {
      if (!token) return session;
      return {
        ...session,
        user: {
          ...session.user,
          emailVerified: token.emailVerified,
          role: token.role,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
