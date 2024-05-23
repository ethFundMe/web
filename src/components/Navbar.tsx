'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { cn, formatWalletAddress } from '@/lib/utils';
import { userStore } from '@/store';
import { useModalStore } from '@/store/modal';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { getCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import { Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { AuthNavbarMenu } from './AuthNavbarMenu';
import { Container } from './Container';
import ImageWithFallback from './ImageWithFallback';
import { NavLink } from './NavLink';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const { openModal, setModalOptions } = useModalStore();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { user } = userStore();

  return (
    <motion.nav
      className={cn('sticky top-0 z-30 h-16 w-full bg-white py-1.5 text-black')}
    >
      <Container className='flex h-full items-center justify-between gap-4'>
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

          {isConnected && (
            <DropdownMenu>
              <DropdownMenuTrigger className='relative active:border-none active:outline-none'>
                {/* <svg data-src="https://s2.svgbox.net/octicons.svg?ic=bell-fill" width="32" height="32" color="#e4e4e4" /> */}
                <Bell />
                <p className='absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center  rounded-full bg-rose-400 text-[10px] text-white'>
                  4
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='max-w-md space-y-2 rounded-md border px-0 py-2 text-sm'>
                <div className='flex items-center justify-between border-b p-2'>
                  <p>Notifications</p>
                  <button className='rounded-md bg-primary-default p-2 text-xs font-semibold text-white'>
                    Mark all as read
                  </button>
                </div>
                <DropdownMenuItem className='relative block w-full p-0'>
                  <div className='flex gap-x-4 bg-primary-default/10'>
                    {/* <div className='rounded-full !w-6 !h-6 bg-gray-500'></div> */}
                    <div className='full border-l-4 border-primary-dark'>
                      <p className='w-full px-2 text-right text-[10px]'>
                        Today, 2:45pm
                      </p>
                      <div className='p-2 pl-6 pt-0'>
                        <h3 className='text-sm font-semibold text-gray-400'>
                          Campaign Funded
                        </h3>
                        <p className='text-xs'>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Ipsam, consectetur. Quis, porro ducimus.
                          Exercitationem harum hic aspernatur officiis nemo
                          suscipit quia!
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='relative block w-full p-0'>
                  <div className='flex gap-x-4 bg-primary-default/10'>
                    {/* <div className='rounded-full !w-6 !h-6 bg-gray-500'></div> */}
                    <div className='full border-l-4 border-primary-dark'>
                      <p className='w-full px-2 text-right text-[10px]'>
                        Today, 2:45pm
                      </p>
                      <div className='p-2 pl-6 pt-0'>
                        <h3 className='text-sm font-semibold text-gray-400'>
                          Campaign Funded
                        </h3>
                        <p className='text-xs'>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Ipsam, consectetur. Quis, porro ducimus.
                          Exercitationem harum hic aspernatur officiis nemo
                          suscipit quia!
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <p className='font-semibold'>{formatWalletAddress(address)}</p>
                <ChevronDown size={10} />
              </div>
            </AuthNavbarMenu>
          ) : (
            <Button onClick={openConnectModal} type='button'>
              Connect Wallet
            </Button>
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
