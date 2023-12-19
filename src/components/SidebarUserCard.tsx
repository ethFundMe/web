'use client';

import { formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import Link from 'next/link';
import { FaPen, FaUnlink } from 'react-icons/fa';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectWallet } from './ConnectWallet';

export const SidebarUserCard = () => {
  const { isConnected, address } = useAccount();

  const view =
    isConnected && address ? (
      <div className='space-y-2 rounded-lg bg-primary-default p-4 text-white'>
        <View address={address} />
      </div>
    ) : (
      <div className='flex flex-col rounded-lg bg-primary-default p-4 text-center text-white'>
        <ConnectWallet />
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
  const { disconnect } = useDisconnect();
  const { closeModal } = useModalStore();

  return (
    <>
      <Image
        className='h-12 w-12 flex-shrink-0 rounded-full md:h-20 md:w-20'
        src={image ?? 'https://picsum.photos/300/300'}
        width={50}
        height={50}
        alt='...'
      />

      <div className='flex flex-1 items-end justify-between'>
        <div>
          <p className='line-clamp-1 text-lg font-bold'>Bernard Eyram Franz </p>

          {address && <p>{formatWalletAddress(address)}</p>}
        </div>

        <div
          className='flex flex-shrink-0 flex-col items-end text-sm'
          onClick={closeModal}
        >
          <Link
            href={`/dashboard/${address}`}
            className='flex w-fit items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-900 hover:bg-opacity-50'
          >
            Update profile
            <FaPen />
          </Link>

          <button
            onClick={() => disconnect()}
            className='flex w-fit items-center justify-end gap-2 rounded-md px-2 py-1 hover:bg-slate-900 hover:bg-opacity-50'
          >
            Disconnect <FaUnlink />
          </button>
        </div>
      </div>
    </>
  );
};
