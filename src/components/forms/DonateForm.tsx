'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from 'wagmi';
import { Button, Input } from '../inputs';
import { Slider } from '../ui/slider';
import { DonateFormProps } from './types';

type DonateFormValues = {
  campaignID: number;
  amount: number;
};

export default function DonateForm({
  campaign,
  amount,
  customClose,
}: DonateFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DonateFormValues>({
    defaultValues: {
      campaignID: campaign.campaign_id,
      amount: 0,
    },
  });

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const {
    data: hash,
    isPending,
    error,
    isError,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log('Settled fundCampaign', { data, error });
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const isLoadingTxn = isPending || isConfirmingTxn;

  const onSubmit: SubmitHandler<DonateFormValues> = (data) => {
    const { amount, campaignID } = data;
    if (amount <= 0) {
      toast.error('Fund more than 0 ETH');
      return;
    }

    return writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'fundCampaign',
      args: [BigInt(campaignID)],
      value: parseEther(amount.toString() || '0'),
      chainId: ethChainId,
    });
  };

  useEffect(() => {
    if (isConfirmedTxn) {
      toast.success('Successfully funded campaign');
      return redirect(`/campaigns/${campaign.campaign_id}`);
    }
  }, [campaign.campaign_id, isConfirmedTxn]);

  useEffect(() => {
    if (isError && error) {
      toast.error((error as BaseError).shortMessage || error?.message);
    }
  }, [error, isError]);

  const watchedAmount: number = watch('amount');

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type='number'
        step={0.01}
        min={0}
        max={parseFloat(formatEther(BigInt(campaign.goal)))}
        {...register('amount', {
          required: 'Amount is required',
          min: {
            value: 0,
            message: 'Enter an amount larger than 0.001 ETH',
          },
        })}
        error={errors.amount?.message}
        defaultValue={amount}
        placeholder='Enter an amount in ETH'
      />

      <Slider
        onValueChange={(e) => {
          setValue('amount', e[0] as number);
        }}
        value={[watchedAmount as unknown as number]}
        min={parseFloat(formatEther(BigInt(campaign.total_accrued)))}
        max={parseFloat(formatEther(BigInt(campaign.goal)))}
        step={0.01}
      />

      {customClose ?? address ? (
        <Button wide disabled={isLoadingTxn}>
          {isLoadingTxn ? 'Donating...' : 'Donate'}
        </Button>
      ) : (
        <Button wide onClick={openConnectModal}>
          Donate
        </Button>
      )}
    </form>
  );
}
