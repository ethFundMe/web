'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaUnlink } from 'react-icons/fa';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function WalletConnect() {
  const { openModal, closeModal } = useModalStore();

  const { address, isConnected } = useAccount();
  // const { connect, connectors, error, isLoading, pendingConnector } =
  //   useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    closeModal();

    return (
      <div className='relative flex items-center gap-2'>
        <Image
          className='h-8 w-8 flex-shrink-0 rounded-full bg-slate-200 object-cover'
          src='/images/Logo-Virgin.png'
          alt='ENS Avatar'
          width={70}
          height={70}
        />
        <div>{formatWalletAddress(address as string)}</div>

        <div
          className='buttom-0 absolute hidden items-center gap-2 rounded-md bg-white p-2 text-sm text-black'
          onClick={() => disconnect()}
        >
          Disconnect
          <FaUnlink />
        </div>
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
}

const ModalContent = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  // const ConnectorIcons = {
  //   MetaMask: '/images/MetaMask_Fox.svg.webp',
  //   'Coinbase Wallet': '/images/coinbase-logo.webp',
  //   WalletConnect: '/images/wallet-connect-logo.png',
  // };

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  return (
    <div className='w-full rounded-md bg-white py-4 text-black sm:w-96 sm:max-w-md'>
      <h2 className={cn(TextSizeStyles.h4, 'text-center')}>Connect Wallet</h2>

      <ul className='mt-4 space-y-2'>
        {connectors.map((connector) => (
          <>
            <WalletOption
              disabled={!connector.ready || isLoading}
              icon={'/images/coinbase-logo.webp'}
              isLoading={isLoading && connector.id === pendingConnector?.id}
              title={connector.name}
              handleConnect={() => connect({ connector })}
            />
          </>
        ))}
      </ul>
      {/* <ul className='mt-4 space-y-2'>
      {[
        { icon: '/images/MetaMask_Fox.svg.webp', title: 'Meta Mask' },
        { icon: '/images/coinbase-logo.webp', title: 'Coinbase Wallet' },
        { icon: '/images/wallet-connect-logo.png', title: 'Wallet Connect' },
      ].map((item) => (
        <WalletOption {...item} key={item.title} />
      ))}
    </ul> */}
    </div>
  );
};

const WalletOption = ({
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
  handleConnect(): void;
}) => (
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
        alt='...'
      />
    </div>

    <p className='text-lg font-semibold'>
      {isLoading ? 'Connecting...' : title}
    </p>
  </button>
);
