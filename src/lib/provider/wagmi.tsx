'use client';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const sepoliaAlchemyApiKey =
  process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_API_KEY ?? '';
const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [alchemyProvider({ apiKey: sepoliaAlchemyApiKey }), publicProvider()]
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

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
