'use client';
import { Notification } from '@/lib/types';
import { Coins } from 'lucide-react';
import Link from 'next/link';
import { MdOutlineCampaign } from 'react-icons/md';

export default function MobileNotificationLink({
  item,
}: {
  item: Notification;
}) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';

  function formatDateToHumanReadable(dateString: Date): string {
    const date = new Date(dateString);
    const now = new Date();

    const timeDifference = now.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    const formatTime = (date: Date): string => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes}${period}`;
    };

    if (daysDifference === 0) {
      return `today, ${formatTime(date)}`;
    } else if (daysDifference === 1) {
      return `yesterday, ${formatTime(date)}`;
    } else {
      return `${daysDifference} days ago`;
    }
  }
  const viewNotification = async ({
    id,
    eth_address,
  }: {
    id: string;
    eth_address: `0x${string}`;
  }) => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/notifications/${eth_address}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Link
      href={item.url}
      onClick={() => {
        viewNotification({
          id: item.id as string,
          eth_address: item.eth_address as `0x${string}`,
        });
      }}
      className='flex w-full items-center gap-x-8'
    >
      <>
        {item.notification_type === 'CAMPAIGN UPDATED' && (
          <div className='ml-5'>
            {MdOutlineCampaign({
              size: 16,
            })}
          </div>
        )}
        {item.notification_type === 'CAMPAIGN CREATED' && (
          <img
            src='/images/create_campaign.png'
            alt='create'
            className='ml-5 w-4'
          />
        )}
        {item.notification_type === 'COMMENT' && (
          <img src='/images/comment.png' alt='fund' className='ml-5 w-4' />
        )}
        {item.notification_type === 'FUNDER' && (
          <img src='/images/fund.png' alt='fund' className='ml-5 w-4' />
        )}
        {item.notification_type === 'CREATOR FEE UPDATED' && (
          <img src='/images/gear.png' alt='gear' className='ml-5 w-4' />
        )}
        {item.notification_type === 'FUNDED' && (
          <img src='/images/fund.png' alt='fund' className='ml-5 w-4' />
        )}
        {item.notification_type === 'TOKEN REWARDS' && (
          <div className='ml-5'>
            <Coins size={16} />
          </div>
        )}
      </>
      <div className='w-full space-y-1 py-3 pr-4'>
        <p className='w-full text-left text-[10px] text-gray-400'>
          {formatDateToHumanReadable(item?.created_at as Date)}
        </p>
        <div className=''>
          <p className='text-sm'>{item.description}</p>
        </div>
      </div>
    </Link>
  );
}
