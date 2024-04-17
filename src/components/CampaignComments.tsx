'use client';

import { useSocket } from '@/lib/hook/useSocket';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useRefs from 'react-use-refs';
import { CommentCard } from './CommentCard';
import { CommentForm } from './forms/CommentForm';

export const CampaignComments = ({ campaign }: { campaign: Campaign }) => {
  const { user } = userStore();

  const [scrollContainerRef, scrollItemRef] = useRefs<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { refresh } = useRouter();
  const { socket, comments, handleAddComment } = useSocket(
    campaign.campaign_id
  );

  // useEffect(() => {
  //   socket.connect();

  //   function onConnect() {
  //     setIsConnected(true);
  //     console.log('Connected');

  //     socket.emit('join:comment', joinData, onJoin);
  //   }

  //   // function onComment(response: { data: Comment; totalComments: number }) {
  //   //   if (!response.data) return;
  //   //   console.log('Listening', response);
  //   //   setComments((prev) => [...prev, response.data]);
  //   // }

  //   // function onDisonnect() {
  //   //   setIsConnected(false);
  //   //   // console.log('Socket disconnected ❌');
  //   // }

  //   const joinData = {
  //     data: {
  //       campaignID: campaign.id,
  //       userID: user?.id,
  //       limit: 24,
  //     },
  //   };

  //   const onJoin = (response: { data: Comment[]; totalComments: number }) => {
  //     console.log('Joined room', response);

  //     if (response.data) {
  //       setComments(response.data);
  //     }
  //   };

  //   socket.on('connect', onConnect);
  //   // socket.on('disconnect', onDisonnect);
  //   // socket.on('comment:join', onJoin);
  //   // socket.on('campaign:comment', onComment);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     // socket.off('disconnect', onDisonnect);
  //     // socket.off('comment:join', onJoin);
  //     // socket.on('campaign:comment', onComment);
  //     socket.disconnect();
  //   };
  // }, [user?.id, campaign.id]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollItem = scrollItemRef.current;

    if (!scrollContainer || !scrollItem) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const childRect = scrollItem.getBoundingClientRect();
    const scrollOffset = childRect.top - containerRect.top;

    scrollContainer.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  }, [comments, scrollContainerRef, scrollItemRef]);

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
            comments.length < 4 && 'h-32'
          )}
          ref={scrollContainerRef}
        >
          <div className='space-y-2'>
            <AnimatePresence>
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <CommentCard
                    handleDelete={
                      user?.fullName === comment.user.fullname
                        ? (userID) => {
                            socket.emit('delete:comment', {
                              data: {
                                userID,
                                campaignID: campaign.id,
                                commentID: comment.commentID,
                              },
                            });
                            refresh();
                          }
                        : null
                    }
                    key={comment.commentID}
                    comment={comment}
                    ref={idx === comments.length - 1 ? scrollItemRef : null}
                  />
                ))
              ) : (
                <p className='text-primary-gray'>
                  Be the first to leave a comment
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* <Button
          type='button'
          className=''
          disabled={!isConnected}
          onClick={() => {}}
        >
          Send comment
        </Button> */}

        <CommentForm handleAddComment={handleAddComment} />
      </div>
    </aside>
  );
};
