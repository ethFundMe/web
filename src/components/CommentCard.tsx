'use client';

import { Comment } from '@/lib/types';
import { cn, getRelativeTime } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { IoEllipsisVertical, IoTrash } from 'react-icons/io5';
import { formatEther } from 'viem';
import ImageWithFallback from './ImageWithFallback';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Props = React.ComponentProps<'div'> & {
  comment: Comment;
  handleDelete: () => void;
  isOwner: boolean;
};

type Ref = HTMLDivElement;

export const CommentCard = forwardRef<Ref, Props>(
  (
    {
      isOwner,
      handleDelete,
      comment: {
        // id,
        comment,
        amount,
        user: { profileUrl, fullName, ethAddress },
        created_at,
        transaction_hash,
      },
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    const textRef = useRef<HTMLParagraphElement>(null);

    const formatDonateAmt = () => {
      if (!amount) return;
      return formatEther(BigInt(amount));
    };
    const donatedAmt = formatDonateAmt();

    useEffect(() => {
      function handleExpand() {
        if (!textRef.current) return;
        const lineHeight = parseInt(
          window.getComputedStyle(textRef.current).lineHeight,
          10
        );
        const maxHeight = lineHeight * 3;

        if (textRef.current.scrollHeight > maxHeight) {
          setIsOverflowing(true);
        } else {
          setIsOverflowing(false);
        }
      }

      handleExpand();

      window.addEventListener('resize', () => handleExpand());

      return () => window.removeEventListener('resize', () => handleExpand());
    }, [textRef]);

    return (
      <motion.div
        ref={ref}
        animate={{ x: [-12, 0], transition: { ease: 'easeOut' } }}
        className={cn(
          'relative flex items-start justify-between gap-2 rounded-lg border-2 border-transparent p-2 text-sm',
          donatedAmt ? 'animated-border  bg-slate-50' : ' border-slate-50'
        )}
      >
        <div className='w-full pr-3'>
          <div className='mb-2 flex flex-wrap items-start justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <div className='relative h-8 w-8 flex-shrink-0'>
                {profileUrl ? (
                  <ImageWithFallback
                    className='block flex-shrink-0 rounded-full object-cover'
                    src={profileUrl}
                    fallback='/images/user-pfp.png'
                    fill
                    sizes='50px'
                    alt='user-pfp'
                  />
                ) : (
                  <Image
                    className='block flex-shrink-0 rounded-full object-cover'
                    src='/images/user-pfp.png'
                    fill
                    sizes='50px'
                    alt='user-pfp'
                  />
                )}
              </div>

              <div>
                <p className='line-clamp-1 max-w-xs [word-break:break-all] sm:max-w-sm'>
                  {fullName}
                </p>
                <small className='text-[10px]'>
                  {getRelativeTime(created_at)}
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
                <span>{donatedAmt}</span>
              </Link>
            )}
          </div>
          <p
            ref={textRef}
            className={cn('whitespace-pre-wrap', !isExpanded && 'line-clamp-4')}
          >
            {comment}
          </p>

          {isOverflowing && (
            <small
              onClick={() => setIsExpanded((prev) => !prev)}
              className='cursor-pointer text-slate-400'
            >
              {isExpanded ? 'Read less' : 'Read more...'}
            </small>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className='absolute right-0 top-0 cursor-pointer p-2 focus:outline-none'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IoEllipsisVertical />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem className='flex items-center gap-2 py-1' asChild>
              <Link target='_blank' href={`/profile/${ethAddress}`}>
                <Eye size={12} />
                <small className='text-xs'>Visit profile</small>
              </Link>
            </DropdownMenuItem>
            {transaction_hash && (
              <DropdownMenuItem
                className='flex items-center gap-2 py-1'
                asChild
              >
                <Link
                  target='_blank'
                  href={`https://sepolia.etherscan.io/tx/${transaction_hash}`}
                >
                  <Image
                    src='/images/etherscan.svg'
                    width={12}
                    height={12}
                    alt='etherscan'
                  />
                  <small className='text-xs'>View transaction</small>
                </Link>
              </DropdownMenuItem>
            )}
            {isOwner && (
              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger className='flex items-center gap-2 px-2 py-1 hover:bg-slate-100 focus:outline-none'>
                    <IoTrash size={12} className='text-red-500' />
                    <small className='text-xs'>Delete comment</small>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className='mb-2 space-y-1'>
                      <DialogTitle>Sure to delete comment?</DialogTitle>
                      <DialogDescription>
                        This action is irreversible
                      </DialogDescription>
                    </DialogHeader>

                    <div className='grid grid-cols-2 gap-4'>
                      <Button
                        variant='destructive'
                        onClick={() => {
                          handleDelete();
                          closeRef.current?.click();
                        }}
                      >
                        Delete
                      </Button>
                      <DialogClose ref={closeRef}>Close</DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }
);

CommentCard.displayName = 'CommentCard';
