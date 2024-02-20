import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { Campaign } from '@/types';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import { DonateBtn } from './DonateBtn';
import ImageWithFallback from './ImageWithFallback';
import { ShareLinkBtn } from './ShareLinkBtn';
import { Button } from './ui/button';

export default function UserCampaignCard({
  campaign,
  variant = 'user',
}: {
  campaign: Campaign;
  variant?: 'user' | 'viewer';
}) {
  return (
    <div className='group overflow-hidden rounded-md border border-slate-300'>
      <Link href={`/campaigns/${campaign.campaign_id}`}>
        <ImageWithFallback
          className='h-[80vw] w-full bg-slate-50 object-cover sm:h-[250px]'
          src={campaign.media_links[0]}
          width={400}
          height={400}
          alt={campaign.title}
        />
      </Link>

      <div className='space-y-2 border-t border-slate-300 px-4 py-3'>
        <DonationObjectiveIndicator
          currentAmount={campaign.total_accrued}
          seekingAmount={campaign.goal}
        />

        <div className='space-y-1'>
          <p className='font-bold'>{campaign.title}</p>
          {variant === 'viewer' && (
            <p className='line-clamp-4'>{campaign.description}</p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {variant === 'user' && (
            <Button asChild variant='outline'>
              <Link
                href={`/campaigns/${campaign.campaign_id}/edit`}
                className='flex w-full flex-1 items-center justify-center gap-2'
              >
                Edit
                <FaPen />
              </Link>
            </Button>
          )}

          {variant === 'viewer' && <DonateBtn campaign={campaign} />}

          <ShareLinkBtn campaign={campaign} />
        </div>
      </div>
    </div>
  );
}
