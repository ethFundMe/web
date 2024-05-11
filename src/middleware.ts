import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const hasCookie = req.cookies.has('efmToken');
  if (!hasCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
