'use client';

import { formatWalletAddress } from '@/lib/utils';
import { userStore } from '@/store';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import ImageWithFallback from './ImageWithFallback';

export const SidebarUserCard = () => {
  const { isConnected, address } = useAccount();

  const view = (
    <div className='border-b border-gray-300 py-4 sm:py-6'>
      {isConnected && address && getCookie('efmToken') ? (
        <View />
      ) : (
        <>
          <p className='mt-6 text-2xl font-bold text-primary-default'>
            <span className='text-primary-dark'>Please,</span> Connect Your
            Wallet
          </p>
        </>
      )}
    </div>
  );

  return view;
};

const View = () => {
  const { user } = userStore();

  return (
    <Link
      href={`/dashboard/${user?.ethAddress}`}
      className='flex items-center gap-4'
    >
      {
        <>
          <ImageWithFallback
            className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-100 object-cover'
            src={user?.profileUrl ? user.profileUrl : '/images/user-pfp.png'}
            fallback='/images/user-pfp.png'
            width={300}
            height={300}
            alt={user?.fullName ?? ''}
          />

          <div>
            <p className='text-xl font-bold text-primary-default'>
              {user?.fullName}
            </p>
            {user?.ethAddress && (
              <p className='text-primary-dark'>
                {user?.ethAddress && formatWalletAddress(user.ethAddress)}
              </p>
            )}
          </div>
        </>
      }
    </Link>
  );
};
