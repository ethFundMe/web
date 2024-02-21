'use client';

import { getUser } from '@/actions';
import { formatWalletAddress } from '@/lib/utils';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ImageWithFallback from './ImageWithFallback';

export const SidebarUserCard = () => {
  const { isConnected, address } = useAccount();

  const view = (
    <div className='border-b border-gray-300 py-4 sm:py-6'>
      {isConnected && address ? (
        <View address={address} />
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

const View = ({ address }: { address?: `0x${string}` }) => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!address) return;
    getUser(address)
      .then((res) => {
        setLoading(false);
        setUserDetails(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [address]);

  return (
    <div className='flex items-center gap-4'>
      {!loading && (
        <>
          <ImageWithFallback
            className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-100 object-cover'
            src={userDetails?.profileUrl ?? ''}
            fallback='/images/pfp.svg'
            width={300}
            height={300}
            alt={userDetails?.fullName ?? ''}
          />

          <div>
            <p className='text-xl font-bold text-primary-default'>
              {userDetails?.fullName}
            </p>
            {userDetails?.ethAddress && (
              <p className='text-primary-dark'>
                {formatWalletAddress(userDetails?.ethAddress)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
