import Image from 'next/image';

export default function DashboardLoadingSpinner() {
  return (
    <div className='mx-auto mt-20 flex h-[50vh] max-h-[600px] max-w-sm flex-col'>
      <Image
        className='mx-auto opacity-50'
        src='/images/efm-logo.svg'
        width={200}
        height={200}
        alt='logo'
      />

      <div className='mx-auto mt-4 h-8 w-8 animate-spin rounded-full border-2 border-r-0 border-primary-default lg:h-16 lg:w-16'></div>
    </div>
  );
}
