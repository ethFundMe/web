'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { cn } from '@/lib/utils';
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
    <div
      className={cn(
        'group group flex flex-col overflow-hidden rounded-md border border-slate-300',
        (campaign.flagged || campaign.discontinued) && 'grayscale'
      )}
    >
      <Link
        href={`/campaigns/${campaign.campaign_id}`}
        className='block h-[80vw] overflow-hidden sm:h-[250px]'
      >
        <ImageWithFallback
          className='duration-250 h-[80vw] w-full bg-slate-50 object-cover transition-all group-hover:scale-105 sm:h-[250px] '
          src={campaign.banner_url}
          width={400}
          height={400}
          alt={campaign.title}
        />
      </Link>

      <div className='flex flex-1 flex-col gap-3 border-t border-slate-300 px-4 py-3'>
        <DonationObjectiveIndicator
          currentAmount={campaign.total_accrued}
          seekingAmount={campaign.goal}
        />

        <div className='h-full space-y-2'>
          <p className='font-bold'>{campaign.title}</p>
          {variant === 'viewer' && (
            <p className='line-clamp-3'>{campaign.description}</p>
          )}
        </div>

        <div
          className='grid grid-cols-2 gap-x-4'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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

          <ShareLinkBtn
            campaign={campaign}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}
