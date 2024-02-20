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
    <div className='border-b border-gray-300 py-6'>
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
          <div className='h-20 w-20 overflow-hidden rounded-full bg-slate-100'>
            <ImageWithFallback
              src={userDetails?.profileUrl ?? ''}
              fallback='/images/pfp.svg'
              width={300}
              height={300}
              alt={userDetails?.fullName ?? ''}
            />
          </div>

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
