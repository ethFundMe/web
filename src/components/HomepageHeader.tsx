import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaEthereum } from 'react-icons/fa';
import { ButtonStyle } from './Button';
import { Container } from './Container';

export const HomepageHeader = () => {
  return (
    <header className='bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.5)),url(/images/efm-header.png)] bg-cover bg-bottom bg-no-repeat text-white'>
      <Container className='flex h-full min-h-[calc(100vh-5rem)]  items-center justify-center md:min-h-[calc(100vh-6rem)]'>
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
                ButtonStyle.variant.primary,
                'group relative flex w-1/4 items-center justify-center gap-1 overflow-hidden hover:bg-opacity-100'
              )}
            >
              <span className='transition-all duration-200 ease-in group-hover:-translate-x-3'>
                Donate now
              </span>
              <span className='absolute -right-8 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in group-hover:right-7 group-hover:opacity-100 '>
                <FaEthereum />
              </span>
            </Link>

            <Link
              href='/campaigns/create'
              className={cn(
                ButtonStyle.base,
                ButtonStyle.variant.blanc,
                ButtonStyle.size.md,
                'hover:bg-slate-200 hover:bg-opacity-100'
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
