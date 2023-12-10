'use client';

import { cn, formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { FaUnlink } from 'react-icons/fa';
import { useAccount, useDisconnect } from 'wagmi';
import ModalContent from './connect-wallet/ModalContent';

export const ConnectWallet = ({
  variant = 'navbar',
}: {
  variant?: 'navbar' | 'sidebar';
}) => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { openModal, closeModal } = useModalStore();

  const [showDisconnect, setShowDisconnect] = useState(false);

  const variantStyles: Record<'navbar' | 'sidebar', string> = {
    navbar: 'top-[120%]',
    sidebar: 'bottom-[80%]',
  };

  useEffect(() => {
    if (isConnected && !address) {
      closeModal();
    }
  }, [isConnected, closeModal, address]);

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
      <div
        onClick={() => setShowDisconnect((prev) => !prev)}
        className={cn(
          'relative flex cursor-pointer items-center gap-2',
          variant === 'sidebar' && 'w-full rounded-md bg-slate-200 p-2'
        )}
      >
        <Image
          className='h-8 w-8 flex-shrink-0 rounded-full bg-slate-200 object-cover'
          src='/images/Logo-Virgin.png'
          alt='ENS Avatar'
          width={70}
          height={70}
        />
        <div>{formatWalletAddress(address)}</div>

        {showDisconnect && (
          <button
            className={cn(
              'disconnect-btn absolute right-0 flex cursor-pointer items-center gap-2 rounded-md bg-white p-2 text-sm text-black shadow-sm shadow-neutral-400 hover:bg-slate-100',
              variantStyles[variant]
            )}
            onClick={() => disconnect()}
          >
            Disconnect
            <FaUnlink />
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <button
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
