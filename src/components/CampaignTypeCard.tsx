'use client';

import { TextSizeStyles } from '@/lib/styles';
import { CampaignType } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';
import { Button } from './inputs/Button';

export const CampaignTypeCard = ({
  campaignType: { image, title, description, link },
}: {
  campaignType: CampaignType;
}) => {
  const router = useRouter();

  return (
    <div className='group flex flex-col items-center gap-4 rounded-lg border p-4 shadow-neutral-500 transition-all duration-150 ease-in hover:border-primary-default hover:shadow-md'>
      <Image
        className='h-[200px] w-auto'
        src={image}
        alt='...'
        width={200}
        height={200}
      />

      <h2 className={cn(TextSizeStyles.h5, 'leading-tight')}>{title}</h2>

      <p className='text-center'>{description}</p>

      <Button
        className='flex items-center gap-2'
        variant='secondary'
        size='sm'
        onClick={() => router.push(link)}
      >
        Create Campaign
        <FaChevronRight size={13} />
      </Button>
    </div>
  );
};
