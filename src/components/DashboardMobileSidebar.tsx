'use client';

import { NavLink } from './NavLink';

export default function DashboardMobileSidebar({
  routes,
}: {
  routes: { link: string; title: string; icon: React.ReactNode }[];
}) {
  return (
    <aside className='-ml-4 w-16 flex-shrink-0 p-4 pl-0 md:hidden'>
      <div className='fixed top-16 h-full w-16 border-r-2 border-r-slate-300 bg-white'>
        <ul className='space-y-5 px-2'>
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
                <span className='text-2xl font-bold'>{route.icon}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
