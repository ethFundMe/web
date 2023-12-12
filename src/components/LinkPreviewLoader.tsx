export const LinkPreviewLoader = () => {
  return (
    <div className='card flex w-full items-center gap-3 sm:min-w-[400px]'>
      <div className='h-24 w-24 flex-shrink-0 animate-pulse gap-2 rounded-md bg-slate-300'></div>

      <div className='flex w-full max-w-sm flex-1 flex-col gap-2'>
        <div className='h-6 w-full animate-pulse bg-slate-300' />

        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className='h-3 w-full animate-pulse bg-slate-300' />
        ))}
      </div>
    </div>
  );
};
