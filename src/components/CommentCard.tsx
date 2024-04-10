import { Comment } from '@/lib/types';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { IoTrash } from 'react-icons/io5';
import { formatEther } from 'viem';
import ImageWithFallback from './ImageWithFallback';

type Props = React.ComponentProps<'div'> & {
  comment: Comment;
  handleDelete: ((userID: string) => void) | null;
};

type Ref = HTMLDivElement;

export const CommentCard = forwardRef<Ref, Props>(
  (
    {
      handleDelete,
      comment: {
        comment,
        amount,
        commentID,
        user: { profileUrl, fullname },
        createdAt,
      },
    },
    ref
  ) => {
    const formatDonateAmt = () => {
      if (!amount) return;
      const parsed = parseInt(amount);
      if (!parsed || typeof parsed !== 'number') return;

      return formatEther(BigInt(amount));
    };
    const donatedAmt = formatDonateAmt();

    return (
      <motion.div
        ref={ref}
        animate={{ x: [-12, 0] }}
        className={cn(
          'flex items-start justify-between gap-2 rounded-lg border-2 border-transparent p-2 text-sm',
          donatedAmt ? 'animated-border  bg-slate-50' : ' border-slate-50'
        )}
      >
        <div>
          <div className='mb-2 flex flex-wrap items-start justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <div className='relative h-8 w-8 flex-shrink-0'>
                <ImageWithFallback
                  className='block flex-shrink-0 rounded-full object-cover'
                  src={profileUrl || ''}
                  fallback='/images/user-pfp.png'
                  fill
                  sizes='50px'
                  alt='user-pfp'
                />
              </div>

              <div>
                <p>{fullname}</p>
                <small>
                  {dayjs(createdAt)
                    .subtract(2, 'minute')
                    .format('DD MMM, YYYY . HH : mm a')}
                </small>
              </div>
            </div>

            {donatedAmt && (
              <Link
                href='/'
                target='_blank'
                className='flex items-center gap-1 pr-2 text-xl font-bold text-primary-default'
              >
                <FaEthereum />
                {/* <span>{formatEther(BigInt(amt))}</span> */}

                <span>{donatedAmt}</span>
              </Link>
            )}
          </div>
          <p>{comment}</p>
        </div>

        {handleDelete && (
          <button
            className='p-1 px-2'
            onClick={() => {
              if (window.confirm('Sure to delete?')) {
                handleDelete(String(commentID));
              }
            }}
          >
            <IoTrash className='text-red-500' />
          </button>
        )}
      </motion.div>
    );
  }
);

CommentCard.displayName = 'CommentCard';
