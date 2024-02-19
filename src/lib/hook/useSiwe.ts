'use client';

import { userStore } from '@/store';
import { ErrorResponse, User } from '@/types';
import { hasCookie } from 'cookies-next';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useAccountEffect, useConfig, useSignMessage } from 'wagmi';
import { watchAccount } from 'wagmi/actions';

const ethChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1);

export const useSiwe = () => {
  const config = useConfig();
  const { signMessageAsync } = useSignMessage();
  const { push, refresh } = useRouter();
  const { setUser } = userStore();

  async function disconnectAcc() {
    try {
      const disconnect_res = await fetch('/api/disconnect');

      if (!disconnect_res.ok) {
        const err = await disconnect_res.json();
        throw err;
      }
      await disconnect_res.json();
      return refresh();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again');
      return refresh();
    }
  }

  useAccountEffect({
    async onConnect({ address, chainId, connector, isReconnected }) {
      if (!address || !chainId || !connector) return;

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

      if (chainId !== ethChainId) {
        toast.error('Wrong network');
        return await disconnectAcc();
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
          chainId,
          statement:
            'Welcome to EthFundMe. I accept the EthFundMe terms of service: https://ethfund.me',
          uri: window.location.origin,
          version: '1',
          nonce,
        }).prepareMessage();

        const signature = await signMessageAsync({ message });

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
        await disconnectAcc();
      } else {
        return redirect('/');
      }
    },
  });

  useEffect(() => {
    if (!config) return;
    const unWatch = watchAccount(config, {
      async onChange() {
        return await disconnectAcc();
      },
    });

    return unWatch;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);
};
