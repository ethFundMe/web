'use client';

import { getUser } from '@/actions';
import { useSiwe } from '@/lib/hook';
import { formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store';
import { User } from '@/types';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPen, FaUnlink } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import ImageWithFallback from './ImageWithFallback';
import { Button } from './ui/button';

export const SidebarUserCard = () => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  useSiwe();

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

const View = ({
  address,
  image,
}: {
  address?: `0x${string}`;
  image?: string;
}) => {
  const { closeModal } = useModalStore();
  const { openAccountModal } = useAccountModal();

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
            <p className='text-lg font-bold text-primary-default'>
              {userDetails?.fullName}
            </p>
            {userDetails?.ethAddress && (
              <p>{formatWalletAddress(userDetails?.ethAddress)}</p>
            )}
          </div>
        </>
      )}

      <div className='hidden items-start justify-between'>
        <div className='space-y-2'>
          <Image
            priority
            className='h-12 w-12 flex-shrink-0 rounded-full bg-slate-200 md:h-20 md:w-20'
            src={image ?? '/images/pfp.svg'}
            width={50}
            height={50}
            alt='...'
          />

          <div>
            <p className='line-clamp-1 text-lg font-bold'>
              Bernard Eyram Franz{' '}
            </p>
            {address && <p>{formatWalletAddress(address)}</p>}
          </div>

          <Button
            size='sm'
            variant='dark'
            className='flex w-full items-center gap-2 rounded-md py-1 text-xs text-red-400 hover:bg-slate-900 hover:bg-opacity-50'
            onClick={openAccountModal}
          >
            <FaUnlink />
            Disconnect
          </Button>
        </div>

        <Link
          href={`/dashboard/${address}/update-profile`}
          title='Update profile'
          className='w-fit rounded-md p-2 hover:bg-slate-900 hover:bg-opacity-50'
          onClick={closeModal}
        >
          <FaPen />
        </Link>
      </div>
    </div>
  );
};
