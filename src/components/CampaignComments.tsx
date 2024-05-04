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

  const { refresh } = useRouter();
  const { socket, comments, handleAddComment } = useSocket(campaign.id);

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
            comments.length < 4 && 'h-fit max-h-[500px]'
          )}
          ref={scrollContainerRef}
        >
          <div className='space-y-2'>
            <AnimatePresence>
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <CommentCard
                    handleDelete={
                      user?.fullName === comment.user.fullName
                        ? (userID) => {
                            socket.emit('delete:comment', {
                              userID,
                              campaignUUID: campaign.id,
                              commentID: comment.id,
                            });
                            refresh();
                          }
                        : null
                    }
                    key={`${idx}-${comment.transaction_hash}`}
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

        <CommentForm handleAddComment={handleAddComment} />
      </div>
    </aside>
  );
};
