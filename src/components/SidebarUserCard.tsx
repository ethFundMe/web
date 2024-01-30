'use client';

import { useSiwe } from '@/lib/hook';
import { formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { FaPen, FaUnlink } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';

export const SidebarUserCard = () => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  useSiwe();

  const view =
    isConnected && address ? (
      <div className='space-y-2 rounded-lg bg-primary-dark p-4 text-white'>
        <View address={address} />
      </div>
    ) : (
      <Button variant='dark' className='w-full' onClick={openConnectModal}>
        Connect Wallet
      </Button>
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

  return (
    <div className='flex items-start justify-between'>
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
          <p className='line-clamp-1 text-lg font-bold'>Bernard Eyram Franz </p>
          {address && <p>{formatWalletAddress(address)}</p>}
        </div>

        {/* <div className='grid w-full grid-cols-2 gap-4'> */}
        <Button
          size='sm'
          variant='dark'
          className='flex w-full items-center gap-2 rounded-md py-1 text-xs text-red-400 hover:bg-slate-900 hover:bg-opacity-50'
          onClick={openAccountModal}
        >
          <FaUnlink />
          Disconnect
        </Button>
        {/* </div> */}
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
  );
};
