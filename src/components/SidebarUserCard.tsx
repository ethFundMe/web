'use client';

import { cn, formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import Link from 'next/link';
import { FaPen, FaUnlink } from 'react-icons/fa';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectWallet } from './ConnectWallet';
import { buttonVariants } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

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
    <div className='flex items-start justify-between'>
      <div className='space-y-1'>
        <Image
          className='h-12 w-12 flex-shrink-0 rounded-full md:h-20 md:w-20'
          src={image ?? 'https://picsum.photos/300/300'}
          width={50}
          height={50}
          alt='...'
        />

        <>
          <p className='line-clamp-1 text-lg font-bold'>Bernard Eyram Franz </p>

          {address && <p>{formatWalletAddress(address)}</p>}

          <Dialog>
            <DialogTrigger>
              <button className='flex w-fit items-center gap-2 rounded-md py-1 text-red-400 hover:bg-slate-900 hover:bg-opacity-50 hover:px-2'>
                Disconnect <FaUnlink />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Sure to disconnect wallet?</DialogTitle>

              <div className='grid grid-cols-2 gap-4'>
                <DialogClose
                  onClick={() => disconnect()}
                  className={buttonVariants({ variant: 'default' })}
                >
                  Confirm
                </DialogClose>
                <DialogClose
                  className={cn(
                    buttonVariants(),
                    'bg-slate-300 text-red-500 hover:bg-slate-300/80'
                  )}
                >
                  Cancel
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
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
