'use client';

import '@rainbow-me/rainbowkit/styles.css';
import lodash from 'lodash';
import React from 'react';
import { mainnet, sepolia } from 'wagmi/chains';

import {
  RainbowKitProvider,
  Theme,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { ethChainId } from '../constant';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';

const config = getDefaultConfig({
  appName: 'EthFundMe',
  projectId: wcProjectId,
  chains: [ethChainId === 1 ? mainnet : sepolia],
  transports:
    ethChainId === 1 ? { [mainnet.id]: http() } : { [sepolia.id]: http() },
  ssr: true,
});

const queryClient = new QueryClient();

const theme: Theme = lodash.merge(lightTheme(), {
  colors: { accentColor: '#0062A6' },
  radii: { connectButton: '10px', actionButton: '10px' },
  fonts: { body: 'Mona Sans' },
} as Theme);

export const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
