/* eslint-disable @next/next/no-img-element */
'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { cn, formatWalletAddress } from '@/lib/utils';
import { userStore } from '@/store';
import { useModalStore } from '@/store/modal';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { getCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { AuthNavbarMenu } from './AuthNavbarMenu';
import { Container } from './Container';
import ImageWithFallback from './ImageWithFallback';
import { NavLink } from './NavLink';
import Notifications from './Notifications';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';

const Navbar = () => {
  const { openModal, setModalOptions } = useModalStore();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { user } = userStore();
  return (
    <>
      <motion.nav
        className={cn('sticky top-0 z-30 h-16 w-full bg-white text-black')}
      >
        <Container className='flex h-full items-center justify-between gap-4 bg-white py-1.5'>
          <Link href='/' className='h-4/5 sm:h-1/2 sm:w-auto'>
            <Image
              className='h-[70%] w-auto sm:h-full'
              src='/images/efm-logo.svg'
              width={50}
              height={200}
              alt='logo'
            />
          </Link>
          <ul className='hidden items-center gap-8 lg:flex'>
            {NAVBARROUTES.map((route, idx) => (
              <li key={idx}>
                <NavLink
                  activeStyles={({ isActive }) =>
                    isActive
                      ? 'font-semibold text-primary-default'
                      : 'hover:text-primary-default'
                  }
                  href={route.link}
                >
                  {route.title}
                </NavLink>
              </li>
            ))}

            {isConnected && address && getCookie('efmToken') && (
              <Notifications />
            )}
            {isConnected && address && getCookie('efmToken') ? (
              <AuthNavbarMenu>
                <div className='flex cursor-pointer items-center gap-x-3'>
                  <div className='relative h-9 w-9 overflow-hidden rounded-full bg-slate-200'>
                    <ImageWithFallback
                      className='flex-shrink-0 object-cover'
                      src={user?.profileUrl || ''}
                      fallback='/images/user-pfp.png'
                      alt='ENS Avatar'
                      fill
                      sizes='100px'
                    />
                  </div>
                  <p className='font-semibold'>
                    {user?.username ?? formatWalletAddress(address)}
                  </p>
                  <ChevronDown size={10} />
                </div>
              </AuthNavbarMenu>
            ) : (
              <Button onClick={() => open()} type='button'>
                Connect Wallet
              </Button>
            )}
          </ul>
          <div className='flex items-center gap-x-5 lg:hidden'>
            <button
              className='block'
              onClick={() => {
                openModal(<Sidebar />);
                setModalOptions({ hideContent: true });
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 50 50'
              >
                <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z'></path>
              </svg>
            </button>
          </div>
        </Container>
      </motion.nav>
    </>
  );
};

export default Navbar;
