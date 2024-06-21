'use client';

import { useSocket } from '@/lib/hook/useSocket';
import { TextSizeStyles } from '@/lib/styles';
import { Comment, SocketResponse } from '@/lib/types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiDonateHeart } from 'react-icons/bi';
import useRefs from 'react-use-refs';
import { CommentCard } from './CommentCard';
import { CommentForm } from './forms/CommentForm';
import { ScrollArea } from './ui/scroll-area';

export const CampaignComments = ({ campaign }: { campaign: Campaign }) => {
  const { user } = userStore();

  const [scrollContainerRef, scrollItemRef] = useRefs<HTMLDivElement>(null);

  const { refresh } = useRouter();
  const {
    socket,
    comments: socketComments,
    updateList,
  } = useSocket(campaign.id);
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    if (socket && socketComments) {
      setComments(socketComments);
    }
  }, [socket, socketComments]);

  function deleteComment(comment: Comment) {
    const isOwner = user?.fullName === comment.user.fullName;

    if (!isOwner) return;
    const data = {
      userId: user?.id,
      campaignUUID: campaign.id,
      commentId: comment.id,
    };

    if (socket) {
      socket.emit(
        'delete:comment',
        data,
        (response: SocketResponse<object>) => {
          if (response.status === 'OK') {
            socket.connect();
            toast.success('Comment deleted');
            refresh();
          }

          if (response.error) {
            if (response.error instanceof Error) {
              toast.error(response.error.message);
            } else {
              toast.error(response.error);
            }
          }
          if (process.env.NODE_ENV === 'development') {
            console.log('delete response', response);
          }
          socket.emit(
            'comment:join',
            {
              campaignUUID: campaign.id,
              userID: user?.id,
              limit: 24,
            },
            function (
              response: SocketResponse<{
                comments: Comment[];
                totalComments: number;
              }>
            ) {
              if (response.status === 'OK' && response.data) {
                updateList(response.data.comments);
              } else {
                console.error('Error fetching donations:', response.error);
              }
            }
          );
        }
      );
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollItem = scrollItemRef.current;

    if (!scrollContainer || !scrollItem) return;

    // Scroll to the bottom smoothly
    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      behavior: 'smooth',
    });
  }, [comments, scrollContainerRef, scrollItemRef]);

  const totalComments = comments?.length || 0;
  const numOfDonations = comments && comments.filter((c) => !!c.amount).length;

  return (
    <aside className='mt-16 space-y-8'>
      <div className='chats flex flex-col space-y-4 pb-4'>
        <div className='space-y-2'>
          <h2
            className={cn(TextSizeStyles.h5, 'font-light text-primary-default')}
          >
            Donations & Comments
          </h2>

          {comments && (
            <div className='stats flex gap-4 text-sm'>
              <span className='flex items-center gap-1'>
                <BiDonateHeart size={14} />
                {numOfDonations}
              </span>
              <span className='flex items-center gap-1'>
                <Image
                  src='/images/comment.png'
                  alt='...'
                  height={14}
                  width={14}
                />
                {totalComments}
              </span>
            </div>
          )}
        </div>

        <ScrollArea
          className={cn(
            'scrollarea scroll-smooth pr-4',
            comments &&
              (comments.length < 4 ? ' h-fit max-h-[500px]' : 'h-[500px]')
          )}
          ref={scrollContainerRef}
        >
          <div className='space-y-2'>
            {comments ? (
              comments.length > 0 ? (
                <>
                  {comments.map((comment) => (
                    <CommentCard
                      isOwner={user?.fullName === comment.user.fullName}
                      handleDelete={() => deleteComment(comment)}
                      key={`${comment.id}`}
                      comment={comment}
                    />
                  ))}

                  <div ref={scrollItemRef} className='h-1 w-full'></div>
                </>
              ) : (
                <p className='text-primary-gray'>
                  Be the first to leave a comment
                </p>
              )
            ) : (
              <div className='space-y-2'>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div className='rounded-lg p-2' key={idx}>
                    <div className='flex items-start gap-2 '>
                      <div className='h-8 w-8 flex-shrink-0 animate-pulse rounded-full bg-slate-200'></div>
                      <div className='mb-2 space-y-2'>
                        <div className='h-2 w-20 animate-pulse rounded bg-slate-200'></div>
                        <div className='h-2 w-24 animate-pulse rounded bg-slate-200'></div>
                      </div>
                    </div>
                    <div className='mt-2 space-y-2'>
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                          key={idx}
                          className='h-2 w-full animate-pulse rounded bg-slate-200'
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        <CommentForm campaignId={campaign.id} />
      </div>
    </aside>
  );
};
