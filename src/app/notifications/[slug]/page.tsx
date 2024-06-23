'use client';
import MobileNotificationLink from '@/components/MobileNotificationLink';
import Navbar from '@/components/Navbar';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from '@/lib/types';
// import { getNotfications } from '@/lib/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
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
  // const data = await getNotfications(slug);
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

  const { ref, inView } = useInView();

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
            <div className='w-full border-b p-2 px-5'>
              <p className='w-full py-2 text-xl md:text-center'>
                Notifications
              </p>
            </div>
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
