'use client';

import { NavbarRoute } from '@/lib/types';
import { userStore } from '@/store';
import { useRouter } from 'next/navigation';
import { BiUser } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { IoPencilOutline, IoTrashBin } from 'react-icons/io5';
import { useAccount } from 'wagmi';
import { NavLink } from './NavLink';

export const DashboardSidebar = () => {
  const { address } = useAccount();
  const { user } = userStore();
  const { push } = useRouter();

  if (!user) {
    push('/');
    return;
  }

  if (user.ethAddress !== address) {
    push('/');
    return;
  }

  return (
    <aside className=' w-60 flex-shrink-0 p-4 pl-0'>
      <div className='fixed top-16 w-[14rem]'>
        <ul className='space-y-4'>
          <SidebarNavLink
            link={`/dashboard/${address}`}
            title='My profile'
            icon={<BiUser />}
          />
          <SidebarNavLink
            link={`/dashboard/${address}/update-profile`}
            title='Update profile'
            icon={<IoPencilOutline />}
          />
          <SidebarNavLink
            link={`/dashboard/${address}/delete-account`}
            title='Delete account'
            icon={<IoTrashBin />}
          />
          <SidebarNavLink
            link={`/dashboard/${address}/earnings`}
            title='Earnings'
            icon={<FaEthereum />}
          />
        </ul>
      </div>
    </aside>
  );
};

const SidebarNavLink = ({ title, link, icon }: NavbarRoute) => {
  return (
    <li>
      <NavLink
        href={link}
        activeStyles={({ isActive }) =>
          isActive
            ? 'bg-primary-default text-white hover:bg-primary-default font-semibold'
            : 'hover:font-normal'
        }
        className='flex items-center gap-4 rounded-md p-2 transition-all duration-100 ease-in hover:bg-slate-200'
      >
        {icon}

        {title}
      </NavLink>
    </li>
  );
};
