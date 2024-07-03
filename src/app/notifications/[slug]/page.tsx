'use client';
import MobileNotificationLink from '@/components/MobileNotificationLink';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
// import Notifications from '@/components/Notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from '@/lib/types';
import { userStore } from '@/store';
// import { getNotfications } from '@/lib/queries';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Inbox } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useInView } from 'react-intersection-observer';

interface TNotifictaions {
  notification: Notification[];
  meta: {
    limit: number;
    page: number;
    totalNotifications: number;
    totalPages: number;
  };
}

const NotificationsPage = ({
  params: { slug },
}: {
  params: { slug: `0x${string}` };
}) => {
  const { user } = userStore();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';

  const fetchNotifications = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<{
    data: TNotifictaions;
    nextPage: number | null;
  }> => {
    const res = await fetch(
      `${apiBaseUrl}/api/notifications/${slug}?limit=${pageParam}`
    );
    const data = (await res.json()) as TNotifictaions;
    return {
      data,
      nextPage:
        pageParam + data.meta.limit < data.meta.totalNotifications
          ? pageParam + data.meta.limit
          : null,
    };
  };

  const { data: unreadCount } = useQuery({
    queryKey: ['unreadCount'],
    queryFn: () =>
      fetch(`${apiBaseUrl}/api/notifications/${slug}/count?viewed=false`).then(
        (res) => res.json()
      ),
  });

  const { ref, inView } = useInView();
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

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      queryFn: fetchNotifications,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === 'pending' || error)
    return (
      <>
        <Navbar />
        <div className='w-full border-b p-2 px-5'>
          <p className='w-full text-xl md:text-center'>Notifications</p>
        </div>
        <div className='spacy-y-4 my-8 mb-16 pl-4'>
          <div className='flex h-10 gap-x-6'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-y-1'>
              <div className='h-2 w-6 animate-pulse rounded-full bg-gray-200'>
                {' '}
              </div>
              <div className='h-3 w-24 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>
          <div className='flex h-10 gap-x-6'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-y-1'>
              <div className='h-2 w-10 animate-pulse rounded-full bg-gray-200'>
                {' '}
              </div>
              <div className='h-3 w-24 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>
          <div className='flex h-10 gap-x-6'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-y-1'>
              <div className='h-2 w-6 animate-pulse rounded-full bg-gray-200'>
                {' '}
              </div>
              <div className='h-3 w-16 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>
          <div className='flex h-10 gap-x-6'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-y-1'>
              <div className='h-2 w-4 animate-pulse rounded-full bg-gray-200'>
                {' '}
              </div>
              <div className='h-3 w-12 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>
          <div className='flex h-10 gap-x-6'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-y-1'>
              <div className='h-2 w-8 animate-pulse rounded-full bg-gray-200'>
                {' '}
              </div>
              <div className='h-3 w-44 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>
          <div className='flex h-10 gap-x-6'>
            <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
            <div className='flex flex-col gap-y-1'>
              <div className='h-2 w-6 animate-pulse rounded-full bg-gray-200'>
                {' '}
              </div>
              <div className='h-3 w-32 animate-pulse rounded bg-gray-300'></div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div>
        <div
          className={`${
            data.pages.length === 0 //correct this
              ? 'flex flex-col items-center justify-center'
              : ''
          } w-full overflow-y-auto rounded-md border px-0 py-2 text-sm`}
        >
          <>
            {data.pages[0].data.meta.totalNotifications <= 0 ? (
              <div className='flex items-center justify-between border-b p-2 px-5'>
                <p className='text-3xl'>
                  Notifications{' '}
                  {unreadCount.total !== 0 && (
                    <span className='text-sm md:hidden'>
                      ({unreadCount.total})
                    </span>
                  )}{' '}
                </p>
                <div className='md:hidden'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiEllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        {' '}
                        <button
                          onClick={() => {
                            viewAllNotification({
                              eth_address: user?.ethAddress as `0x${string}`,
                            });
                            router.refresh();
                          }}
                          className='rounded-md p-2 text-xs disabled:cursor-not-allowed disabled:text-gray-400'
                        >
                          Mark all as read
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  onClick={() => {
                    viewAllNotification({
                      eth_address: user?.ethAddress as `0x${string}`,
                    });
                    router.refresh();
                  }}
                  className='hidden md:flex'
                >
                  Mark all as read
                </Button>
              </div>
            ) : (
              <div className='flex h-[60vh] w-full items-center justify-center'>
                <div className='inset-center grid w-full place-items-center'>
                  <Inbox
                    size={60}
                    color='#000'
                    strokeWidth={0.75}
                    absoluteStrokeWidth
                    className='rounded-full bg-gray-100 p-3'
                  />
                  <h4 className='w-full pt-2 text-center'>
                    No new notifications
                  </h4>
                </div>
              </div>
            )}
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.data.notification.map((item, index) => (
                  <div
                    key={index}
                    className={`block w-full border-b p-0 ${
                      item.viewed === false ? 'bg-primary-default/10' : ''
                    }`}
                  >
                    <MobileNotificationLink item={item} />
                  </div>
                ))}
              </Fragment>
            ))}
          </>
        </div>
        <div className='flex w-full justify-center'>
          {isFetching && !isFetchingNextPage ? (
            <svg className='mr-3 h-5 w-5 animate-spin'></svg>
          ) : null}
        </div>
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default NotificationsPage;
