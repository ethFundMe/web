'use client';

import { formatWalletAddress } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useAccount } from 'wagmi';

export const UserProfile = ({ ethAddress }: { ethAddress?: `0x${string}` }) => {
  const { address } = useAccount();

  // if (ethAddress) {
  //   const user = getUserFromDB();
  //   if (!user) notFound();
  // }

  if (!ethAddress && !address) notFound();

  return (
    <div className='w-full'>
      <div className='flex-1 rounded-md bg-slate-50'>
        <div className='header'>
          <div className='banner h-40 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.5)),url(/images/efm-header.png)] bg-cover bg-center bg-no-repeat lg:h-52'></div>

          <div className='flex items-end gap-4 p-4 lg:px-8'>
            <div className='image h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-300 shadow shadow-slate-200 md:h-24 md:w-24'>
              <Image
                className='h-full w-full object-cover'
                src={'/images/user-pfp.jpg'}
                height={300}
                width={300}
                alt='user-pfp'
              />
            </div>

            <div className='flex flex-1 items-end justify-between'>
              <div>
                <p className='text-xl font-bold md:text-3xl'>John Doe</p>
                <p>
                  {formatWalletAddress(
                    (address || ethAddress) as `0x${string}`
                  )}
                </p>
              </div>

              <p className='text-sm'>Verified creator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
