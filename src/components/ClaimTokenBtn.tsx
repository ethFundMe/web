'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Address, BaseError } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Button } from './ui/button';

export const ClaimTokenBtn = ({
  userAddress,
  disabled,
  ...rest
}: { userAddress: Address } & React.ComponentProps<'button'>) => {
  const {
    data: hash,
    error: writingError,
    isError,
    // isPending: isWriting,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log('Settled claimed tokens', { data, error });
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const handleClaim = () => {
    writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'claim',
      // args: [],
      chainId: ethChainId,
    });
  };

  useEffect(() => {
    if (isConfirmedTxn) {
      toast.success('Tokens claimed successfully');
      return;
    }
    if (isError && writingError) {
      toast.error(
        (writingError as BaseError).shortMessage || writingError.message
      );

      return;
    }
  }, [isConfirmedTxn, isError, writingError]);

  const isDisabled = disabled || isPending || isConfirmingTxn;

  return (
    <Button
      {...rest}
      onClick={handleClaim}
      disabled={isDisabled}
      className='lg:text-md w-full max-w-44 text-base font-bold'
    >
      Claim
    </Button>
  );
};
