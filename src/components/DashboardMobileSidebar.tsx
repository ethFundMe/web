'use client';

import { NavLink } from './NavLink';

export default function DashboardMobileSidebar({
  routes,
}: {
  routes: { link: string; title: string; icon: React.ReactNode }[];
}) {
  return (
    <div className='fixed bottom-4 left-1/2 z-50 mx-auto  w-fit -translate-x-1/2 rounded-3xl border border-slate-200 bg-white opacity-100 hover:border-slate-200 hover:opacity-100 sm:border-transparent sm:opacity-80'>
      <ul className='flex items-center justify-center gap-5 px-4 py-2'>
        {routes.map((route, idx) => (
          <li key={idx} title={route.title}>
            <NavLink
              href={route.link}
              activeStyles={({ isActive }) =>
                isActive
                  ? 'bg-primary-default hover:bg-opacity-80 text-white font-semibold'
                  : 'hover:bg-slate-200'
              }
              className='flex items-center justify-center rounded-xl p-2 text-center sm:rounded-2xl sm:p-3'
            >
              <span className='text-2xl font-bold sm:text-3xl'>
                {route.icon}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
