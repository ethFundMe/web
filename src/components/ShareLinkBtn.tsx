'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Campaign } from '@/types';
import { FaShare } from 'react-icons/fa';
import { ShareCampaignLink } from './ShareCampaignLink';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

type Props = React.ComponentProps<'button'> & {
  campaign: Campaign;
  text?: string;
};

export const ShareLinkBtn = ({ campaign, text }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        className='flex w-full flex-1 items-center justify-center gap-2 rounded-md bg-primary-dark px-4 py-2 text-white hover:bg-opacity-90'
      >
        <>
          {text ?? 'Share'}
          <FaShare />
        </>
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle className={cn(TextSizeStyles.h6, 'text-neutral-600')}>
          Share link
        </DialogTitle>
        <ShareCampaignLink
          campaign={campaign}
          link={`${process.env.NEXT_PUBLIC_WEB_URL}/campaigns/${campaign.campaign_id}`}
        />
      </DialogContent>
    </Dialog>
  );
};
