import { Container } from '@/components/Container';
import { ButtonStyle } from '@/components/inputs';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <Image src='/images/efm-logo.svg' width={300} height={300} alt='logo' />

      <div className='space-y-4 text-center'>
        <h1 className='text-xl font-bold sm:text-3xl'>
          404 Error: Page Not Found
        </h1>
        <p className='text-lg'>
          We can&rsquo;t seem to find the page you&rsquo;re looking for.
        </p>

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
