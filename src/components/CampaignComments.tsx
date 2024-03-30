'use client';

import { socket } from '@/lib/socketConfig';
import { TextSizeStyles } from '@/lib/styles';
import { Comment } from '@/lib/types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import useRefs from 'react-use-refs';
import { CommentForm } from './forms/CommentForm';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const CampaignComments = ({ campaign }: { campaign: Campaign }) => {
  const { user } = userStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [scrollContainerRef, scrollItemRef] = useRefs<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
      console.log('Socket connected 🔥');

      // Emit 'comment:join' event after the socket connection is established
      socket.emit('comment:join', joinData, onJoin);
    }

    function onDisonnect() {
      setIsConnected(false);
      console.log('Socket disconnected ❌');
    }

    const joinData = {
      data: {
        campaignID: campaign.id,
        userID: user?.id,
        limit: 24,
      },
    };

    const onJoin = (response: { data: Comment[]; totalComments: number }) => {
      console.log('Joined room', response);
      if (!response.data) return;
      setComments(response.data.reverse());
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisonnect);
    socket.on('comment:join', onJoin);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisonnect);
      socket.off('comment:join', onJoin);
      socket.disconnect();
    };
  }, [user?.id, campaign.id]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    scrollItemRef.current?.scrollTo({
      behavior: 'smooth',
      top: 200 * comments.length,
    });
  }, [comments.length, scrollContainerRef, scrollItemRef]);

  return (
    <aside className='mt-16 space-y-8'>
      {/* Chats */}
      <div className='chats flex flex-col space-y-4 pb-4'>
        <h2
          className={cn(TextSizeStyles.h5, 'font-light text-primary-default')}
        >
          Comments & Donations
        </h2>

        <ScrollArea className='h-[500px] pr-4' ref={scrollContainerRef}>
          <div className='space-y-4'>
            {[
              {
                user: { fullname: 'John' },
                createdAt: new Date(),
                amount: 4,
                comment: 'Hey there',
              },
            ].map(({ user: { fullname }, createdAt, amount, comment }, j) => (
              <div
                key={j}
                className={cn(
                  'rounded-lg border border-transparent p-2 text-sm',
                  amount && 'border-slate-300 bg-slate-50'
                )}
              >
                <div className='mb-2 flex flex-wrap items-start justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <div className='relative h-8 w-8 flex-shrink-0'>
                      <Image
                        className='block flex-shrink-0 rounded-full object-cover'
                        src='/images/pets.jpg'
                        fill
                        sizes='50px'
                        alt='...'
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

                  {!!amount && (
                    <Link
                      href='/'
                      target='_blank'
                      className='flex items-center gap-1 pr-2 text-xl font-bold text-primary-default'
                    >
                      <FaEthereum />
                      {/* <span>{formatEther(BigInt(amt))}</span> */}
                      <span>2</span>
                    </Link>
                  )}
                </div>
                <p className=''>{comment}</p>
              </div>
            ))}
          </div>

          <div className='h-3 bg-red-300' ref={scrollItemRef}></div>
        </ScrollArea>

        <Button
          type='button'
          className='hidden'
          disabled={!isConnected}
          onClick={() => {
            socket.emit('add:comment', {
              data: {
                userID: user?.id,
                campaignID: campaign.id,
                comment: 'another comment a',
              },
            });
          }}
        >
          Send comment
        </Button>

        <CommentForm campaignID={campaign.campaign_id} />
      </div>
    </aside>
  );
};
