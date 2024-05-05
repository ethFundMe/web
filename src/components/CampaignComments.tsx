'use client';

import { useSocket } from '@/lib/hook/useSocket';
import { TextSizeStyles } from '@/lib/styles';
import { Comment, SocketResponse } from '@/lib/types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CommentCard } from './CommentCard';
import { CommentForm } from './forms/CommentForm';

export const CampaignComments = ({ campaign }: { campaign: Campaign }) => {
  const { user } = userStore();

  // const [scrollContainerRef, scrollItemRef] = useRefs<HTMLDivElement>(null);

  const { refresh } = useRouter();
  const { socket, comments: socketComments } = useSocket(campaign.id);
  const [comments, setComments] = useState(socketComments);

  useEffect(() => {
    if (socket && socketComments) {
      setComments(socketComments);
    }
  }, [socket, socketComments]);

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   const scrollItem = scrollItemRef.current;

  //   if (!scrollContainer || !scrollItem) return;

  //   const containerRect = scrollContainer.getBoundingClientRect();
  //   const childRect = scrollItem.getBoundingClientRect();
  //   const scrollOffset = childRect.top - containerRect.top;

  //   scrollContainer.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  // }, [comments, scrollContainerRef, scrollItemRef]);

  return (
    <aside className='mt-16 space-y-8'>
      <div className='chats flex flex-col space-y-4 pb-4'>
        <h2
          className={cn(TextSizeStyles.h5, 'font-light text-primary-default')}
        >
          Comments & Donations
        </h2>

        <div
          className={cn(
            'h-[500px] overflow-y-auto scroll-smooth pr-4',
            comments.length < 4 && 'h-fit max-h-[500px]'
          )}
          // ref={scrollContainerRef}
        >
          <div className='space-y-2'>
            {comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <CommentCard
                    handleDelete={
                      user?.fullName === comment.user.fullName
                        ? () => {
                            const data = {
                              userId: user.id,
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
                                        if (
                                          response.status === 'OK' &&
                                          response.data
                                        ) {
                                          setComments(response.data.comments);
                                        } else {
                                          console.error(
                                            'Error fetching donations:',
                                            response.error
                                          );
                                        }
                                      }
                                    );
                                    return;
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
                                }
                              );
                            }
                          }
                        : null
                    }
                    key={`${comment.id}`}
                    comment={comment}
                  />
                ))}

                {/* <div ref={scrollItemRef} className='h-1 w-full'></div> */}
              </>
            ) : (
              <p className='text-primary-gray'>
                Be the first to leave a comment
              </p>
            )}
          </div>
        </div>

        <CommentForm campaignId={campaign.id} />
      </div>
    </aside>
  );
};
