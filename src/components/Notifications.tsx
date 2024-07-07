/* eslint-disable @next/next/no-img-element */
'use client';
import { Notification } from '@/lib/types';
import { getRelativeTime } from '@/lib/utils';
import { userStore } from '@/store';
import DOMPurify from 'dompurify';
import { Bell, Coins, Inbox } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { HiEllipsisVertical } from 'react-icons/hi2';
import useSWR from 'swr';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface Meta {
  limit: number;
  page: number;
  totalNotifications: number;
  totalPages: number;
}
const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = userStore();

  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  const { data, isLoading, error } = useSWR<{
    notification: Notification[];
    meta: Meta;
  }>(`${apiBaseUrl}/api/notifications/${user?.ethAddress}`, fetcher);

  const { data: unreadCount } = useSWR<{
    total: number;
  }>(
    `${apiBaseUrl}/api/notifications/${user?.ethAddress}/count?viewed=false`,
    fetcher
  );

  useEffect(() => {
    if (data && data.notification) {
      setNotifications(data.notification);
    }
  }, [data]);

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
      if (process.env.NODE_ENV === 'development') {
        console.log(resData);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  };
  const viewAllNotification = async ({
    eth_address,
  }: {
    eth_address: `0x${string}`;
  }) => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/notifications/view/${eth_address}/all`,
        {
          method: 'PUT',
          // body: JSON.stringify({ eth_address }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resData = await res.json();
      if (process.env.NODE_ENV === 'development') {
        console.log(resData);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  };
  if (isLoading || error)
    return (
      <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200'></div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative focus:border-none focus:outline-none active:border-none active:outline-none'>
        <Bell />
        {(unreadCount?.total ?? 0) > 0 && (
          <p className='absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center  rounded-full bg-[#f62442] text-[10px] text-white'>
            {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full delay-300 duration-1000 bg-[#f62442] opacity-40"></span> */}
            {unreadCount?.total}
          </p>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          'max-h-96 min-h-96 w-96 overflow-y-auto rounded-md border px-0 py-2 text-sm'
        }
      >
        <>
          <div className='flex items-center justify-between border-b p-2 px-5'>
            <p>Notifications</p>
            {(unreadCount?.total as number) !== 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HiEllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    {' '}
                    <button
                      onClick={() => {
                        const allViewed = notifications.map((item) => ({
                          ...item,
                          viewed: true,
                        }));
                        setNotifications(allViewed);
                        viewAllNotification({
                          eth_address: user?.ethAddress as `0x${string}`,
                        });
                      }}
                      className='rounded-md p-2 text-xs disabled:cursor-not-allowed disabled:text-gray-400'
                    >
                      Mark all as read
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {' '}
                    <Link
                      href={`/notifications/${user?.ethAddress}`}
                      className='rounded-md p-2 text-xs'
                    >
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {notifications.length !== 0 ? (
            <>
              {notifications?.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className='block w-full border-b p-0'
                >
                  <Link
                    href={item.url}
                    onClick={() => {
                      viewNotification({
                        id: item.id as string,
                        eth_address: item.eth_address as `0x${string}`,
                      });
                      router.push(item.url);
                    }}
                    className='flex w-full items-center gap-x-8'
                  >
                    <>
                      {item.notification_type === 'CAMPAIGN UPDATED' && (
                        <img
                          src='/images/pen.png'
                          alt='create'
                          className='ml-5 w-4'
                        />
                      )}
                      {item.notification_type === 'CREATOR FEE UPDATED' && (
                        <img
                          src='/images/gear.png'
                          alt='create'
                          className='ml-5 w-4'
                        />
                      )}
                      {item.notification_type === 'COMMENT' && (
                        <img
                          src='/images/comment.png'
                          alt='create'
                          className='ml-5 w-4'
                        />
                      )}
                      {item.notification_type === 'CAMPAIGN CREATED' && (
                        <img
                          src='/images/create_campaign.png'
                          alt='create'
                          className='ml-5 w-4'
                        />
                      )}
                      {item.notification_type === 'FUNDED' && (
                        <div className='ml-5'>
                          <Coins size={16} />
                        </div>
                      )}
                      {item.notification_type === 'FUNDER' && (
                        <div className='ml-5'>
                          <BiDonateHeart size={18} />
                        </div>
                      )}
                      {item.notification_type === 'TOKEN REWARDS' && (
                        <div className='ml-5'>
                          <Coins size={16} />
                        </div>
                      )}
                    </>
                    <div className='w-full space-y-1 py-3 pr-4'>
                      <p className='w-full text-left text-[10px] text-gray-400'>
                        {getRelativeTime(item?.created_at as Date)}
                      </p>
                      <div className='relative'>
                        {!item.viewed && (
                          <div className=' absolute -left-3 mt-1 h-2 w-2 rounded-full bg-[#0062a6] p-0'></div>
                        )}
                        <p
                          className='text-sm'
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.description),
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
              <div className='my-4 flex w-full justify-center'>
                <Button asChild={true}>
                  <Link href={`/notifications/${user?.ethAddress}`}>
                    Show All
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className='inset-center grid w-full place-items-center'>
              <Inbox
                size={60}
                color='#000'
                strokeWidth={0.75}
                absoluteStrokeWidth
                className='rounded-full bg-gray-100 p-3'
              />
              <h4 className='w-full pt-2 text-center'>No new notifications</h4>
            </div>
          )}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
