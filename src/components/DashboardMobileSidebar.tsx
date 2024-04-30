'use client';

import { NavLink } from './NavLink';

export default function DashboardMobileSidebar({
  routes,
}: {
  routes: { link: string; title: string; icon: React.ReactNode }[];
}) {
  return (
    <aside className='-ml-4 bg-white md:hidden'>
      <div className='fixed bottom-0 z-50 h-14 w-full bg-white'>
        <ul className='flex items-center justify-between p-2'>
          {routes.map((route, idx) => (
            <li key={idx} title={route.title}>
              <NavLink
                href={route.link}
                activeStyles={({ isActive }) =>
                  isActive
                    ? 'bg-primary-default hover:bg-opacity-80 text-white font-semibold'
                    : 'hover:bg-slate-200'
                }
                className='flex items-center justify-center rounded-md p-3 text-center'
              >
                <span className='text-3xl font-bold'>{route.icon}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
