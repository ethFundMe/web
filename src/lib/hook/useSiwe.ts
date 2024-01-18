'use client';

import { userStore } from '@/store';
import { ErrorResponse, User } from '@/types';
import { hasCookie } from 'cookies-next';
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork } from 'wagmi';

export const useSiwe = () => {
  const { chain } = useNetwork();
  const router = useRouter();
  const { setUser } = userStore();

  const { push, refresh } = router;

  useAccount({
    async onConnect({ address, connector, isReconnected }) {
      if (!address || !connector || !chain?.id) return;
      const efmToken = hasCookie('efmToken');

      if (efmToken) {
        refresh();
        return;
      }

      if (isReconnected) {
        if (!efmToken) {
          connector.disconnect();
          refresh();
          return;
        }
      }

      try {
        const nonce_res = await fetch(`/api/nonce/${address}`);
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

        const verify_res = await fetch(`/api/verify/${address}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nonce, message, signature }),
        });

        if (!verify_res.ok) {
          const err: ErrorResponse = await verify_res.json();
          throw err;
        }
        const verify_data = (await verify_res.json()) as {
          user: User;
        };
        setUser(verify_data.user);
        refresh();
        return;
      } catch (error) {
        connector.disconnect();
        console.error(error);
        const err = error as unknown as { error: ErrorResponse };

        if (err.error.name === 'USER_ETH_ADDRESS_NOT_FOUND') {
          push('/account');
          return;
        }

        if (err.error.name === 'INVALID_ETHEREUM_ADDRESS') {
          connector.disconnect();
          toast.error('Not a valid wallet address.');
          return;
        }

        connector.disconnect();
        toast.error('Wallet connection failed. Retry.');
        return;
      }
    },

    async onDisconnect() {
      const efmToken = hasCookie('efmToken');
      if (efmToken) {
        try {
          const disconnect_res = await fetch('/api/disconnect');

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
};
