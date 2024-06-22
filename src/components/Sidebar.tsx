'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { NavbarRoute } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useModalStore, userStore } from '@/store';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { getCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaRegBell } from 'react-icons/fa';
import useSWR from 'swr';
import { useAccount } from 'wagmi';
import { AuthSidebarRoute } from './AuthSidebarRoute';
import { NavLink } from './NavLink';
import { SidebarUserCard } from './SidebarUserCard';
import { Button } from './ui/button';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const Sidebar = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { user } = userStore();

  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  const { data: unreadCount } = useSWR<{
    total: number;
  }>(
    `${apiBaseUrl}/api/notifications/${user?.ethAddress}/count?viewed=false`,
    fetcher
  );

  // const { closeModal } = useModalStore();

  return (
    <motion.div
      animate={{ right: ['-100%', '0%'] }}
      exit={{ right: '-100%' }}
      className='fixed right-0 top-0 h-[100dvh] w-[80%] rounded-l-2xl bg-white p-2 py-4 sm:w-[400px] sm:p-4'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='inner scrollbar-hidden relative flex h-full flex-col justify-between gap-4 overflow-auto px-6 sm:px-6'
      >
        <SidebarUserCard />

        <ul className='flex-1 space-y-2'>
          <AuthSidebarRoute />
          {NAVBARROUTES.map((route) => (
            <SidebarNavLink key={route.title} {...route} />
          ))}
          {isConnected && address && getCookie('efmToken') && (
            <div className='relative'>
              <SidebarNavLink
                {...{
                  title: 'Notifications',
                  link: `/notifications/${user?.ethAddress}`,
                  icon: FaRegBell({ size: 20 }),
                }}
                className='relative'
              />
              {unreadCount?.total > 0 && (
                <p className='absolute left-6 top-1 flex h-4 w-4 items-center justify-center  rounded-full bg-[#f62442] text-[10px] text-white'>
                  {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full delay-300 duration-1000 bg-[#f62442] opacity-40"></span> */}
                  {unreadCount?.total}
                </p>
              )}
            </div>
          )}
        </ul>

        {isConnected && address && getCookie('efmToken') ? (
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

export const SidebarNavLink = ({
  title,
  link,
  icon,
  activeStyles,
  className,
  onClick,
}: NavbarRoute & {
  activeStyles?: string;
  className?: string;
  onClick?: VoidFunction;
}) => {
  const { closeModal } = useModalStore();

  return (
    <li
      onClick={() => {
        closeModal();
        if (onClick) {
          onClick();
        }
      }}
    >
      <NavLink
        href={link}
        activeStyles={({ isActive }) =>
          isActive
            ? cn('text-primary-default pl-4 font-bold text-xl', activeStyles)
            : 'hover:font-normal text-lg'
        }
        className={cn(
          'flex items-center gap-4 rounded-md py-2 pl-4 transition-all duration-100 ease-in hover:bg-slate-100',
          className
        )}
      >
        <div className='w-5'>{icon}</div>

        {title}
      </NavLink>
    </li>
  );
};
