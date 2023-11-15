'use client';

import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

type Props = React.ComponentProps<'div'>;

export const WagmiProvider = ({ children }: Props) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains, options: { appName: 'EthFundMe' } }),
    new WalletConnectConnector({ chains, options: { projectId: '...' } }),
    new InjectedConnector({
      chains,
      options: { name: 'Injected', shimDisconnect: true },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
