'use client';

import { useModalStore } from '@/store/modalStore';
import { Campaign } from '@/types/db';
import { FaShare } from 'react-icons/fa';
import { DonateBtn } from './DonateBtn';
import { ShareCampaignLink } from './ShareCampaignLink';

const DonateXShareButtons = ({ campaign }: { campaign: Campaign }) => {
  const { openModal } = useModalStore();

  return (
    <div className='cta grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <DonateBtn campaignId={campaign.campaign_id} />

      <button
        className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-dark px-4 py-2 text-white transition-all duration-200 ease-in hover:bg-opacity-90 md:px-5 md:py-3'
        onClick={() => {
          openModal(
            <ShareCampaignLink link={`/campaigns/${campaign.campaign_id}`} />
          );
        }}
      >
        Share Campaign
        <FaShare />
      </button>
    </div>
  );
};

export default DonateXShareButtons;
