'use client';

import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { createWalletClient, custom } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

export const TokenButton = () => {
  const walletClient = createWalletClient({
    chain:
      Number(process.env.NEXT_PUBLIC_CHAIN_ID) === 11155111 ? sepolia : mainnet,
    transport: custom(typeof window !== 'undefined' ? window.ethereum : null),
  });

  const addEFMToken = async () => {
    const success = await walletClient.watchAsset({
      type: 'ERC20',
      options: {
        address: process.env.NEXT_PUBLIC_EFM_TOKEN ?? '',
        decimals: 18,
        symbol: 'FUNDME',
        image: 'https://weth.com/icon.png',
      },
    });

    if (success) {
      toast.success('Token added successfully.');
    } else {
      toast.error('Something went wrong.');
    }
  };

  return (
    <>
      <Button onClick={addEFMToken}>Add to wallet</Button>
    </>
  );
};
