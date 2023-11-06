import Link from 'next/link';
import { Container } from './Container';
import Navbar from './Navbar';

export const HomepageHeader = () => {
  return (
    <header className='bg-[linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85),rgba(0,0,0,0.5)),url(/images/homepage-header.jpg)] bg-cover bg-bottom bg-no-repeat text-white'>
      <Navbar />

      <Container className='flex h-full min-h-[calc(100vh-5rem)] items-center justify-center md:min-h-[calc(100vh-6rem)]'>
        <div className='flex flex-col gap-[30px] text-center md:gap-[40px]'>
          <div className='space-y-4 md:space-y-5'>
            <h1 className={' font-bold leading-tight md:text-7xl'}>
              You Can Make <br /> A Difference
            </h1>

            <p className='text-lg md:text-2xl'>
              Together We Fund, Together We Grow
            </p>
          </div>

          <Link
            href='/'
            className='mx-auto block w-fit rounded-md bg-primary px-4 py-2 font-medium hover:bg-opacity-90 md:px-5 md:py-4'
          >
            Donate Now
          </Link>
        </div>
      </Container>
    </header>
  );
};
