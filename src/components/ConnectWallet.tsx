'use client';

import { formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { Suspense } from 'react';
import { useAccount } from 'wagmi';
import { AuthNavbarMenu } from './AuthNavbarMenu';
import ModalContent from './connect-wallet/ModalContent';
import { Button } from './ui/button';

export const ConnectWallet = () => {
  const { isConnected, address } = useAccount();
  const { openModal } = useModalStore();

  if (isConnected && address) {
    return (
      <AuthNavbarMenu>
        <div className='flex cursor-pointer items-center gap-x-3'>
          <div className='grid h-9 w-9 place-content-center rounded-full bg-slate-200'>
            <Image
              className='h-full w-full flex-shrink-0 object-cover'
              src='/images/user-pfp.png'
              alt='ENS Avatar'
              width={70}
              height={70}
            />
          </div>
          <p className='font-semibold'>{formatWalletAddress(address)}</p>
        </div>
      </AuthNavbarMenu>
    );
  }

  return (
    <>
      <Button
        className='transition-all duration-150 ease-in'
        onClick={() =>
          openModal(
            <Suspense>
              <ModalContent />
            </Suspense>
          )
        }
      >
        Connect Wallet
      </Button>
    </>
  );
};

export function getConnectorIcon(connectorName: string): string {
  if (connectorName === 'MetaMask') return '/images/MetaMask_Fox.svg.webp';
  if (connectorName === 'Coinbase Wallet') return '/images/coinbase-logo.webp';
  if (connectorName === 'WalletConnect')
    return '/images/wallet-connect-logo.png';

  return '/images/wallet-connect-logo.png';
}
