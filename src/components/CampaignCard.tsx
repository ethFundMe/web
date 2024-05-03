'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { usePRouter } from '@/lib/hook/useRouter';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { Campaign } from '@/types/db';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import ImageWithFallback from './ImageWithFallback';

dayjs.extend(advancedFormat);

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
  const user = campaign.user;

  return (
    <div
      onClick={() => router.push(`/campaigns/${campaign.campaign_id}`)}
      className={cn(
        'group flex cursor-pointer flex-col gap-4 rounded-md border border-primary-gray bg-white p-4 hover:border-primary-default',
        !full && 'w-full max-w-[400px] flex-shrink-0 md:pr-[40px]',
        variantStyles
      )}
    >
      <div className='h-80 overflow-hidden bg-slate-200 md:h-48 lg:h-60'>
        <ImageWithFallback
          className='h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-105'
          src={campaign.banner_url ?? '/images/broken.jpg'}
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
        <p className='line-clamp-2 bg-red-100 text-neutral-700 md:min-h-12'>
          {campaign.description}
        </p>
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
              fallback='/images/user-pfp.png'
              className='rounded-full bg-slate-200 object-cover'
              fill
              sizes='48px'
              alt='...'
            />
          </div>

          <div>
            <p className={TextSizeStyles.small}>Organizer</p>
            <p
              className={cn(
                TextSizeStyles.caption,
                'line-clamp-1 w-full font-semibold [word-break:break-all]'
              )}
            >
              {(user && user.fullName) ??
                formatWalletAddress(campaign.creator as `0x${string}`)}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap justify-between md:gap-2'>
          <p className={TextSizeStyles.small}>
            Organized On{' '}
            <span className={cn(TextSizeStyles.caption, 'font-semibold')}>
              {dayjs(campaign.created_at).format('Do MMM, YYYY')}
            </span>
          </p>
          {campaign.creator !== campaign.beneficiary && (
            <p className={cn(TextSizeStyles.small, 'text-primary-default')}>
              Organized for{' '}
              <span className={cn(TextSizeStyles.caption, 'font-semibold')}>
                {formatWalletAddress(campaign.beneficiary, 'short')}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* <DonateXShareButtons campaign={campaign} /> */}
    </div>
  );
};
