'use client';

import {
  RainbowKitProvider,
  Theme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import lodash from 'lodash';
import React from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ethChainId } from '../constant';

const sepoliaAlchemyApiKey =
  process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_API_KEY ?? '';
const mainnetAlchemyApiKey =
  process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_API_KEY ?? '';
const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ethChainId === 1 ? mainnet : sepolia],
  [
    alchemyProvider({ apiKey: mainnetAlchemyApiKey }),
    alchemyProvider({ apiKey: sepoliaAlchemyApiKey }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'EthFundMe',
  projectId: wcProjectId,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const theme: Theme = lodash.merge(lightTheme(), {
  colors: { accentColor: '#0062A6' },
  radii: { connectButton: '10px', actionButton: '10px' },
  fonts: { body: 'Mona Sans' },
} as Theme);

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={theme} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
