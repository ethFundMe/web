/* eslint-disable @next/next/no-img-element */
'use client';

import { handlePushComment } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import useEthPrice from '@/lib/hook/useEthPrice';
import { useSocket } from '@/lib/hook/useSocket';
import { userStore } from '@/store';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    // isSuccess,
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
  const [newCommentId, setNewCommentId] = useState<null | number>(null);
  const [isPushingComment, setIsPushingComment] = useState(false);
  const [usdInput, setUsdInput] = useState(0);
  const { socket } = useSocket(campaign.id);
  const loggedIn = address || getCookie('efmToken');

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const isLoadingTxn = isPending || isConfirmingTxn;

  const handleDeleteComment = useCallback(() => {
    socket.emit(
      'delete:comment',
      {
        userId: user?.id,
        campaignUUID: campaign.id,
        commentId: newCommentId,
      },
      (response: unknown) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('delete response', response);
        }
      }
    );
  }, [user?.id, campaign.id, newCommentId, socket]);

  const onSubmit: SubmitHandler<DonateFormValues> = (data) => {
    const { amount, campaignID, comment } = data;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!fiatMode && amount <= 0) {
      toast.error('Cannot fund with 0 ETH');
      return;
    }
    if (fiatMode && usdInput <= 0) {
      toast.error('Cannot fund with 0 USD');
      return;
    }
    const fiatToETH = parseEther(
      parseFloat((usdInput / (ethPriceInUSD ?? 0)).toString()).toFixed(4)
    );

    const donationAmt = fiatMode
      ? fiatToETH
      : parseEther(amount.toString() || '0');

    if (!loggedIn) {
      if (closeBtnRef.current && openConnectModal) {
        closeBtnRef.current.click();
        openConnectModal();
      }
    }
    const prettyComment = comment?.trim();

    if (prettyComment && user) {
      setIsPushingComment(true);
      handlePushComment({
        campaignID: campaign.id,
        userID: user.id,
        comment: prettyComment,
      })
        .then((response) => {
          setIsPushingComment(false);
          if (typeof response === 'number') {
            setNewCommentId(response);
            writeContract({
              abi: EthFundMe,
              address: ethFundMeContractAddress,
              functionName: 'fundCampaign',
              args: [BigInt(campaignID), response],
              value: donationAmt,
              chainId: ethChainId,
            });
          } else {
            throw new Error(response?.error);
          }
        })
        .catch((error) => {
          setIsPushingComment(false);
          if (newCommentId) {
            // Delete comment
            handleDeleteComment();
          }
          toast.error('Failed to add comment');
          console.log(error);
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

  useEffect(() => {
    if (isConfirmedTxn) {
      toast.success('Campaign funded');

      closeBtnRef.current?.click();
      // router.push(`/campaigns/${campaign.campaign_id}`);
      router.refresh();
    }
  }, [campaign.campaign_id, isConfirmedTxn, router]);

  useEffect(() => {
    if (isError && error) {
      if (newCommentId) {
        handleDeleteComment();
      }
      let errorMsg = (error as BaseError).shortMessage || error.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else if (!loggedIn) {
        errorMsg = 'Connect wallet to donate';
      } else {
        errorMsg = 'Failed to donate';
      }
      toast.error(errorMsg);
    }
  }, [error, isError, newCommentId, loggedIn, handleDeleteComment]);

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
              step='any'
              min={0.0001}
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
              step='any'
              min={0.0001}
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
          disabled={
            isLoadingTxn || isConfirmingTxn || isPending || isPushingComment
          }
          className='w-full disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-opacity-90'
        >
          {isLoadingTxn ? 'Donating...' : 'Donate'}
        </Button>
      )}
    </form>
  );
}
