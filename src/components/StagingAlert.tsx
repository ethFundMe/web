'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isMobile } from 'react-device-detect';

const StagingAlert = () => {
  const pathname = usePathname();
  // const isStaging =
  //   process.env.NEXT_PUBLIC_WEB_URL === 'https://sepolia.ethfund.me';
  const isStaging = process.env.NEXT_PUBLIC_WEB_URL === 'http://localhost:3000';
  const isMobileDashboard = pathname.includes('/dashboard') && isMobile;
  return (
    <>
      {isStaging && !isMobileDashboard && (
        <div className='fixed bottom-0 z-30 w-full text-black'>
          <div className='flex w-full justify-center bg-rose-200 py-1'>
            <Link
              href='https://ethfundme.com'
              target='_blank'
              className='text-center text-xs text-rose-500 md:text-sm'
            >
              This is Sepolia testnet. Click to switch to Ethereum mainnet.
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default StagingAlert;
