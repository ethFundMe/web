import { ButtonStyle } from '@/components/Button';
import { Container } from '@/components/Container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container className='flex min-h-screen flex-col items-center justify-center'>
      <Image src='/images/logo-full.svg' width={300} height={300} alt='logo' />

      <div className='space-y-4 text-center'>
        <div className='space-y-2'>
          <h1 className='text-xl font-bold sm:text-3xl'>
            404 Error: Page Not found
          </h1>
          <p className='text-lg'>You seem a bit lost</p>
        </div>

        <Link
          href='/'
          className={cn(
            ButtonStyle.base,
            ButtonStyle.variant.primary,
            ' mx-auto block w-fit p-3'
          )}
        >
          Go home
        </Link>
      </div>
    </Container>
  );
}
