'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from '@web3modal/siwe';
import {
  createSIWEConfig,
  formatMessage,
  getAddressFromMessage,
  getChainIdFromMessage,
} from '@web3modal/siwe';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { ReactNode } from 'react';
import { http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ethChainId } from '../constant';
import { useAuth } from '../hook';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';
const mainnetRpcUrl = process.env.NEXT_PUBLIC_MAINNET_RPC_URL ?? '';
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? '';
const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT ?? '';

const queryClient = new QueryClient();

const metadata = {
  description: 'Decentralized fundraising and crowdfunding platform',
  icons: [''],
  name: 'EthFundMe',
  url: 'https://ethfundme.com/',
};

const config = defaultWagmiConfig({
  chains: [ethChainId === 1 ? mainnet : sepolia],
  projectId: wcProjectId,
  metadata,
  ssr: true,
  transports:
    ethChainId === 1
      ? { [mainnet.id]: http(mainnetRpcUrl) }
      : { [sepolia.id]: http(sepoliaRpcUrl) },
});

export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: typeof window !== 'undefined' ? window.location.host : '',
    uri: typeof window !== 'undefined' ? window.location.origin : '',
    chains: [mainnet.id, sepolia.id],
    statement:
      'Welcome to EthFundMe. I accept the EthFundMe terms of service: https://ethfund.me',
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),
  getNonce: async () => {
    const res = await fetch(`${efm_endpoint}/api/nonce`);
    if (!res.ok) {
      throw Error();
    }
    return await res.text();
  },
  getSession: async () => {
    const efmToken = getCookie('efmToken');
    const efmAddress = getCookie('efmAddress');
    const efmChainId = getCookie('efmChainId');
    if (!efmAddress || !efmChainId || !efmToken) {
      throw new Error('Failed to get token!');
    }

    const { address, chainId } = {
      address: efmAddress,
      chainId: efmChainId,
    } as unknown as SIWESession;

    return { address, chainId };
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    const address = getAddressFromMessage(message);
    const chainId = getChainIdFromMessage(message);

    const user_res = await fetch(`${efm_endpoint}/api/user/${address}`);
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
        const expiration = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days
        setCookie('efmToken', verify_data.jwt, {
          expires: expiration,
          sameSite: 'lax',
        });
        setCookie('efmAddress', address, {
          expires: expiration,
          sameSite: 'lax',
        });
        setCookie('efmChainId', chainId, {
          expires: expiration,
          sameSite: 'lax',
        });
      }
    }

    return Boolean(res.ok);
  },
  signOut: async () => {
    const efmToken = getCookie('efmToken');

    if (efmToken) {
      deleteCookie('efmToken');
      return true;
    } else {
      setCookie('efmToken', '', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
      });
      return true;
    }
  },
});

createWeb3Modal({
  projectId: wcProjectId,
  wagmiConfig: config,
  metadata,
  defaultChain: ethChainId === 1 ? mainnet : sepolia,
  allowUnsupportedChain: false,
  tokens:
    ethChainId === 1
      ? {
          1: {
            address: process.env.NEXT_PUBLIC_EFM_TOKEN ?? '',
            image:
              'https://res.cloudinary.com/efm/image/upload/v1720546616/Logo_White-Blue_goedli.png',
          },
        }
      : {
          11155111: {
            address: process.env.NEXT_PUBLIC_EFM_TOKEN ?? '',
            image:
              'https://res.cloudinary.com/efm/image/upload/v1720546616/Logo_White-Blue_goedli.png',
          },
        },
  termsConditionsUrl: 'https://www.ethfundme.com/legal/terms-and-conditions',
  privacyPolicyUrl: 'https://www.ethfundme.com/legal/privacy-policy',
  siweConfig,
});

export default function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>{children}</AuthWrapper>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AuthWrapper({ children }: { children: ReactNode }) {
  useAuth();
  return <>{children}</>;
}
