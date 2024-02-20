'use client';

import { getUser } from '@/actions';
import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { usePRouter } from '@/lib/hook/useRouter';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { User } from '@/types';
import { Campaign } from '@/types/db';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(campaign.creator as `0x${string}`).then((res) => setUser(res));
  }, [campaign.creator]);

  return (
    <div
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
          src={campaign?.media_links[0] ?? '/images/broken.jpg'}
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
          router.push(`/profile/${campaign.creator}`);
        }}
        className='flex flex-col-reverse justify-between gap-2'
      >
        <div className='flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200'>
          <div className='relative h-[48px] w-[48px] flex-shrink-0'>
            <ImageWithFallback
              src={(user && user.profileUrl) ?? ''}
              fallback='/images/pfp.svg'
              className='rounded-full bg-slate-200 object-cover'
              fill
              sizes='48px'
              alt='...'
            />
          </div>

          <div>
            <p className={TextSizeStyles.small}>Organizer</p>
            <p className={cn(TextSizeStyles.caption, 'font-semibold')}>
              {(user && user.fullName) ??
                formatWalletAddress(campaign.creator as `0x${string}`)}
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

      {/* <DonateXShareButtons campaign={campaign} /> */}
    </div>
  );
};
