export default function Loading() {
  return (
    <div className='mb-8 w-full px-4'>
      <div className='h-56 w-full animate-pulse bg-slate-300' />
      <div className='mt-4 flex items-center space-x-4'>
        <div className='h-24 w-24 flex-shrink-0 animate-pulse rounded-full bg-slate-300' />
        <div className='w-full space-y-2 pr-4'>
          <div className='h-4 w-52 animate-pulse rounded-full bg-slate-300' />
          <div className='h-2 w-full animate-pulse rounded-full bg-slate-300' />
          <div className='h-2 w-full animate-pulse rounded-full bg-slate-300' />
          <div className='h-2 w-full animate-pulse rounded-full bg-slate-300' />
        </div>
      </div>

      <div className='mt-12'>
        <div className='h-4 w-32 rounded-full bg-slate-300' />

        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx}>
              <div className='mb-2 h-52 animate-pulse bg-slate-300' />
              <div className='space-y-1'>
                <div className='h-2 animate-pulse rounded-full bg-slate-300' />
                <div className='h-2 animate-pulse rounded-full bg-slate-300' />
                <div className='h-2 animate-pulse rounded-full bg-slate-300' />
              </div>
              <div className='mt-2 grid grid-cols-2 gap-4'>
                <div className='h-6 animate-pulse bg-slate-300' />
                <div className='h-6 animate-pulse bg-slate-300' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
