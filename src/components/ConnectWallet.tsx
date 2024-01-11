'use client';

import { useSiwe } from '@/lib/hook';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store';
import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import { Suspense } from 'react';
import { useConnect } from 'wagmi';
import { AuthNavbarMenu } from './AuthNavbarMenu';
import { Button } from './ui/button';

export const ConnectWallet = () => {
  const { address } = useSiwe();
  const { openModal } = useModalStore();

  if (hasCookie('efmToken') && address) {
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

function ModalContent() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  return (
    <div className='w-full rounded-md bg-white py-4 text-black sm:w-96 sm:max-w-md'>
      <h2 className={cn(TextSizeStyles.h4, 'text-center')}>Connect Wallet</h2>
      {error && <h5>{error.message}</h5>}

      <ul className='mt-4 space-y-2 px-4'>
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
