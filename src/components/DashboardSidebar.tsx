'use client';

import { getDashboardRoutes } from '@/lib/dashboardRoutes';
import { NavbarRoute } from '@/lib/types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardMobileSidebar from './DashboardMobileSidebar';
import { NavLink } from './NavLink';

export const DashboardSidebar = ({
  userAddress,
}: {
  userAddress: `0x${string}`;
}) => {
  const { user } = userStore();
  const { push } = useRouter();

  const [routes, setRoutes] = useState<
    {
      link: string;
      title: string;
      icon: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    if (!userAddress && !user?.ethAddress) {
      push(`/profile/${userAddress}`);
      return;
    }
    if (userAddress && user?.ethAddress && userAddress !== user?.ethAddress) {
      push(`/profile/${userAddress}`);
      return;
    }
  }, [userAddress, user?.ethAddress, push]);

  useEffect(() => {
    setRoutes(getDashboardRoutes(userAddress));
  }, [userAddress]);

  return (
    <>
      <aside className='hidden w-60 flex-shrink-0 p-4 pl-0 md:block'>
        <div className='fixed top-16 z-20 w-[14rem]'>
          <ul className='space-y-4'>
            {routes.map((route, idx) => (
              <li key={idx}>
                <SidebarNavLink
                  link={route.link}
                  title={route.title}
                  icon={route.icon}
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <DashboardMobileSidebar routes={routes} />
      {/* <DashboardBottomTabs routes={routes} /> */}
      {/* <DashboardMobileMenu routes={routes} /> */}
    </>
  );
};

const SidebarNavLink = ({
  title,
  link,
  icon,
  className,
  activeStyles,
}: NavbarRoute & { className?: string; activeStyles?: string }) => {
  return (
    <NavLink
      href={link}
      activeStyles={({ isActive }) =>
        isActive
          ? cn(
              'bg-primary-default text-white hover:bg-primary-default font-semibold',
              activeStyles
            )
          : 'hover:font-normal'
      }
      className={cn(
        'flex items-center gap-4 rounded-md p-2 transition-all duration-100 ease-in hover:bg-slate-200',
        className
      )}
    >
      {icon}

      {title}
    </NavLink>
  );
};
