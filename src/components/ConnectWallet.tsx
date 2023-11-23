'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { useState } from 'react';
import { FaUnlink } from 'react-icons/fa';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const ConnectWallet = ({
  variant = 'navbar',
}: {
  variant?: 'navbar' | 'sidebar';
}) => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { openModal } = useModalStore();

  const [showDisconnect, setShowDisconnect] = useState(false);

  const variantStyles: Record<'navbar' | 'sidebar', string> = {
    navbar: 'top-[120%]',
    sidebar: 'bottom-[80%]',
  };

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
              'absolute right-0 flex cursor-pointer items-center gap-2 rounded-md bg-white p-2 text-sm text-black shadow-sm shadow-neutral-400 hover:bg-slate-100',
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
      <button onClick={() => openModal(<ModalContent />)}>
        Connect Wallet
      </button>
    </>
  );
};

function getConnectorIcon(connectorName: string): string {
  if (connectorName === 'MetaMask') return '/images/MetaMask_Fox.svg.webp';
  if (connectorName === 'Coinbase Wallet') return '/images/coinbase-logo.webp';
  if (connectorName === 'WalletConnect')
    return '/images/wallet-connect-logo.png';

  return '/images/wallet-connect-logo.png';
}

function ModalContent() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  return (
    <div className='w-full rounded-md bg-white py-4 text-black sm:w-96 sm:max-w-md'>
      <h2 className={cn(TextSizeStyles.h4, 'text-center')}>Connect Wallet</h2>
      {error && <h5>{error.message}</h5>}

      <ul className='mt-4 space-y-2'>
        {connectors.map((connector) => (
          <>
            <WalletOption
              disabled={!connector.ready || isLoading}
              icon={getConnectorIcon(connector.name)}
              isLoading={isLoading && connector.id === pendingConnector?.id}
              title={connector.name}
              handleConnect={() => connect({ connector })}
            />
          </>
        ))}
      </ul>
    </div>
  );
}

function WalletOption({
  icon,
  title,
  isLoading,
  disabled = false,
  handleConnect,
}: {
  icon: string;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  handleConnect: () => void;
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-200',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      onClick={handleConnect}
    >
      <div className='grid h-12 w-12 place-content-center rounded-full bg-white'>
        <Image
          src={icon}
          className='h-8 w-8 object-cover'
          width={50}
          height={50}
          alt={title}
        />
      </div>

      <p className='text-lg font-semibold'>
        {isLoading ? 'Connecting...' : title}
      </p>
    </button>
  );
}
