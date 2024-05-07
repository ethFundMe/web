'use client';

import { getCookie } from 'cookies-next';
import { LiaUserCogSolid } from 'react-icons/lia';
import { useAccount } from 'wagmi';
import { SidebarNavLink } from './Sidebar';

export const AuthSidebarRoute = () => {
  const { address } = useAccount();

  if (!address || !getCookie('efmToken')) return;

  return (
    <SidebarNavLink
      link={`/dashboard/${address}`}
      title='Dashboard'
      icon={<LiaUserCogSolid size={20} />}
    />
  );
};
