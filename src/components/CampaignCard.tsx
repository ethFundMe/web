'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { Campaign } from '@/types/db';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEthereum, FaShare } from 'react-icons/fa';
import { ShareCampaignLink } from './ShareCampaignLink';
import DonateForm from './forms/DonateForm';

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const router = useRouter();
  const { openModal } = useModalStore();

  return (
    <div
      onClick={() => router.push(`/campaigns/${campaign.campaign_id}`)}
      className='group cursor-pointer space-y-4 rounded-md border border-primary-gray p-4 hover:border-primary-default'
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
        seekingAmount={Math.fround(campaign.goal * 0.00000000000000001)}
      />

      <div className='flex flex-col-reverse justify-between gap-2'>
        <div className='flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200'>
          <Image
            src='/images/Logo-Virgin.png'
            className='flex-shrink-0 rounded-full bg-white'
            width={50}
            height={50}
            alt='...'
          />

          <div>
            <p className={TextSizeStyles.small}>Campaign Organizer</p>
            <p className={cn(TextSizeStyles.caption, 'font-semibold')}>
              CLET For Africa Foundation
            </p>
          </div>
        </div>

        <div>
          <p className={TextSizeStyles.small}>
            Organized On:{' '}
            <span className={cn(TextSizeStyles.caption, 'font-semibold')}>
              29th October, 2023
            </span>
          </p>
        </div>
      </div>

      <div>
        <p className='line-clamp-2'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
          facilis eum doloremque aliquam ad qui rem quisquam, quae ea? Facere
          atque facilis obcaecati praesentium maiores saepe magni libero quos
          autem!
        </p>
      </div>

      <div className='cta grid grid-cols-2 gap-4'>
        <button
          className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-default px-4 py-2 text-white hover:bg-opacity-90'
          onClick={(e) => {
            e.stopPropagation();
            openModal(<DonateForm campaignID={'efm-fam-001'} />);
          }}
        >
          Donate
          <FaEthereum />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(
              <ShareCampaignLink
                link={`http://localhost:3000/campaigns/${campaign.campaign_id}`}
              />
            );
          }}
          className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-dark px-4 py-2 text-white hover:bg-opacity-90'
        >
          Share
          <FaShare />
        </button>
      </div>
    </div>
  );
};
