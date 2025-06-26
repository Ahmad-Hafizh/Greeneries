import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    console.log(token);

    if (req.nextUrl.pathname.startsWith('/auth')) {
      if (token) {
        return NextResponse.redirect('/');
      }
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);
// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       const pathName = req.nextUrl.pathname;

//       if (pathName.startsWith('/admin')) {
//         console.log(pathName);
//         return true;
//       }

//       if (token) {
//         console.log(token);
//         return true;
//       }

//       return false;
//     },
//   },
//   pages: {
//     signIn: '/auth/signin',
//   },
// });

// // export const config = { matcher: ['/admin'] };

// import { withAuth } from 'next-auth/middleware';
// console.log('test');

// export default withAuth(
//   function middleware(req) {
//     console.log('run until this step');
//     // Edge runtime compatible logging
//     console.log('middleware req auth token', req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log('token cb', token); // Log the full token

//         return token?.role === 'user'; // Make sure this matches your token structure
//       },
//     },
//   }
// );

// export const config = { matcher: ['/admin(.*)'] };
