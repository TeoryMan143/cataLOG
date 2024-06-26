import { NextRequest, NextResponse } from 'next/server';
import { auth } from './core/auth';

export async function middleware({ nextUrl }: NextRequest) {
  const { user } = await auth();

  const isLoggedIn = !!user;

  const isOnLoginPage =
    nextUrl.pathname.startsWith('/register') ||
    nextUrl.pathname.startsWith('/login') ||
    nextUrl.pathname.startsWith('/recoverpass');

  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|webp|gif|svg)).*)',
  ],
};
