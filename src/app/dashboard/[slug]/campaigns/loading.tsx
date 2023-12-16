import { cn } from '@/lib/utils';

export default function LoadingUserCampaignsPage() {
  return (
    <div className='grid w-full grid-cols-1 gap-8 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          className={cn(
            'space-y-3',
            idx > 5 && 'hidden xl:block',
            idx > 3 && 'hidden lg:block'
          )}
          key={idx}
        >
          <div className='h-48 animate-pulse bg-slate-300'></div>
          <div className='h-4 animate-pulse bg-slate-300'></div>
          <div className='h-4 animate-pulse bg-slate-300'></div>
          <div className='h-4 animate-pulse bg-slate-300'></div>
        </div>
      ))}
    </div>
  );
}
