import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


// use middle.ts to set up NextAuth.js and export its `auth` property
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: [] - filter Middleware to run on specific paths.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};