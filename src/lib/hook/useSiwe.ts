import { useModalStore } from '@/store';
import { ErrorResponse } from '@/types';
import { hasCookie } from 'cookies-next';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT;

export const useSiwe = () => {
  const [isLoadingSiwe, setIsLoadingSiwe] = useState(false);

  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { closeModal } = useModalStore();

  const { push, refresh } = router;

  const { address } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      if (!address || !connector || !chain?.id) return;
      const efmJwt = hasCookie('efmJwtToken');

      if (efmJwt) {
        refresh();
        closeModal();
        return;
      }

      if (isReconnected) {
        if (!efmJwt) {
          disconnect();
          closeModal();
          toast.error('Session has ended. Please reconnect.');
          return;
        }
      }

      try {
        setIsLoadingSiwe(true);
        const nonce_res = await fetch(`${efm_endpoint}/api/nonce/${address}`, {
          credentials: 'include',
        });
        if (!nonce_res.ok) {
          const err: { error: ErrorResponse } = await nonce_res.json();
          throw err;
        }
        const nonce = await nonce_res.text();
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          chainId: chain.id,
          statement:
            'Welcome to EthFundMe. I accept the EthFundMe terms of service: https://ethfund.me',
          uri: window.location.origin,
          version: '1',
          nonce,
        }).prepareMessage();

        const walletClient = await connector.getWalletClient();
        const signature = await walletClient.signMessage({
          message,
          account: address,
        });

        const verify_res = await fetch(
          `${efm_endpoint}/api/verify/${address}`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          }
        );

        if (!verify_res.ok) {
          const err: ErrorResponse = await verify_res.json();
          throw err;
        } else {
          setIsLoadingSiwe(false);
          refresh();
          closeModal();
          return;
        }
      } catch (error) {
        setIsLoadingSiwe(false);
        console.error(error);
        closeModal();
        const err = error as unknown as { error: ErrorResponse };

        if (err.error.name === 'USER_ETH_ADDRESS_NOT_FOUND') {
          push('/account');
          closeModal();
          return;
        }

        if (err.error.name === 'INVALID_ETHEREUM_ADDRESS') {
          disconnect();
          toast.error('Not a valid wallet address.');
          return;
        }

        disconnect();
        toast.error('Wallet connection failed. Retry.');
        return;
      }
    },

    async onDisconnect() {
      const efmJwt = hasCookie('efmJwtToken');
      if (efmJwt) {
        try {
          const disconnect_res = await fetch(`${efm_endpoint}/api/disconnect`, {
            credentials: 'include',
          });

          if (!disconnect_res.ok) {
            const err = await disconnect_res.json();
            throw err;
          }
          await disconnect_res.json();
          return redirect('/');
        } catch (error) {
          console.error(error);
        }
      } else {
        return redirect('/');
      }
    },
  });

  return {
    address,
    isLoadingSiwe,
  };
};
