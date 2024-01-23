import Link from 'next/link';
import { FaEthereum } from 'react-icons/fa';
import { Container } from './Container';
import { Button } from './ui/button';

export const HomepageHeader = () => {
  return (
    <header className='relative overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.5))] bg-cover bg-bottom bg-no-repeat text-white'>
      <div className='absolute top-0 -z-10 h-full w-full'>
        <video
          src='/videos/header-video.mp4'
          muted
          loop
          autoPlay
          className='absolute h-full w-full bg-slate-900 object-cover'
        />
      </div>
      <Container className='flex h-[calc(100dvh-4rem)] max-h-[910px]  items-center justify-center'>
        <div className='flex flex-col gap-[30px] text-center md:gap-[40px]'>
          <div className='space-y-4 md:space-y-5'>
            <h1 className='text-5xl font-medium leading-tight md:text-7xl'>
              Welcome to EthFundMe!
            </h1>

            <p className='mx-auto max-w-xs text-center text-lg text-white/80 sm:max-w-lg sm:text-xl md:max-w-3xl md:text-3xl'>
              Support projects and causes you care about with the power of
              blockchain.
            </p>
          </div>

          <div className='mx-auto flex max-w-[200px] flex-col items-stretch justify-center gap-4 sm:max-w-fit sm:flex-row sm:items-center'>
            <Button asChild size='lg' className='text-md'>
              <Link
                href='/campaigns'
                className='group relative flex min-w-[150px] items-center justify-center gap-1 overflow-hidden hover:bg-opacity-100'
              >
                <span className='transition-all duration-200 ease-in sm:group-hover:-translate-x-3'>
                  Donate now
                </span>
                <span className='-right-8 top-1/2 transition-all duration-200 ease-in group-hover:right-3 group-hover:opacity-100 sm:absolute sm:-translate-y-1/2'>
                  <FaEthereum />
                </span>
              </Link>
            </Button>

            <Button asChild variant='secondary' size='lg' className='text-md'>
              <Link href='/campaigns/create'>Create Campaign</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
