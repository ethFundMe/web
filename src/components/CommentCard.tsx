'use client';

import { Comment } from '@/lib/types';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { forwardRef } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { IoEllipsisVertical, IoTrash } from 'react-icons/io5';
import { formatEther } from 'viem';
import ImageWithFallback from './ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
        id,
        comment,
        amount,
        user: { profileUrl, fullName },
        created_at,
        transaction_hash,
      },
    },
    ref
  ) => {
    const formatDonateAmt = () => {
      if (!amount) return;
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
                <p>{fullName}</p>
                <small>
                  {dayjs(created_at)
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

        {(transaction_hash || handleDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className='cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <IoEllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {transaction_hash && (
                <DropdownMenuItem className='flex items-center gap-2' asChild>
                  <Link
                    target='_blank'
                    href={`https://sepolia.etherscan.io/tx/${transaction_hash}`}
                  >
                    <Eye size={14} />
                    View transaction
                  </Link>
                </DropdownMenuItem>
              )}
              {handleDelete && (
                <DropdownMenuItem
                  className='flex items-center gap-2'
                  onClick={() => {
                    if (window.confirm('Sure to delete?')) {
                      handleDelete(String(id));
                    }
                  }}
                >
                  <IoTrash className='text-red-500' />
                  Delete comment
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </motion.div>
    );
  }
);

CommentCard.displayName = 'CommentCard';
