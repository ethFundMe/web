'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { ConnectWallet } from './ConnectWallet';
import { Container } from './Container';
import { Sidebar } from './Sidebar';

type NavbarProps = {
  initialTransparent?: boolean;
  fixedToTop?: boolean;
};

const Navbar = ({
  initialTransparent = false,
  fixedToTop = true,
}: NavbarProps) => {
  const [floatingNav, setFloatingNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setFloatingNav(true);
        return;
      }
      setFloatingNav(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { openModal, setModalOptions } = useModalStore();

  return (
    <motion.nav
      animate={{
        opacity: floatingNav && fixedToTop ? [0, 1] : 1,
        position: floatingNav && fixedToTop ? 'fixed' : 'static',
        top: floatingNav && fixedToTop ? [-20, 0] : 0,
        transition: { type: 'spring', damping: 13 },
      }}
      className={cn(
        'h-20 py-2 md:h-24 md:py-4',
        initialTransparent ? 'bg-transparent' : 'bg-white',
        fixedToTop && floatingNav
          ? 'top-0 z-20 w-full bg-white text-black md:h-20 md:py-2'
          : 'bg-transparent'
      )}
    >
      <Container className='flex h-full items-center justify-between gap-4'>
        <Link href='/' className='h-full'>
          <Image
            className='h-full w-auto'
            src='/images/logo-full.png'
            width={50}
            height={50}
            alt='logo'
          />
        </Link>

        <ul className='hidden items-center gap-5 md:flex'>
          {NAVBARROUTES.map((route) => (
            <li key={route.link}>
              <Link href={route.link} className=''>
                {route.title}
              </Link>
            </li>
          ))}

          <ConnectWallet />
        </ul>

        <button
          className='block md:hidden'
          onClick={() => {
            openModal(<Sidebar />);
            setModalOptions({ hideContent: true });
          }}
        >
          <FaBars />
        </button>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
