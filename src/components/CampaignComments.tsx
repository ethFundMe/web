'use client';

import { socket } from '@/lib/socketConfig';
import { TextSizeStyles } from '@/lib/styles';
import { Comment } from '@/lib/types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import useRefs from 'react-use-refs';
import { CommentCard } from './CommentCard';
import { CommentForm } from './forms/CommentForm';

export const CampaignComments = ({ campaign }: { campaign: Campaign }) => {
  const { user } = userStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [scrollContainerRef, scrollItemRef] = useRefs<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
      socket.emit('comment:join', joinData, onJoin);
    }

    function onComment(response: { data: Comment; totalComments: number }) {
      if (!response.data) return;
      // console.log('Listening', response);
      setComments((prev) => [...prev, response.data]);
    }

    function onDisonnect() {
      setIsConnected(false);
      // console.log('Socket disconnected ❌');
    }

    const joinData = {
      data: {
        campaignID: campaign.id,
        userID: user?.id,
        limit: 24,
      },
    };

    const onJoin = (response: { data: Comment[]; totalComments: number }) => {
      // console.log('Joined room', response);
      if (!response.data) return;
      setComments(response.data.reverse());
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisonnect);
    socket.on('comment:join', onJoin);
    socket.on('campaign:comment', onComment);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisonnect);
      socket.off('comment:join', onJoin);
      socket.on('campaign:comment', onComment);
      socket.disconnect();
    };
  }, [user?.id, campaign.id]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollItem = scrollItemRef.current;

    if (!scrollContainer || !scrollItem) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const childRect = scrollItem.getBoundingClientRect();
    const scrollOffset = childRect.top - containerRect.top;

    scrollContainer.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  }, [comments.length, scrollContainerRef, scrollItemRef]);

  return (
    <aside className='mt-16 space-y-8'>
      <div className='chats flex flex-col space-y-4 pb-4'>
        <h2
          className={cn(TextSizeStyles.h5, 'font-light text-primary-default')}
        >
          Comments & Donations
        </h2>

        <div
          className='h-[500px] overflow-y-auto scroll-smooth pr-4'
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

        <CommentForm
          handleAddComment={(comment) => {
            socket.emit('add:comment', {
              data: {
                userID: user?.id,
                campaignID: campaign.id,
                comment,
              },
            });
          }}
        />
      </div>
    </aside>
  );
};
