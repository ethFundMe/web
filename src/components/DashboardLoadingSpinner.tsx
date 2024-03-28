import { Loader } from 'lucide-react';
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

      <div className='mx-auto mt-8 w-fit'>
        <Loader className='animate-spin text-primary-default' />
      </div>
    </div>
  );
}
