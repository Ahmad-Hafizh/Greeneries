/* eslint-disable @typescript-eslint/no-explicit-any */
import { callApi } from '@/app/config/axios';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const authConfig = {
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
} satisfies NextAuthOptions;
