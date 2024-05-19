'use client';

import { useSocket } from '@/lib/hook/useSocket';
import { SocketResponse } from '@/lib/types';
import { userStore } from '@/store';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaTelegramPlane } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export const CommentForm = ({ campaignId }: { campaignId: string }) => {
  const { user } = userStore();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { socket } = useSocket(campaignId);

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<{ comment: string }>();

  const onSubmit: SubmitHandler<{ comment: string }> = ({ comment }) => {
    if (!user || !address) {
      openConnectModal && openConnectModal();
      return;
    }

    const data = {
      userId: user?.id,
      campaignUUID: campaignId,
      comment,
    };
    if (user && socket) {
      socket?.emit(
        'add:comment',
        data,
        (response: SocketResponse<{ id: number }>) => {
          if (response.data?.id) {
            console.log(response);

            reset();
          }
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 rounded-md'>
      <div className='relative'>
        <Textarea
          {...register('comment', {
            required: 'Enter a comment',
            minLength: 1,
            maxLength: 250,
            validate: (value) => !!value.trim() || 'Enter a comment',
          })}
          placeholder='Enter your comments'
          className='max-h-32 pr-12 md:pr-[70px]'
        />

        <Button className='absolute bottom-2 right-2 p-0 px-2 disabled:pointer-events-auto'>
          <FaTelegramPlane size={20} />
        </Button>
      </div>
      {errors.comment && (
        <small className='text-red-500'>{errors.comment.message}</small>
      )}
    </form>
  );
};
