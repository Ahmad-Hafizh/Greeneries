import NextAuth from 'next-auth';
import { authConfig } from './lib/auth/auth.config';
import { NextResponse } from 'next/server';

const auth = NextAuth(authConfig);
export default auth(({ req }) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  console.log(isAuthenticated);

  if (nextUrl.pathName.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect('/');
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
