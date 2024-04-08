'use client';

import { userStore } from '@/store';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
    handleSubmit,
  } = useForm<{ comment: string }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [commenting, setCommenting] = useState(false);

  const onSubmit: SubmitHandler<{ comment: string }> = ({ comment }) => {
    toast.success('Submitting', { position: 'top-right' });
    if (!user || !address) {
      openConnectModal && openConnectModal();
      return;
    }

    handleAddComment(comment);
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
          className='max-h-52 pr-12 md:pr-[70px]'
        />

        <Button
          className='absolute bottom-2 right-2 p-0 px-2 disabled:pointer-events-auto'
          // disabled={commenting}
        >
          {/* <div className='h-5 w-5 animate-spin rounded-full border border-t-0 border-white'></div> */}
          {/* {commenting ? (
            <div className='h-5 w-5 animate-spin rounded-full border border-t-0 border-white'></div>
          ) : (
            <FaTelegramPlane size={20} />
            )} */}
          <FaTelegramPlane size={20} />
        </Button>
      </div>
      {errors.comment && (
        <small className='text-red-500'>{errors.comment.message}</small>
      )}
    </form>
  );
};
