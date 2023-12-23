import { urlPreview } from '@/lib/api';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LinkPreviewLoader } from './LinkPreviewLoader';

type UrlPreview = {
  image: string;
  title: string;
  description: string;
};

export const LinkPreview = ({ url }: { url: string }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [urlData, setUrlData] = useState<UrlPreview>();

  useEffect(() => {
    const getURLData = async () => {
      setLoading(true);
      const res = await urlPreview(url);

      const data = (await res.json()) as {
        message: string;
        error: boolean;
        previewData: UrlPreview | undefined;
      };

      setError(data.error);
      setUrlData(data.previewData);
    };

    getURLData()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [url]);

  const views = {
    error: (
      <p className='rounded-sm bg-red-200 bg-opacity-30 p-3 text-red-800 sm:min-w-[400px]'>
        Failed to load metadata
      </p>
    ),
    loading: <LinkPreviewLoader />,
    loaded: (
      <Link
        href={url}
        target='_blank'
        rel='noreferrer'
        className={cn(
          'group flex items-center rounded-md hover:bg-neutral-200 sm:min-w-[400px]'
        )}
      >
        <div className='h-28 w-28 flex-shrink-0 cursor-pointer overflow-hidden  rounded-md bg-slate-300'>
          <Image
            src={urlData?.image ?? ''}
            height={300}
            width={300}
            alt='...'
            className='h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-105'
          />
        </div>

        <div className='text max-w-sm px-3'>
          <p className='line-clamp-2 text-lg font-bold'>{urlData?.title}</p>
          <p className='line-clamp-2'>{urlData?.description}</p>
        </div>
      </Link>
    ),
  };

  const viewToShow = loading
    ? views.loading
    : error
    ? views.error
    : views.loaded;

  return viewToShow;
};
