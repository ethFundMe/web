'use client';

import { useModalStore } from '@/store/modal';
import { FaEthereum, FaShare } from 'react-icons/fa';
import { ShareCampaignLink } from './ShareCampaignLink';
import DonateForm from './forms/DonateForm';

const DonateXShareButtons = () => {
  const { openModal } = useModalStore();

  return (
    <div className='cta grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <button
        className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-default px-4 py-2 text-white transition-all duration-200 ease-in hover:bg-opacity-90 md:px-5 md:py-3'
        onClick={() => {
          openModal(<DonateForm campaignID='241' />);
        }}
      >
        Donate Now
        <FaEthereum />
      </button>

      <button
        className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-dark px-4 py-2 text-white transition-all duration-200 ease-in hover:bg-opacity-90 md:px-5 md:py-3'
        onClick={() => {
          openModal(
            <ShareCampaignLink link='https://ethfund.me/campaigns/2' />
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
