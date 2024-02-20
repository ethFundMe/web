'use client';

import { useAccount } from 'wagmi';

export default function ConnectWalletIndicator() {
  const { address } = useAccount();

  return address ? null : (
    <div className='bg-red-500/10 py-2 text-center text-sm text-red-500 lg:text-base'>
      Connect your wallet to create a campaign
    </div>
  );
}
