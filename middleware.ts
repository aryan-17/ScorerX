import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';  // Use getToken for getting session in middleware

const protectedRoutes = ['/profile', '/team', '/matches'];
const unprotectedRoutes = ['/', '/auth/login', '/auth/signUp'];
const authRoutes = ['/auth/login', '/auth/signUp'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  const isAuthRoutes = authRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!token && isProtectedRoute) {
    const absoluteURL = new URL('/auth/login', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (token && isAuthRoutes) {
    const absoluteURL = new URL('/profile', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
