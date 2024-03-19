/* eslint-disable @next/next/no-img-element */
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import useEthPrice from '@/lib/hook/useEthPrice';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from 'wagmi';
import { Input } from '../inputs';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';
import { DonateFormProps } from './types';

type DonateFormValues = {
  campaignID: number;
  amount: number;
  comment?: string;
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
  // const [ethPrice, setEthPrice] = useState(useEthPrice());

  // useEffect(() => {
  //     setEthPrice
  // }, []);

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
  const [fiatMode, setFiatMode] = useState(false);

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const isLoadingTxn = isPending || isConfirmingTxn;

  const onSubmit: SubmitHandler<DonateFormValues> = (data) => {
    const { amount, campaignID } = data;
    if (amount <= 0) {
      toast.error('Fund more than 0 ETH');
      return;
    }

    const campId = BigInt(campaignID);
    const commentId = BigInt(1);
    const donationAmt = parseEther(amount.toString() || '0');
    console.log(campaignID, campId, commentId, donationAmt, donationAmt);

    return writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'fundCampaign',
      args: [campId, commentId],
      value: donationAmt,
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

  const watchedETHAmount: number = watch('amount');
  const watchedUSDAmount: number = watch('amount');

  const ethPrice = useEthPrice();
  const usdConverted = parseFloat(
    ((ethPrice as number) * watchedETHAmount).toString()
  ).toFixed(2);

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Tabs defaultValue='usd' className='w-[400px]'>
        <TabsList>
          <TabsTrigger
            onClick={() => setFiatMode(false)}
            value='eth'
            className={`rounded-md px-2 py-1.5 ${
              !fiatMode
                ? 'bg-primary-default text-white'
                : 'border border-primary-default'
            } text-sm`}
          >
            ETH
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setFiatMode(true)}
            value='usd'
            className={`rounded-md px-2 py-1.5 ${
              fiatMode
                ? 'bg-primary-default text-white'
                : 'border border-primary-default'
            } text-sm`}
          >
            USD
          </TabsTrigger>
        </TabsList>
        <TabsContent value='usd'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='eth'>Change your password here.</TabsContent>
      </Tabs>

      {/* ETH TO USD */}
      <>
        <div className='relative'>
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
          <img
            src='https://cryptologos.cc/logos/thumbs/ethereum.png?v=030'
            alt='eth-logo'
            className='absolute right-10 top-1/2 h-6 -translate-y-1/2'
          />
        </div>
        <p>(${usdConverted})</p>

        <Slider
          onValueChange={(e) => {
            setValue('amount', e[0] as number);
          }}
          value={[watchedETHAmount as unknown as number]}
          min={parseFloat(formatEther(BigInt(campaign.total_accrued)))}
          max={parseFloat(formatEther(BigInt(campaign.goal)))}
          step={0.01}
        />
      </>
      {/* USD TO ETH */}
      <>
        <div className='relative'>
          <Input
            type='number'
            step={0.01}
            min={0}
            max={
              parseFloat(formatEther(BigInt(campaign.goal))) *
              (ethPrice as number)
            }
            {...register('amount', {
              required: 'Amount is required',
              min: {
                value: 0,
                message: 'Enter an amount larger than 0.001 ETH',
              },
            })}
            error={errors.amount?.message}
            defaultValue={(amount as number) * (ethPrice as number)}
            placeholder='Enter an amount in USD'
          />
          <p className='absolute right-10 top-1/2 h-6 -translate-y-1/2'>
            &#36;
          </p>
        </div>
        <p>
          (
          {parseFloat(
            (watchedETHAmount / (ethPrice as number)).toString()
          ).toFixed(2)}{' '}
          ETH)
        </p>

        <Slider
          onValueChange={(e) => {
            setValue('amount', e[0] * (ethPrice as number));
          }}
          value={[watchedETHAmount as unknown as number]}
          min={
            parseFloat(formatEther(BigInt(campaign.total_accrued))) *
            (ethPrice as number)
          }
          max={
            parseFloat(formatEther(BigInt(campaign.goal))) *
            (ethPrice as number)
          }
          step={0.01}
        />
      </>

      <div>
        <Textarea placeholder='Add a comment' {...register('comment')} />
        {errors.comment && (
          <p className='text-sm text-red-500'>{errors.comment.message}</p>
        )}
      </div>

      {customClose ?? address ? (
        <Button
          size='lg'
          disabled={isLoadingTxn || isConfirmingTxn || isPending}
          className='w-full disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-opacity-90'
        >
          {isLoadingTxn ? 'Donating...' : 'Donate'}
        </Button>
      ) : (
        <Button size='lg' className='w-full' onClick={openConnectModal}>
          Donate
        </Button>
      )}
    </form>
  );
}
