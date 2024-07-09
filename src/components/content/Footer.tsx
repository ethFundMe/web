'use client';

import { NAVBARROUTES, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Particles from '../animations/DottedParticles';
import { Container } from '../Container';
import { FooterLink } from '../FooterLink';
import { Button, Input, Textarea } from '../inputs';

export const Footer = () => {
  const pathname = usePathname();

  const onDashboardPage = pathname.includes('/dashboard');

  return (
    <footer
      className={cn(
        'relative bg-primary-dark text-white',
        onDashboardPage && 'hidden md:block'
      )}
    >
      {/* <div id='space'>
        <div className='stars'></div>
        <div className='stars'></div>
        <div className='stars'></div>
        <div className='stars'></div>
      </div> */}
      <Container className='relative z-10 py-16 text-sm'>
        <div className='relative space-y-8'>
          <div className='flex flex-col items-stretch gap-8 md:flex-row md:items-center md:justify-between'>
            <Link
              href='/'
              className='grid h-12 w-12 place-content-center  overflow-hidden rounded-full bg-white md:h-16 md:w-16'
            >
              <Image
                className='h-10 w-10'
                src='/images/Logo-Virgin.png'
                width={50}
                height={50}
                alt='logo'
              />
            </Link>

            <div className='space-y-4'>
              <ul className='flex flex-wrap gap-4 md:gap-8'>
                {NAVBARROUTES.map(({ title, link }) => (
                  <li key={title}>
                    <FooterLink link={link} title={title} />
                  </li>
                ))}
                <li>
                  <FooterLink
                    link='/legal/privacy-policy'
                    title='Privacy Policy'
                  />
                </li>
                <li>
                  <FooterLink
                    link='/legal/terms-and-conditions'
                    title='Terms and Conditions'
                  />
                </li>
              </ul>
            </div>

            <div className='hidden space-y-4'>
              <h3 className='text-base font-semibold'>Send us an email</h3>

              <form className='space-y-3 bg-white bg-opacity-40 p-4'>
                <Input
                  label='Email'
                  className='p-0 text-black'
                  id='email'
                  placeholder='Enter your email'
                />

                <Textarea
                  label='Message'
                  className=' max-h-52 text-black'
                  placeholder='Enter message'
                />

                <Button wide>Send</Button>
              </form>
            </div>
          </div>

          <div className='flex w-full justify-end'>
            {process.env.NEXT_PUBLIC_WEB_URL === 'https://ethfundme.com' && (
              <Link href='/campaigns/0' className='block'>
                Support EthFundMe
              </Link>
            )}
          </div>
          <div className='h-[1px] bg-neutral-400' />

          <div className='flex justify-between'>
            <p>
              Copyright &copy; {new Date().getFullYear()} All rights reserved
            </p>

            <ul className='flex items-center gap-4'>
              {SOCIAL_LINKS.map(({ name, href, icon }) => (
                <li key={name}>
                  <Link href={href} title={name}>
                    {icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-wrap justify-center gap-4 md:justify-start'></div>
        </div>
      </Container>
      <Particles
        className='absolute inset-0'
        quantity={150}
        ease={80}
        color={'#f8f8f8'}
        refresh
      />
    </footer>
  );
};
