'use client';

import { cn } from '@/lib/utils';
import { Campaign, SimpleCampaign } from '@/types';
import { FaEthereum } from 'react-icons/fa';
import DonateForm from './forms/DonateForm';
import { ButtonProps, buttonVariants } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

type Props = React.ComponentProps<'button'> & {
  campaign: Campaign | SimpleCampaign;
  text?: string;
} & ButtonProps;

export const DonateBtn = ({ className, campaign, text, size }: Props) => {
  const btnStyles = {
    base: 'flex items-center justify-center gap-2 transition-all duration-200 ease-in',
    size,
  };

  const combinedStyles = cn(
    btnStyles.base,
    buttonVariants({ variant: 'default', size: btnStyles.size }),
    className
  );

  return (
    <Dialog>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        className={combinedStyles}
        disabled={campaign.total_accrued >= campaign.goal}
      >
        <>
          {text ?? 'Donate'}
          <FaEthereum />
        </>
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Donate to campaign</DialogTitle>

        <DonateForm
          campaign={campaign}
          // customClose={
          //   <DialogClose
          //     type='submit'
          //     className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
          //   >
          //     Donate
          //   </DialogClose>
          // }
        />
      </DialogContent>
    </Dialog>
  );
};
