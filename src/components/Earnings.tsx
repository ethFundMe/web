'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { formatEther } from 'viem';
import { useReadContract } from 'wagmi';

export const Earnings = ({ user }: { user: `0x${string}` }) => {
  const { data, error, isPending } = useReadContract({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    functionName: 'creator_tokens',
    args: [user],
    chainId: ethChainId,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.shortMessage || error.message);
    }
  }, [error]);

  if (isPending)
    return (
      <div>
        <Loader size={16} className='animate-spin' />
      </div>
    );

  return (
    <>
      <p className='my-4 text-3xl font-bold text-primary-dark'>
        {data ? formatEther(BigInt(data as number)).toString() : 0} FUNDME
      </p>
    </>
  );
};
