import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button';
import { Container } from '../Container';
import { InputGroup } from '../formElements/InputGroup';
import { TextAreaInputGroup } from '../formElements/TextArea';

export const Footer = () => {
  return (
    <footer className='bg-primaryDark text-white'>
      <Container className='py-16 text-sm'>
        <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
          <Link
            href='/'
            className='block h-[50px] w-[50px] rounded-full bg-white'
          >
            <Image
              className='h-full w-auto'
              src='/images/Logo-Virgin.png'
              width={50}
              height={50}
              alt='logo'
            />
          </Link>

          <div className='space-y-4'>
            <h3 className='text-base font-semibold'>Useful links</h3>

            <ul className='flex  flex-wrap gap-2'>
              <li className='hover:text-cyan-400'>
                <Link href='/campaigns'>Campaigns</Link>
              </li>
              <li className='hover:text-cyan-400'>
                <Link href='/how-to-donate'>How To Donate</Link>
              </li>
              <li className='hover:text-cyan-400'>
                <Link href='/how-to-create-campaign'>
                  How To Create Campiagns
                </Link>
              </li>
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
          <p>EthFundMe</p>
        </div>
      </Container>
    </footer>
  );
};
