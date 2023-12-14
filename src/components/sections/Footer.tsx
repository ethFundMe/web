import { NAVBARROUTES, SOCIAL_LINKS } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button';
import { Container } from '../Container';
import { FooterLink } from '../FooterLink';
import { InputGroup } from '../formElements/InputGroup';
import { TextAreaInputGroup } from '../formElements/TextArea';

export const Footer = () => {
  return (
    <footer className='bg-primary-dark text-white'>
      <Container className='py-16 text-sm'>
        <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
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
            <h3 className='text-base font-semibold'>Useful links</h3>

            <ul className='flex flex-wrap gap-4 md:gap-8'>
              {NAVBARROUTES.map(({ title, link }) => (
                <li key={title}>
                  <FooterLink link={link} title={title} />
                </li>
              ))}
            </ul>
          </div>

          <div className='hidden space-y-4'>
            <h3 className='text-base font-semibold'>Send us an email</h3>

            <form className='space-y-3 bg-white bg-opacity-40 p-4'>
              <InputGroup
                label='Email'
                className='p-0 text-black'
                id='email'
                placeholder='Enter your email'
              />

              <TextAreaInputGroup
                label='Message'
                className=' max-h-52 text-black'
                placeholder='Enter message'
              />

              <Button wide>Send</Button>
            </form>
          </div>
        </div>

        <div className='my-7 h-[1px] bg-neutral-400' />

        <div className='flex justify-between'>
          <p>Copyright &copy; {new Date().getFullYear()} All rights reserved</p>

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
      </Container>
    </footer>
  );
};
