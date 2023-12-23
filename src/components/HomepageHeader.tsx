import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Container } from './Container';
import { ButtonStyle } from './inputs/Button';

export const HomepageHeader = () => {
  return (
    <header className='bg-[linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85),rgba(0,0,0,0.5)),url(/images/homepage-header.jpg)] bg-cover bg-bottom bg-no-repeat text-white'>
      <Container className='flex h-full min-h-[calc(100vh-5rem)] items-center justify-center md:min-h-[calc(100vh-6rem)]'>
        <div className='flex flex-col gap-[30px] text-center md:gap-[40px]'>
          <div className='space-y-4 md:space-y-5'>
            <h1 className='text-5xl font-bold leading-tight md:text-7xl'>
              Welcome to EthFundMe!
            </h1>

            <p className='mx-auto max-w-xs text-center text-lg sm:max-w-lg sm:text-xl md:max-w-3xl md:text-3xl'>
              Support projects and causes you care about with the power of
              blockchain.
            </p>
          </div>

          <div className='flex justify-center gap-4'>
            <Link
              href='/campaigns'
              className={cn(
                ButtonStyle.base,
                ButtonStyle.size.md,
                ButtonStyle.variant.primary
              )}
            >
              Donate now
            </Link>

            <Link
              href='/campaigns/create'
              className={cn(
                ButtonStyle.base,
                ButtonStyle.variant.blanc,
                ButtonStyle.size.md
              )}
            >
              Create Campaign
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
