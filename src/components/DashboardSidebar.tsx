'use client';

import { getDashboardRoutes } from '@/lib/dashboardRoutes';
import { NavbarRoute } from '@/lib/types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { useRouter } from 'next/navigation';
import DashboardMobileSidebar from './DashboardMobileSidebar';
import { NavLink } from './NavLink';

export const DashboardSidebar = ({
  userAddress,
}: {
  userAddress: `0x${string}`;
}) => {
  const { user } = userStore();
  const { push } = useRouter();

  if (!user || userAddress !== user.ethAddress) {
    push('/');
    return;
  }

  const routes = getDashboardRoutes(userAddress);

  return (
    <>
      <aside className='hidden w-60 flex-shrink-0 p-4 pl-0 md:block'>
        <div className='fixed top-16 w-[14rem]'>
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
