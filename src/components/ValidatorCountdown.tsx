'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId } from '@/lib/constant';
import { useCountdown } from '@/lib/hook/useCountdown';
import { useCallback, useEffect, useState } from 'react';
import {
  WalletClient,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { Button } from './ui/button';

export const ValidatorCountdown = () => {
  const [jsonDate, setJsonDate] = useState('');
  const [expired, setExpired] = useState(false);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [days, hours, minutes, seconds] = useCountdown(new Date(jsonDate));

  const publicClient = createPublicClient({
    chain: ethChainId === 1 ? mainnet : sepolia,
    transport: http(),
  });

  const diminish = async () => {
    if (!walletClient) return;
    const [account] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      account,
      address: process.env.NEXT_PUBLIC_ETH_FUND_ME_CONTRACT_ADDRESS || '',
      abi: EthFundMe,
      functionName: 'diminish',
    });
    await walletClient.writeContract(request);
  };

  const getDfNextUpdate = useCallback(async () => {
    const data = await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_ETH_FUND_ME_CONTRACT_ADDRESS || '',
      abi: EthFundMe,
      functionName: 'DF_NEXT_UPDATE',
    });

    const myDate = new Date(Number(data) * 1000);
    return myDate.toJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newWalletClient: WalletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum!),
      });
      setWalletClient(newWalletClient);
    }
  }, []);

  useEffect(() => {
    async function getDateString() {
      const dateString = await getDfNextUpdate();
      setJsonDate(dateString);
      const now = new Date().toJSON();
      if (dateString <= now) {
        setExpired(true);
      }
    }

    getDateString();
  }, [getDfNextUpdate]);

  const Obj = { days, hours, minutes, seconds };

  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex gap-4'>
        {Object.entries(Obj).map(([key, value]) => (
          <div key={key}>
            <div className='flex flex-col items-center uppercase'>
              <p
                key={value}
                className='text-xl text-primary-default sm:text-3xl'
              >
                {String(value).padStart(2, '0')}
              </p>

              <p className='text-sm sm:text-base'>{key}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className={`grid flex-shrink-0 place-content-center rounded-full ${
          !expired
            ? 'bg-neutral-400 hover:bg-neutral-400/80'
            : 'bg-green-600 hover:bg-green-600/90'
        } text-sm text-white disabled:cursor-not-allowed sm:h-32 sm:w-32 sm:text-base`}
        onClick={diminish}
        disabled={!expired}
      >
        UPDATE
      </Button>
    </div>
  );
};
