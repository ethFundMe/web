import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './lib/queries';

export default async function middleware(req: NextRequest) {
  const hasCookie = req.cookies.has('efmToken');

  try {
    const s = req.url.split('/');
    const address = (s.filter((_) => _.startsWith('0x'))[0] ||
      '') as `0x${string}`;

    const user = await getUser(address);

    if (hasCookie) {
      if (user) {
        if (user.registered) return NextResponse.next();
        return NextResponse.redirect(new URL('/account', req.url));
      }

      return NextResponse.redirect(new URL('/account', req.url));
    } else {
      return NextResponse.redirect(new URL(`/profile/${address}`, req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};
