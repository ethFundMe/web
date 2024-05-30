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
import { MdOutlineCampaign } from 'react-icons/md';
import useSWR from 'swr';
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

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const Navbar = () => {
  const { openModal, setModalOptions } = useModalStore();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { user } = userStore();
  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  const { data, error, isLoading } = useSWR(
    `${apiBaseUrl}/api/notifications/${user?.ethAddress}`,
    fetcher
  );
  console.log(data);
  console.log(error);

  function formatDateToHumanReadable(dateString: Date): string {
    const date = new Date(dateString);
    const now = new Date();

    const timeDifference = now.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    const formatTime = (date: Date): string => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes}${period}`;
    };

    if (daysDifference === 0) {
      return `today, ${formatTime(date)}`;
    } else if (daysDifference === 1) {
      return `yesterday, ${formatTime(date)}`;
    } else {
      return `${daysDifference} days ago`;
    }
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
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
                <Bell />
                <p className='absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center  rounded-full bg-rose-400 text-[10px] text-white'>
                  4
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='max-h-md min-h-96 min-w-80 max-w-md overflow-y-auto rounded-md border px-0 py-2 text-sm'>
                <>
                  <div className='flex items-center justify-between border-b p-2'>
                    <p>Notifications</p>
                    <button className='rounded-md p-2 text-xs font-semibold text-primary-default'>
                      Mark all as read
                    </button>
                  </div>
                  {data.notification?.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className='relative block w-full border-b p-0'
                    >
                      <div className='flex items-center gap-x-2'>
                        <div className='pl-3'>
                          {MdOutlineCampaign({ size: 22 })}
                        </div>
                        <div className='full'>
                          <p className='w-full pr-2 text-right text-[10px]'>
                            {formatDateToHumanReadable(
                              item?.created_at as Date
                            )}
                          </p>
                          <div className='p-2 pt-0'>
                            <h3 className='text-sm font-semibold capitalize text-gray-400'>
                              {item.notification_type}
                            </h3>
                            <p className='text-xs'>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </>
                {/* <div className='w-full flex justify-center items-center h-full'>
                  <div className='flex justify-center items-center flex-col h-full w-full'>
                    <Inbox size={60} color="#000" strokeWidth={0.75} absoluteStrokeWidth className='p-3 rounded-full bg-gray-100'/>
                      <h4 className='pt-2 '>No new notifications</h4>
                  </div>
                </div> */}
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
