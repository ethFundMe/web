'use client';

import { NAVBARROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Container } from './Container';
import WalletConnect from './WalletConnect';

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

  return (
    <nav
      className={cn(
        'h-20 py-2 transition-all duration-500 ease-in-out md:h-24 md:py-4',
        initialTransparent ? 'bg-transparent' : 'bg-white',
        fixedToTop && floatingNav
          ? 'fixed top-0 z-40 w-full bg-white text-black md:h-20 md:py-2'
          : 'static bg-transparent'
      )}
    >
      <Container className='flex h-full items-center justify-between gap-4 py-3'>
        <Link href='/' className='h-full'>
          <Image
            className='h-full w-auto'
            src='/images/Logo-Virgin.png'
            width={50}
            height={50}
            alt='logo'
          />
        </Link>

        <ul className='hidden items-center gap-5 md:flex'>
          {NAVBARROUTES.map((route) => (
            <li key={route.link}>
              <Link
                href={route.link}
                className=' transition-all duration-150 ease-in hover:font-semibold'
              >
                {route.title}
              </Link>
            </li>
          ))}

          <WalletConnect />
        </ul>

        <button className='block md:hidden'>
          <FaBars />
        </button>
      </Container>
    </nav>
  );
};

export default Navbar;
