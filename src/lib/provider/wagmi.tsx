'use client';

import '@rainbow-me/rainbowkit/styles.css';
import lodash from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';
import { mainnet, sepolia } from 'wagmi/chains';

import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  Theme,
  createAuthenticationAdapter,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { SiweMessage } from 'siwe';
import { WagmiProvider, http } from 'wagmi';
import { ethChainId } from '../constant';
import { useAuth } from '../hook';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';
const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT ?? '';
const mainnetRpcUrl = process.env.NEXT_PUBLIC_MAINNET_RPC_URL ?? '';

const config = getDefaultConfig({
  appName: 'EthFundMe',
  projectId: wcProjectId,
  chains: [ethChainId === 1 ? mainnet : sepolia],
  transports:
    ethChainId === 1
      ? { [mainnet.id]: http(mainnetRpcUrl) }
      : { [sepolia.id]: http() },
  ssr: true,
});

const authenticationAdapter = createAuthenticationAdapter({
  async getNonce() {
    const res = await fetch(`${efm_endpoint}/api/nonce`);
    if (!res.ok) {
      throw Error();
    }
    return await res.text();
  },

  createMessage({ address, chainId, nonce }) {
    return new SiweMessage({
      domain: window.location.host,
      address,
      chainId,
      statement:
        'Welcome to EthFundMe. I accept the EthFundMe terms of service: https://ethfund.me',
      uri: window.location.origin,
      version: '1',
      nonce,
    });
  },

  getMessageBody({ message }) {
    return message.prepareMessage();
  },

  async verify({ message, signature }) {
    const user_res = await fetch(`${efm_endpoint}/api/user/${message.address}`);
    if (!user_res.ok) {
      throw Error();
    }

    const res = await fetch(`${efm_endpoint}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
    });

    if (res.ok) {
      const verify_data = (await res.json()) as {
        ok: boolean;
        jwt: string;
        message: string;
      };

      if (verify_data.jwt) {
        setCookie('efmToken', verify_data.jwt, {
          maxAge: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days
          sameSite: 'lax',
        });
      }
    }

    return Boolean(res.ok);
  },

  async signOut() {
    const efmToken = getCookie('efmToken');

    if (efmToken) {
      deleteCookie('efmToken');
    } else {
      setCookie('efmToken', '', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
      });
    }
  },
});

const queryClient = new QueryClient();

const theme: Theme = lodash.merge(lightTheme(), {
  colors: { accentColor: '#0062A6' },
  radii: { connectButton: '10px', actionButton: '10px' },
  fonts: { body: 'Mona Sans' },
} as Theme);

export const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<
    'authenticated' | 'loading' | 'unauthenticated'
  >('loading');
  const efmToken = getCookie('efmToken');

  useEffect(() => {
    if (authStatus === 'loading') {
      if (efmToken) {
        setAuthStatus('authenticated');
        return;
      } else {
        setAuthStatus('unauthenticated');
        return;
      }
    }
  }, [authStatus, efmToken]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={authStatus}
        >
          <RainbowKitProvider theme={theme}>
            <AuthWrapper>{children}</AuthWrapper>
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

function AuthWrapper({ children }: { children: ReactNode }) {
  useAuth();
  return <>{children}</>;
}
