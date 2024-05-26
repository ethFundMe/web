'use client';

import useStore, { efmUserAddressStore, userStore } from '@/store';
import { ErrorResponse, User } from '@/types';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAccountEffect, useConfig, useDisconnect } from 'wagmi';
import { watchAccount } from 'wagmi/actions';

const ethChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1);
const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT ?? '';

export const useAuth = () => {
  const config = useConfig();
  const { push } = useRouter();
  const userEthAddress = useStore(userStore, (state) => state.user?.ethAddress);
  const { setUser, resetUser } = userStore();
  const { resetAddress, setAddress } = efmUserAddressStore();
  const efmToken = getCookie('efmToken');
  const { disconnect } = useDisconnect();

  const [isAuth, setIsAuth] = useState(false);

  useAccountEffect({
    async onConnect({ address, chainId, isReconnected }) {
      if (!address || !chainId) return;

      setAddress(address);

      if (isReconnected && !efmToken) {
        return disconnect();
      }

      if (efmToken && userEthAddress === address) {
        setIsAuth(true);
        return;
      }

      if (chainId !== ethChainId) {
        toast.error('Wrong network');
        return disconnect();
      }

      try {
        const user_res = await fetch(`${efm_endpoint}/api/user/${address}`);
        if (!user_res.ok) {
          const err: { error: ErrorResponse } = await user_res.json();
          throw err;
        }

        const user: User = await user_res.json();
        setUser(user);
        setIsAuth(true);
        return;
      } catch (error) {
        console.error(error);
        const err = error as unknown as { error: ErrorResponse };

        if (err.error.name === 'USER_ETH_ADDRESS_NOT_FOUND') {
          disconnect();
          push('/account');
          return;
        }

        if (err.error.name === 'INVALID_ETHEREUM_ADDRESS') {
          disconnect();
          toast.error('Not a valid wallet address');
          return;
        }

        disconnect();
        toast.error('Wallet connection failed');
        return;
      }
    },

    async onDisconnect() {
      setIsAuth(false);

      if (efmToken) {
        deleteCookie('efmToken');
      }

      if (userEthAddress) {
        resetUser();
      }
    },
  });

  useEffect(() => {
    if (!config || !isAuth) return;
    const unWatch = watchAccount(config, {
      async onChange() {
        resetAddress();
        disconnect();
      },
    });

    return unWatch;
  }, [config, isAuth, disconnect, resetAddress]);
};
