/* eslint-disable @next/next/no-img-element */
'use client';

import { handlePushComment } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import useEthPrice from '@/lib/hook/useEthPrice';
import { userStore } from '@/store';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
import { DialogClose } from '../ui/dialog';
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
  const { user } = userStore();
  const router = useRouter();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const {
    data: hash,
    isPending,
    isSuccess,
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
  const [usdInput, setUsdInput] = useState(0);

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const isLoadingTxn = isPending || isConfirmingTxn;

  const onSubmit: SubmitHandler<DonateFormValues> = (data) => {
    const { amount, campaignID, comment } = data;
    // eslint-disable-next-line no-extra-boolean-cast
    if (amount <= 0) {
      toast.error('Fund more than 0 ETH');
      return;
    }
    const fiatToETH = parseEther(
      parseFloat((usdInput / (ethPriceInUSD ?? 0)).toString()).toFixed(4)
    );

    const donationAmt = fiatMode
      ? fiatToETH
      : parseEther(amount.toString() || '0');

    if (!user || !address) {
      if (closeBtnRef.current && openConnectModal) {
        closeBtnRef.current.click();
        openConnectModal();
      }
    }
    const prettyComment = comment?.trim();

    if (prettyComment && user) {
      handlePushComment({
        campaignID: campaign.id,
        userID: user.id,
        comment: prettyComment,
      }).then((response) => {
        if (typeof response === 'number') {
          writeContract({
            abi: EthFundMe,
            address: ethFundMeContractAddress,
            functionName: 'fundCampaign',
            args: [BigInt(campaignID), response],
            value: donationAmt,
            chainId: ethChainId,
          });
        } else {
          throw new Error(response.error);
        }
      });
    } else {
      writeContract({
        abi: EthFundMe,
        address: ethFundMeContractAddress,
        functionName: 'fundCampaign',
        args: [BigInt(campaignID), -1],
        value: donationAmt,
        chainId: ethChainId,
      });
    }
  };

  // const writeContractRef = useRef(writeContract);

  // const handleWriteComment = useCallback(
  //   (commentId: number) => {
  //     writeContractRef.current({
  //       abi: EthFundMe,
  //       address: ethFundMeContractAddress,
  //       functionName: 'fundCampaign',
  //       args: [campaign.campaign_id, commentId],
  //       value: amt,
  //       chainId: ethChainId,
  //     });
  //   },
  //   [amt, campaign.campaign_id]
  // );

  useEffect(() => {
    if (isSuccess || isConfirmedTxn) {
      toast.success('Successfully funded campaign');

      closeBtnRef.current?.click();
      // router.push(`/campaigns/${campaign.campaign_id}`);
      return router.refresh();
    }
  }, [campaign.campaign_id, isSuccess, isConfirmedTxn, router]);

  useEffect(() => {
    if (isError && error) {
      toast.error((error as BaseError).shortMessage || error?.message);
    }
  }, [error, isError]);

  const watchedAmount: number = watch('amount');

  const ethPriceInUSD = useEthPrice();
  const ethToUSD = parseFloat(
    ((ethPriceInUSD ?? 0) * watchedAmount).toString()
  ).toFixed(4);

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=' space-x-3'>
        <button
          type='button'
          onClick={() => setFiatMode(false)}
          className={`rounded-md px-2 py-1.5 ${
            !fiatMode
              ? 'bg-primary-default text-white'
              : 'border border-primary-default'
          } text-sm`}
        >
          ETH
        </button>
        <button
          type='button'
          onClick={() => setFiatMode(true)}
          className={`rounded-md px-2 py-1.5 ${
            fiatMode
              ? 'bg-primary-default text-white'
              : 'border border-primary-default'
          } text-sm`}
        >
          USD
        </button>
      </div>
      {/* ETH TO USD */}
      <>
        {!fiatMode ? (
          <div className='relative'>
            <Input
              type='number'
              step={0.0001}
              min={0}
              max={parseFloat(formatEther(BigInt(campaign.goal)))}
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 0,
                  message: 'Enter an amount larger than 0.001 ETH',
                },
              })}
              autoFocus
              error={errors.amount?.message}
              defaultValue={amount}
              placeholder='Enter an amount in ETH'
            />
            <Slider
              onValueChange={(e) => {
                setValue('amount', e[0] as number);
              }}
              value={[watchedAmount as unknown as number]}
              defaultValue={[
                parseFloat(formatEther(BigInt(campaign.total_accrued))),
              ]}
              min={0}
              max={parseFloat(formatEther(BigInt(campaign.goal)))}
              step={0.0001}
              className='my-5'
            />
          </div>
        ) : (
          <div>
            <input
              type='number'
              step={0.0001}
              min={0}
              max={
                parseFloat(formatEther(BigInt(campaign.goal))) *
                (ethPriceInUSD ?? 0)
              }
              value={usdInput}
              onChange={(e) => {
                setUsdInput(Number(e.target.value));
              }}
              autoFocus
              className='h-full w-full rounded-md border border-primary-default px-4 py-3 outline-0 placeholder:text-neutral-700'
            />
            <Slider
              onValueChange={(e) => {
                setUsdInput(e[0] ?? 0);
              }}
              value={[usdInput]}
              min={0}
              max={
                parseFloat(formatEther(BigInt(campaign.goal))) *
                (ethPriceInUSD ?? 0)
              }
              step={0.0001}
              className='my-5'
            />
          </div>
        )}
        <p>
          (≈{' '}
          {!fiatMode
            ? `$${ethToUSD}`
            : `${parseFloat(
                (usdInput / (ethPriceInUSD ?? 0)).toString()
              ).toFixed(4)} ETH`}
          )
        </p>
      </>

      <div>
        <Textarea placeholder='Add a comment' {...register('comment')} />
        {errors.comment && (
          <p className='text-sm text-red-500'>{errors.comment.message}</p>
        )}
      </div>

      <DialogClose className='hidden' ref={closeBtnRef} />

      {customClose ?? (
        <Button
          size='lg'
          disabled={isLoadingTxn || isConfirmingTxn || isPending}
          className='w-full disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-opacity-90'
        >
          {isLoadingTxn ? 'Donating...' : 'Donate'}
        </Button>
      )}
    </form>
  );
}
