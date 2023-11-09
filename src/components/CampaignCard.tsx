'use client';

import { DonationObjectiveIndicator } from '@/app/campaigns/DonationObjectiveIndicator';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaMoneyBillWave, FaShare } from 'react-icons/fa';
import ShareCampaignLink from './ShareCampaignLink';
import DonateForm from './forms/DonateForm';

export const CampaignCard = () => {
  const router = useRouter();
  const { openModal } = useModalStore();

  return (
    <div
      onClick={() => router.push('/campaigns/1')}
      className='cursor-pointer space-y-4 rounded-md border border-customGray p-4 hover:border-primary'
    >
      <div className='h-80 bg-slate-300 md:h-48 lg:h-60'>
        <Image
          className='h-full w-full object-cover'
          src='/images/homepage-header.jpg'
          height={240}
          width={300}
          alt='...'
        />
      </div>

      <DonationObjectiveIndicator currentAmount={20} seekingAmount={22} />

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
          className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90'
          onClick={(e) => {
            e.stopPropagation();
            openModal(<DonateForm campaignID={'efm-fam-001'} />);
          }}
        >
          Donate
          <FaMoneyBillWave />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(
              <ShareCampaignLink
                link={'https://ethfund.me/campagins/efm-fam-01'}
              />
            );
          }}
          className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primaryDark px-4 py-2 text-white hover:bg-opacity-90'
        >
          Share
          <FaShare />
        </button>
      </div>
    </div>
  );
};
