/* eslint-disable @typescript-eslint/no-explicit-any */
import { callApi } from '@/app/config/axios';
import prisma from '@/app/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

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
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'user@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { email, password } = credentials;

          const response = await callApi.post('/auth/signin/credentials', {
            email,
            password,
          });

          return response.data.result;
        } catch (error: any) {
          console.log(error);

          throw new Error(error?.response.data.message || 'authentication failed');
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.TOKEN_KEY!,
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account && account.type == 'oauth' && user) {
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

      token.emailVerified = response.data.result.emailVerified;
      token.role = response.data.result.role;

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
  events: {
    createUser: async ({ user }) => {
      await callApi.post('/auth/signin/oauth', {
        userId: user.id,
      });
    },
  },
});

export { handler as GET, handler as POST };
