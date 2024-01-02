'use client';

import { cn } from '@/lib/utils';
import { Campaign } from '@/types/db';
import { DonateBtn } from './DonateBtn';
import { ShareLinkBtn } from './ShareLinkBtn';

const DonateXShareButtons = ({
  campaign,
  variant = 'in card',
}: {
  campaign: Campaign;
  variant?: 'in card' | 'default';
}) => {
  const variantStyles = cn(
    variant === 'in card' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
  );
  return (
    <div className={cn('cta grid gap-4', variantStyles)}>
      <DonateBtn campaignId={campaign.campaign_id} />

      <ShareLinkBtn campaign={campaign} />
    </div>
  );
};

export default DonateXShareButtons;
