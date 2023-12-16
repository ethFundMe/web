import { ButtonStyle } from '@/components/Button';
import { CampaignCard } from '@/components/CampaignCard';
import { getUserCampaigns } from '@/lib/api';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function UserCampaignsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const campaigns = await getUserCampaigns(slug);

  // For testing sake
  // const campaigns = await getUserCampaigns(
  //   '0xee9718Df51B678653750B0Ae7AB57E9576E56D8b'
  // );

  return (
    <div className='w-full py-10 md:py-4'>
      {campaigns.length === 0 && (
        <div className='grid min-h-[calc(100vh-5rem)]  w-full place-content-center md:h-[30rem] md:min-h-full'>
          <p className={'mb-4 text-center text-xl text-gray-400'}>
            You have not started any campaigns yet
          </p>
          <Link
            href={'/campaigns/create'}
            className={cn(
              ButtonStyle.base,
              ButtonStyle.size.sm,
              'mx-auto bg-gray-300 text-gray-600'
            )}
          >
            Create campaign
          </Link>
        </div>
      )}

      {campaigns.length > 0 && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {campaigns.map((_, idx) => (
            <CampaignCard key={idx} campaign={_} />
          ))}
        </div>
      )}
    </div>
  );
}
