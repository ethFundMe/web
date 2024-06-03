'use client';
import { Notification } from '@/lib/types';
import { userStore } from '@/store';
import { Bell, Inbox } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineCampaign } from 'react-icons/md';
import useSWR from 'swr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = userStore();

  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  const { data, isLoading, error } = useSWR<{
    notification: Notification[];
  }>(
    `${apiBaseUrl}/api/notifications/${user?.ethAddress}?viewed=false`,
    fetcher
  );

  useEffect(() => {
    if (data && data.notification) {
      setNotifications(data.notification);
    }
  }, [data]);

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
  const viewAllNotification = async ({
    eth_address,
  }: {
    eth_address: `0x${string}`;
  }) => {
    try {
      console.log(eth_address);
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
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading || error)
    return (
      <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200'></div>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative active:border-none active:outline-none'>
        <Bell />
        {notifications?.length !== 0 && (
          <p className='absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center  rounded-full bg-[#f62442] text-[10px] text-white'>
            {notifications?.length}
          </p>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${
          notifications.length === 0
            ? 'flex flex-col items-center justify-center'
            : ''
        } max-h-96 min-h-96 min-w-72 max-w-md overflow-y-auto rounded-md border px-0 py-2 text-sm`}
      >
        {notifications.length !== 0 ? (
          <>
            <div className='flex items-center justify-between border-b p-2 px-3'>
              <p>Notifications</p>
              <button
                onClick={() => {
                  viewAllNotification({
                    eth_address: user?.ethAddress as `0x${string}`,
                  });
                  setNotifications([]);
                }}
                className='rounded-md p-2 text-xs font-semibold text-primary-default'
              >
                Mark all as read
              </button>
            </div>
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
                  className='flex w-full items-center gap-x-2 border-l-4 border-[#042D42]'
                >
                  <>
                    {item.notification_type === 'CAMPAIGN' && (
                      <div className=''>{MdOutlineCampaign({ size: 16 })}</div>
                    )}
                    {item.notification_type === 'FUNDING' && (
                      <img
                        src='/images/fund.png'
                        alt='fund'
                        className='w-6 pl-2'
                      />
                    )}
                    {item.notification_type === 'TOKEN REWARDS' && (
                      <img
                        src='/images/eth-logo.png'
                        alt='fund'
                        className='w-6'
                      />
                    )}
                  </>
                  <div className='w-full pr-5 pt-1'>
                    <p className='w-full text-right text-[10px]'>
                      {formatDateToHumanReadable(item?.created_at as Date)}
                    </p>
                    <div className='p-2 pt-0'>
                      <h3 className='text-sm font-semibold capitalize text-gray-400'>
                        {item.notification_type}
                      </h3>
                      <p className='text-xs'>{item.description}</p>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
