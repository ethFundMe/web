import { urlPreview } from '@/lib/api';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export const LinkPreview = async ({ url }: { url: string }) => {
  const url_data = await urlPreview(url);

  return (
    <Link
      href={url}
      target='_blank'
      rel='noreferrer'
      className={cn(
        'card group flex items-center rounded-md hover:bg-neutral-200'
      )}
    >
      <div className='h-28 w-28 flex-shrink-0 cursor-pointer overflow-hidden  rounded-md bg-slate-300'>
        <Image
          src={url_data.image ?? ''}
          height={300}
          width={300}
          alt='...'
          className='h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-105'
        />
      </div>

      <div className='text max-w-sm px-3'>
        <p className='line-clamp-2 text-lg font-bold'>{url_data.title}</p>
        <p className='line-clamp-2'>{url_data.description}</p>
      </div>
    </Link>
  );
};
