import Image from 'next/image';

export default function DashboardLoadingSpinner() {
  return (
    <div className='mx-auto mt-20 flex h-[50vh] max-h-[600px] max-w-sm animate-pulse flex-col'>
      <Image
        className='mx-auto opacity-50'
        src='/images/Logo-Virgin.png'
        width={150}
        height={150}
        alt='logo'
        priority
      />
    </div>
  );
}
