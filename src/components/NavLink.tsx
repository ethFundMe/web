'use client';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';

type NavLinkProps = LinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    activeStyles?: ({ isActive }: { isActive: boolean }) => string;
  };

export const NavLink = ({
  href,
  children,
  className,
  activeStyles,
  ...rest
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const combinedStyle = cn(
    'duration-150 transition-all ease-in',
    className,
    activeStyles && activeStyles({ isActive })
  );

  return (
    <Link href={href} {...rest} className={cn(combinedStyle)}>
      {children}
    </Link>
  );
};
