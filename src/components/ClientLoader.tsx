'use client';

import { usePathname, useRouter } from 'next/navigation';
import NextTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';
import * as NProgress from 'nprogress';
import { useEffect } from 'react';

export default function ClientLoader({ ...props }: NextTopLoaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);

  return <NextTopLoader crawlSpeed={500} speed={1000} {...props} />;
}
