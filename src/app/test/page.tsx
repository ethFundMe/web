'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { parseEther } from 'viem';
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

export default function TestPage() {
  const {
    data: hash,
    error,
    isError,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log(`Settled addCampaign, ${{ data, error }}`);
      },
    },
  });

  const { isSuccess: isConfirmedTxn } = useWaitForTransactionReceipt({ hash });

  const handleClick = () => {
    // toast('Sup');

    writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'addCampaign',
      args: [
        'https://coral-residential-mink-479.mypinata.cloud/ipfs/QmW7Tj6tyEynDiqpySdAgoC3UpttwE9QB65cyJbysmifcK',
        parseEther('1'),
        '0xd2d0E4Da67cC8e6b79368B5a07582f443c338861',
      ],
      chainId: ethChainId,
    });
  };

  useEffect(() => {
    if (isConfirmedTxn) {
      toast.success('Campaign created.');

      return;
    }
    if (isError && error) {
      toast.error((error as BaseError).shortMessage || error.message);

      return;
    }
  }, [error, isConfirmedTxn, isError]);

  return (
    <>
      <Navbar />
      <div className='grid min-h-[60vh] place-content-center bg-slate-900'>
        <Button onClick={handleClick} variant='secondary'>
          Create
        </Button>
      </div>
    </>
  );
}
