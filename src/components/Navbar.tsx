import { NAVBARROUTES } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Container } from './Container';

export const Navbar = () => {
  return (
    <nav className='h-20 py-2 md:h-24 md:py-4'>
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

        <form className='hidden h-full w-full max-w-xs items-center overflow-hidden rounded-md border border-primary sm:flex '>
          <input
            type='text'
            className='flex-1 bg-transparent px-3 py-2 outline-0'
            placeholder='Search for campaigns'
          />

          <button className='h-full bg-primary px-2 text-white hover:bg-opacity-80 md:px-4'>
            <FaSearch />
          </button>
        </form>

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
        </ul>

        <button className='block md:hidden'>
          <FaBars />
        </button>
      </Container>
    </nav>
  );
};
