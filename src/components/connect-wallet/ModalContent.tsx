import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store';
import Image from 'next/image';
import { useConnect } from 'wagmi';
import { getConnectorIcon } from '../ConnectWallet';

export default function ModalContent() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { closeModal } = useModalStore();

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
              handleConnect={() => {
                connect({ connector });
                if (!isLoading) {
                  closeModal();
                }
              }}
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
