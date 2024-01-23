'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { cn, formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modal';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
// import { ConnectWallet } from './ConnectWallet';
import { useSiwe } from '@/lib/hook';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChevronDown } from 'lucide-react';
import { useAccount } from 'wagmi';
import { AuthNavbarMenu } from './AuthNavbarMenu';
import { Container } from './Container';
import { NavLink } from './NavLink';
import { Sidebar } from './Sidebar';

const Navbar = () => {
  const { openModal, setModalOptions } = useModalStore();
  useSiwe();
  const { address, isConnected } = useAccount();

  return (
    <motion.nav
      className={cn('sticky top-0 z-30 h-16 w-full bg-white py-1.5 text-black')}
    >
      <Container className='flex h-full items-center justify-between gap-4'>
        <Link href='/' className='mb-2 h-4/5 sm:h-1/2 sm:w-auto'>
          <Image
            className='h-[70%] w-auto sm:h-full'
            src='/images/efm-logo.svg'
            width={50}
            height={200}
            alt='logo'
          />
        </Link>

        <ul className='hidden items-center gap-8 lg:flex'>
          {NAVBARROUTES.map((route) => (
            <li key={route.link}>
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

          {address && isConnected ? (
            <AuthNavbarMenu>
              <div className='flex cursor-pointer items-center gap-x-3'>
                <div className='grid h-9 w-9 place-content-center rounded-full bg-slate-200'>
                  <Image
                    className='flex-shrink-0 object-cover'
                    src={'/images/pfp.svg'}
                    alt='ENS Avatar'
                    width={70}
                    height={70}
                  />
                </div>
                <p className='font-semibold'>{formatWalletAddress(address)}</p>
                <ChevronDown size={10} />
              </div>
            </AuthNavbarMenu>
          ) : (
            <ConnectButton showBalance={false} />
          )}
        </ul>

        <button
          className='block lg:hidden'
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
      </Container>
    </motion.nav>
  );
};

export default Navbar;
