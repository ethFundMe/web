import Link from 'next/link';

export default function DashboardBottomTabs({
  routes,
}: {
  routes: { link: string; title: string; icon: React.ReactNode }[];
}) {
  return (
    <div className='bottom-tabs fixed bottom-0 left-0 z-20 w-full bg-primary-dark px-6'>
      <div className='flex justify-between'>
        {routes.map((route, idx) => (
          <Link
            href={route.link}
            key={idx}
            className='flex flex-col items-center gap-1 p-4 text-white sm:px-6 sm:py-6'
            title={route.title}
          >
            <span className='text-3xl'>{route.icon}</span>
            {/* <span className='text-sm'>{route.title}</span> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
