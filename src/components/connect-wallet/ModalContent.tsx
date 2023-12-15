import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { useConnect } from 'wagmi';
import { getConnectorIcon } from '../ConnectWallet';
import WalletOption from './WalletOption';

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
