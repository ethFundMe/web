import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { SimpleCampaign } from '@/types';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import ImageWithFallback from './ImageWithFallback';
import { ShareLinkBtn } from './ShareLinkBtn';
import { Button } from './ui/button';

export default function UserCampaignCard({
  campaign,
}: {
  campaign: SimpleCampaign;
}) {
  return (
    <div className='group overflow-hidden rounded-md border border-slate-300'>
      <Link href={`/campaigns/${campaign.campaign_id}`}>
        <ImageWithFallback
          className='h-[250px] w-full bg-slate-50 object-cover'
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
        <p className='font-bold'>{campaign.title}</p>

        <div className='grid grid-cols-2'>
          <Button asChild variant='outline'>
            <Link
              href={`/campaigns/${campaign.campaign_id}/edit`}
              className='flex w-full flex-1 items-center justify-center gap-2'
            >
              Edit
              <FaPen />
            </Link>
          </Button>
          <ShareLinkBtn campaign={campaign as SimpleCampaign} />
        </div>
      </div>
    </div>
  );
}
