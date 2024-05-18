import { Container } from '@/components/Container';
import { ButtonStyle } from '@/components/inputs';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <Image src='/images/404.webp' width={200} height={200} alt='logo' />

      <div className='space-y-4 text-center'>
        <h1 className='text-xl font-bold sm:text-3xl'>Page Not Found</h1>
        <p className='text-lg'>
          404 Error — The requested page could not be found
        </p>

        <Link
          href='/'
          className={cn(
            ButtonStyle.base,
            ButtonStyle.variant.primary,
            ' mx-auto block w-fit p-3 px-6'
          )}
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </Container>
  );
}
