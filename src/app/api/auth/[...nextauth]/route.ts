/* eslint-disable @typescript-eslint/no-explicit-any */
import { callApi } from '@/app/config/axios';
import prisma from '@/app/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
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

const clientId: string = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '';
const tokenKey: string = process.env.TOKEN_KEY || '';

const handler = NextAuth({
  providers: [
    Google({
      clientId: clientId,
      clientSecret: clientSecret,
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
  secret: tokenKey,
  cookies: {
    sessionToken: {
      name: `secure_auth_token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      },
    },
  },
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
  jwt: {
    encode: async ({ token, secret, maxAge = 2592000 }) => {
      // You can modify the token before encoding
      const modifiedToken = {
        ...token,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + maxAge,
      };

      return sign(modifiedToken, secret, { algorithm: 'HS256' });
    },

    // Custom decode function
    decode: async ({ token, secret }) => {
      try {
        const decoded = verify(token as string, secret, { algorithms: ['HS256'] });

        return decoded as JwtPayload;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
});

export { handler as GET, handler as POST };
