'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import { Campaign } from '@/types/db';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Link from 'next/link';
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
  const variantStyles = cn(!inSidebar ? '' : 'lg:border-none');
  const user = campaign.user;

  return (
    <div
      className={`border pb-4 ${
        campaign.flagged
          ? 'border-red-500 hover:border-red-500'
          : 'rounded-md border-primary-gray hover:border-primary-default'
      }`}
    >
      <Link
        href={`/campaigns/${campaign.campaign_id}`}
        // onClick={() => router.push(`/campaigns/${campaign.campaign_id}`)}
        className={cn(
          'group flex cursor-pointer flex-col gap-1  bg-white p-4',
          !full && 'w-full flex-shrink-0 md:max-w-[400px]',
          variantStyles
        )}
      >
        <div
          className={cn(
            'h-80 overflow-hidden bg-slate-200 md:h-48 lg:h-60',
            campaign.flagged && 'grayscale'
          )}
        >
          <ImageWithFallback
            className='h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-[1.03]'
            src={campaign.banner_url ?? '/images/broken.jpg'}
            height={240}
            width={300}
            alt='...'
          />
        </div>

        <DonationObjectiveIndicator
          className={cn(campaign.flagged && 'grayscale')}
          currentAmount={campaign.total_accrued}
          seekingAmount={campaign.goal}
        />

        <div className='flex-1'>
          <p className='line-clamp-1 text-xl font-semibold'>{campaign.title}</p>
          <p className='line-clamp-2 text-neutral-700 md:min-h-12'>
            {campaign.description}
          </p>
        </div>

        <div className='space-y-2'>
          {campaign.creator !== campaign.beneficiary && (
            <p
              className={cn(TextSizeStyles.small, 'text-primary-default')}
              onClick={(e) => e.preventDefault()}
            >
              Organized for{' '}
              <span className={cn(TextSizeStyles.caption, 'font-semibold')}>
                {formatWalletAddress(campaign.beneficiary, 'short')}
              </span>
            </p>
          )}

          <Link
            href={`/profile/${campaign.creator}`}
            onClick={(e) => {
              e.stopPropagation();
              // router.push(`/profile/${campaign.creator}`);
            }}
            className={cn(
              'flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200',
              campaign.flagged && 'grayscale'
            )}
          >
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
          </Link>
        </div>
      </Link>
    </div>
  );
};
