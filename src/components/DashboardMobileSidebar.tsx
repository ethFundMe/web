'use client';

import { NavLink } from './NavLink';

export default function DashboardMobileSidebar({
  routes,
}: {
  routes: { link: string; title: string; icon: React.ReactNode }[];
}) {
  return (
    <div className='fixed bottom-0 left-1/2 z-20 block w-full -translate-x-1/2 border-t bg-white bg-opacity-70 backdrop-blur hover:border-slate-200 hover:opacity-100 md:hidden'>
      <ul className='mx-auto flex max-w-[95%] items-center justify-around gap-1 px-1 py-2 sm:max-w-[80%] sm:gap-5 sm:px-4'>
        {routes.map((route, idx) => (
          <li key={idx} title={route.title}>
            <NavLink
              href={route.link}
              activeStyles={({ isActive }) =>
                isActive
                  ? 'bg-primary-default text-white font-semibold'
                  : 'text-primary-default/90'
              }
              className='flex touch-none items-center justify-center rounded-xl p-2 text-center text-white sm:rounded-2xl sm:p-3 md:touch-auto'
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
