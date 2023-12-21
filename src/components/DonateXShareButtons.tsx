'use client';

import { Campaign } from '@/types/db';
import { DonateBtn } from './DonateBtn';
import { ShareLinkBtn } from './ShareLinkBtn';

const DonateXShareButtons = ({ campaign }: { campaign: Campaign }) => {
  return (
    <div className='cta grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <DonateBtn campaignId={campaign.campaign_id} />

      <ShareLinkBtn campaignId={campaign.campaign_id} />
    </div>
  );
};

export default DonateXShareButtons;
