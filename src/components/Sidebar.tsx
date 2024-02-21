'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { NavbarRoute } from '@/lib/types';
import { useModalStore } from '@/store';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { AuthSidebarRoute } from './AuthSidebarRoute';
import { NavLink } from './NavLink';
import { SidebarUserCard } from './SidebarUserCard';
import { Button } from './ui/button';

export const Sidebar = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();
  // const { closeModal } = useModalStore();

  return (
    <motion.div
      animate={{ right: ['-100%', '0%'] }}
      exit={{ right: '-100%' }}
      className='fixed right-0 top-0 h-[100dvh] w-[80%] rounded-l-2xl bg-white p-2 py-4 sm:w-[400px] sm:p-4'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='inner scrollbar-hidden relative flex h-full flex-col justify-between gap-10 overflow-auto px-6 sm:px-6'
      >
        <SidebarUserCard />

        <ul className='flex-1 space-y-2'>
          <AuthSidebarRoute />
          {NAVBARROUTES.map((route) => (
            <SidebarNavLink key={route.title} {...route} />
          ))}
        </ul>

        {isConnected && address ? (
          <Button
            className='rounded-lg bg-red-900 text-lg font-bold text-white hover:bg-red-900/90'
            onClick={openAccountModal}
            size='lg'
          >
            Disconnect
          </Button>
        ) : (
          <Button
            size='lg'
            className='rounded-lg bg-primary-dark text-lg font-bold hover:bg-primary-dark/90'
            onClick={openConnectModal}
          >
            Connect Wallet
          </Button>
        )}

        <Image
          alt='efm-logo'
          width={130}
          height={80}
          className='mx-auto grayscale filter'
          src='/images/efm-logo.svg'
        />
      </div>
    </motion.div>
  );
};

export const SidebarNavLink = ({ title, link, icon }: NavbarRoute) => {
  const { closeModal } = useModalStore();

  return (
    <li onClick={closeModal}>
      <NavLink
        href={link}
        activeStyles={({ isActive }) =>
          isActive
            ? 'text-primary-default pl-4 font-bold text-xl text-xl'
            : 'hover:font-normal text-lg'
        }
        className='flex items-center gap-4 rounded-md py-2 pl-4 transition-all duration-100 ease-in hover:bg-slate-100'
      >
        {icon}

        {title}
      </NavLink>
    </li>
  );
};
