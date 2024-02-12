'use client';

import { useFund } from '@/lib/hook';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
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
    setValue,

    watch,
  } = useForm<DonateFormValues>({
    defaultValues: {
      campaignID: campaign.campaign_id,
      amount: 0.000001,
    },
  });

  const fundingAmt = useDebounce(watch('amount'), 500);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const {
    fundCampaignWrite,
    isLoadingFundCampaign,
    isLoadingFundCampaignTxn,
    isFundCampaignSuccess,
  } = useFund({ id: campaign.campaign_id, amt: fundingAmt });

  const isLoadingTxn = isLoadingFundCampaign || isLoadingFundCampaignTxn;

  const onSubmit: SubmitHandler<DonateFormValues> = (formData) => {
    if (formData.amount <= 0) {
      toast.error('Fund more than 0 ETH');
      return;
    }

    return fundCampaignWrite?.();
  };

  useEffect(() => {
    if (isFundCampaignSuccess) {
      toast.success('Successfully funded campaign');
      return redirect(`/campaigns/${campaign.campaign_id}`);
    }
  }, [campaign, isFundCampaignSuccess]);

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type='number'
        step='any'
        {...register('amount', {
          required: 'Amount is required',
          min: {
            value: 0,
            message: 'Enter an amount larger than 0.000001 ETH',
          },
        })}
        error={errors.amount?.message}
        defaultValue={amount}
        placeholder='Enter an amount in ETH'
      />

      <Slider
        // defaultValue={[parseFloat(formatEther(BigInt(campaign.total_accrued)))]}
        onValueChange={(e) => {
          setValue('amount', e[0]);
          console.log({ e: e[0] });
        }}
        min={parseFloat(formatEther(BigInt(campaign.total_accrued)))}
        max={parseFloat(formatEther(BigInt(campaign.goal)))}
        step={0.01}
      />

      {customClose ?? address ? (
        <Button wide>{isLoadingTxn ? 'Donating...' : 'Donate'}</Button>
      ) : (
        <Button wide onClick={openConnectModal}>
          Donate
        </Button>
      )}
    </form>
  );
}
