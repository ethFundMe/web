import { NextRequest, NextResponse } from 'next/server';
import { User } from './types';

export default async function middleware(req: NextRequest) {
  const hasCookie = req.cookies.has('efmToken');

  try {
    const s = req.url.split('/');
    const address = s.filter((_) => _.startsWith('0x'))[0] || '';

    const res = await fetch(
      `${process.env.ETH_FUND_ENDPOINT}/api/user/${address}`
    );

    if (hasCookie) {
      if (res.ok) {
        const user: User = await res.json();
        if (!user || !user.registered)
          return NextResponse.redirect(new URL('/account', req.url));
        return NextResponse.next();
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
