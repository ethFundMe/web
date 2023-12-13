'use client';

import { NavLink } from './NavLink';

export const FooterLink = ({
  title,
  link,
}: {
  title: string;
  link: string;
}) => {
  return (
    <NavLink
      activeStyles={({ isActive }) => {
        return isActive ? 'font-bold text-cyan-400' : '';
      }}
      href={link}
      className='hover:text-cyan-400'
    >
      {title}
    </NavLink>
  );
};
