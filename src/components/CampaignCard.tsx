'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { usePRouter } from '@/lib/hook/useRouter';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { Campaign } from '@/types/db';
import dayjs from 'dayjs';
import Image from 'next/image';
import DonateXShareButtons from './DonateXShareButtons';
import ImageWithFallback from './ImageWithFallback';

export const CampaignCard = ({
  campaign,
  full = true,
  inSidebar = false,
}: {
  campaign: Campaign;
  full?: boolean;
  inSidebar?: boolean;
}) => {
  const router = usePRouter();
  const variantStyles = cn(!inSidebar ? '' : 'lg:border-none');

  return (
    <div
      // href={`/campaigns/${campaign.campaign_id}`}
      onClick={() => router.push(`/campaigns/${campaign.campaign_id}`)}
      className={cn(
        'group flex cursor-pointer flex-col gap-4 rounded-md border border-primary-gray bg-white p-4 hover:border-primary-default',
        !full && 'w-full max-w-[400px] flex-shrink-0',
        variantStyles
      )}
    >
      <div className='h-80 overflow-hidden bg-slate-200 md:h-48 lg:h-60'>
        <ImageWithFallback
          className='h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-105'
          src={campaign?.media_links[0] ?? '/images/homepage-header.jpg'}
          height={240}
          width={300}
          alt='...'
        />
      </div>

      <DonationObjectiveIndicator
        currentAmount={campaign.total_accrued}
        seekingAmount={campaign.goal}
      />

      <div className='flex-1'>
        <p className='line-clamp-1 text-xl font-semibold'>{campaign.title}</p>
        <p className='line-clamp-2 text-neutral-700'>{campaign.description}</p>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/user-profile/${campaign.creator}`);
        }}
        className='flex flex-col-reverse justify-between gap-2'
      >
        <div className='flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200'>
          <Image
            src='/images/pfp.svg'
            className='flex-shrink-0 rounded-full bg-slate-200 object-cover'
            width={48}
            height={48}
            alt='...'
          />

          <div>
            <p className={TextSizeStyles.small}>Campaign Organizer</p>
            <p className={cn(TextSizeStyles.caption, 'font-semibold')}>
              {formatWalletAddress(campaign.creator as `0x${string}`)}{' '}
            </p>
          </div>
        </div>

        <div>
          <p className={TextSizeStyles.small}>
            Organized On{' '}
            <span className={cn(TextSizeStyles.caption, 'font-semibold')}>
              {dayjs(campaign.created_at).format('DD MMM, YYYY')}
            </span>
          </p>
        </div>
      </div>

      <DonateXShareButtons campaign={campaign} />
    </div>
  );
};
