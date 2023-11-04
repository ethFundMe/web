import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center bg-black'>
      <Head>
        <title>Fund Me - Ethereum | Coming Soon</title>
      </Head>
      <div className='text-center text-white'>
        <Image
          className='mx-auto max-w-full'
          src='Logo-Virgin.png'
          alt='Coming Soon'
          width={300}
          height={300}
        />
        <p className='mt-4 text-xl font-bold'>Fund Me - Ethereum</p>
        <p className='mt-4 text-xl font-bold'>Coming Soon</p>
      </div>
    </div>
  );
}
