'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Campaign } from '@/types/db';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DonateXShareButtons from './DonateXShareButtons';

export const CampaignCard = ({
  campaign,
  full = true,
}: {
  campaign: Campaign;
  full?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      // href={`/campaigns/${campaign.campaign_id}`}
      onClick={() => router.push(`/campaigns/${campaign.campaign_id}`)}
      className={cn(
        'group flex cursor-pointer flex-col gap-4 rounded-md border border-primary-gray bg-white p-4 hover:border-primary-default',
        !full && 'w-full max-w-[400px] flex-shrink-0'
      )}
    >
      <div className='h-80 overflow-hidden bg-slate-200 md:h-48 lg:h-60'>
        <Image
          className='h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-105'
          src='/images/homepage-header.jpg'
          height={240}
          width={300}
          alt='...'
        />
      </div>

      <DonationObjectiveIndicator
        currentAmount={campaign.total_accrued}
        seekingAmount={campaign.goal}
      />

      <div
        onClick={(e) => {
          e.stopPropagation();
          router.push('/user-profile/0x2dc334lk556');
        }}
        className='flex flex-col-reverse justify-between gap-2'
      >
        <div className='flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200'>
          <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full'>
            <Image
              src='/images/wallet-connect-logo.png'
              className='h-full w-full object-cover'
              width={48}
              height={48}
              alt='...'
            />
          </div>

          <div>
            <p className={TextSizeStyles.small}>Campaign Organizer</p>
            <p className={cn(TextSizeStyles.caption, 'font-semibold')}>
              CLET For Africa Foundation
            </p>
          </div>
        </div>

        <div>
          <p className={TextSizeStyles.small}>
            Organized On{' '}
            <span className={cn(TextSizeStyles.caption, 'font-semibold')}>
              29th October, 2023
            </span>
          </p>
        </div>
      </div>

      <div className='flex-1'>
        <p className='line-clamp-2'>{campaign.description}</p>
      </div>

      <DonateXShareButtons campaign={campaign} />
    </div>
  );
};
