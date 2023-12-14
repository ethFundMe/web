'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { ConnectWallet } from './ConnectWallet';
import { Container } from './Container';
import { NavLink } from './NavLink';
import { Sidebar } from './Sidebar';

const Navbar = () => {
  const { openModal, setModalOptions } = useModalStore();

  return (
    <motion.nav
      className={cn(
        'sticky top-0 z-30 h-20 w-full bg-white py-2 text-black md:h-24'
      )}
    >
      <Container className='flex h-full items-center justify-between gap-4'>
        <Link href='/' className='mb-2 h-1/2'>
          <Image
            className='h-full w-auto'
            src='/images/efm-logo.svg'
            width={50}
            height={200}
            alt='logo'
          />
        </Link>

        <ul className='hidden items-center gap-5 lg:flex'>
          {NAVBARROUTES.map((route) => (
            <li key={route.link}>
              <NavLink
                activeStyles={({ isActive }) =>
                  isActive ? 'font-semibold text-primary-default' : ''
                }
                href={route.link}
                className='block hover:scale-95'
              >
                {route.title}
              </NavLink>
            </li>
          ))}

          <ConnectWallet />
        </ul>

        <button
          className='block lg:hidden'
          onClick={() => {
            openModal(<Sidebar />);
            setModalOptions({ hideContent: true });
          }}
        >
          <FaBars size={20} />
        </button>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
