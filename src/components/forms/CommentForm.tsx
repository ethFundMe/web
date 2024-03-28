'use client';

import { handlePushComment } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { userStore } from '@/store';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaTelegramPlane } from 'react-icons/fa';
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export const CommentForm = ({ campaignID }: { campaignID: number }) => {
  const { user } = userStore();
  const { openConnectModal } = useConnectModal();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<{ comment: string }>();

  const {
    data: hash,
    isPending,
    error,
    isError,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log(`Settled fundCampaign, ${{ data, error }}`);
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const isLoadingTxn = isPending || isConfirmingTxn;
  const [commenting, setCommenting] = useState(false);

  const onSubmit: SubmitHandler<{ comment: string }> = ({ comment }) => {
    if (!user) {
      openConnectModal && openConnectModal();
    }

    if (user) {
      setCommenting(true);
      const userID = user.id;

      handlePushComment({
        campaignID: String(campaignID),
        comment,
        userID,
      })
        .then((res) => {
          console.log(res);
          if (res.error) throw new Error(res.error);

          writeContract({
            abi: EthFundMe,
            address: ethFundMeContractAddress,
            functionName: 'fundCampaign',
            args: [campaignID, res.commentID],
            value: BigInt(0),
            chainId: ethChainId,
          });
          setCommenting(false);
        })
        .catch((e) => {
          if (e instanceof Error) console.log(e.message);
          console.log(e);

          // toast.error('Failed to add comment');
          setCommenting(false);
        });
      return;
    }
  };

  useEffect(() => {
    if (isConfirmedTxn) {
      toast.success('Successfully funded campaign');
    }
  }, [campaignID, isConfirmedTxn]);

  useEffect(() => {
    if (isError && error) {
      toast.error((error as BaseError).shortMessage || error?.message);
    }
  }, [error, isError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 rounded-md'>
      <div className='relative'>
        <Textarea
          {...register('comment', {
            required: 'Enter a comment',
            minLength: 1,
            validate: (value) => !!value.trim() || 'Enter a comment',
          })}
          placeholder='Enter your comments'
          className='max-h-52 pr-12 md:pr-[70px]'
        />

        <Button
          className='absolute bottom-2 right-2 p-0 px-2 disabled:pointer-events-auto'
          disabled={isLoadingTxn || isConfirmingTxn || isPending || commenting}
        >
          {isLoadingTxn || commenting ? (
            <Loader className='animate-spin text-white' />
          ) : (
            <FaTelegramPlane size={20} />
          )}
        </Button>
      </div>
      {errors.comment && (
        <small className='text-red-500'>{errors.comment.message}</small>
      )}
    </form>
  );
};
