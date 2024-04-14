'use client';

import { userStore } from '@/store';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaTelegramPlane } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export const CommentForm = ({
  handleAddComment,
}: {
  handleAddComment: (comment: string) => void;
}) => {
  const { user } = userStore();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

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

    handleAddComment(comment);
    reset();
  };

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
