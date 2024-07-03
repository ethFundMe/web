'use client';

import { cn } from '@/lib/utils';
import { Campaign } from '@/types/db';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { DonateBtn } from './DonateBtn';
import { ShareLinkBtn } from './ShareLinkBtn';
import { Button } from './ui/button';

const DonateXShareButtons = ({
  campaign,
  variant = 'in card',
}: {
  campaign: Campaign;
  variant?: 'in card' | 'default';
}) => {
  const { address } = useAccount();

  const variantStyles = cn(
    variant === 'in card' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
  );
  return (
    <div className={cn('cta grid flex-1 gap-4', variantStyles)}>
      {address && address === campaign.creator ? (
        <Button asChild>
          <Link
            href={`/campaigns/${campaign.campaign_id}/edit`}
            className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-dark px-4 py-2 text-white hover:bg-opacity-90'
          >
            Edit
            <FaPen />
          </Link>
        </Button>
      ) : (
        <DonateBtn campaign={campaign} />
      )}

      <ShareLinkBtn campaign={campaign} />
    </div>
  );
};

export default DonateXShareButtons;
