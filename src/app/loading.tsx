import { Container } from '@/components/Container';
import Image from 'next/image';

export default function Loading() {
  return (
    <Container className='flex min-h-screen flex-col items-center justify-center gap-2'>
      <Image src='/images/logo-full.png' width={300} height={300} alt='logo' />
      <div className='h-10 w-10 animate-spin rounded-full border-2 border-r-0 border-gray-900'></div>
    </Container>
  );
}
