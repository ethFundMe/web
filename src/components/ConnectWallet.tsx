'use client';

import { formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { AuthNavbarMenu } from './AuthNavbarMenu';
import ModalContent from './connect-wallet/ModalContent';

export const ConnectWallet = () => {
  const { isConnected, address } = useAccount();
  const { openModal } = useModalStore();

  const [showDisconnect, setShowDisconnect] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');

    const handleHideDisconnectBtn = (e: MouseEvent) => {
      if (
        showDisconnect &&
        !(e.target as HTMLElement).classList.contains('disconnect-btn')
      ) {
        setShowDisconnect(false);
      }
    };

    (body as HTMLElement).addEventListener('click', handleHideDisconnectBtn);
  }, [showDisconnect]);

  if (isConnected && address) {
    return (
      <div className='cursor-pointer'>
        <AuthNavbarMenu>
          <div className='flex items-center gap-3'>
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
      </div>
    );
  }

  return (
    <>
      <button
        className='transition-all duration-150 ease-in hover:text-primary-default'
        onClick={() =>
          openModal(
            <Suspense>
              <ModalContent />
            </Suspense>
          )
        }
      >
        Connect Wallet
      </button>
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
