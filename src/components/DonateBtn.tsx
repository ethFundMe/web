'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { FaEthereum } from 'react-icons/fa';
import DonateForm from './forms/DonateForm';
import { buttonVariants } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

type Props = React.ComponentProps<'button'> & {
  campaignId: number;
  text?: string;
};

export const DonateBtn = ({ className, campaignId, text }: Props) => {
  const btnStyles = {
    base: 'flex items-center justify-center gap-2 transition-all duration-200 ease-in',
  };

  const combinedStyles = cn(
    btnStyles.base,
    buttonVariants({ variant: 'default' }),
    className
  );

  return (
    <Dialog>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        className={combinedStyles}
      >
        <>
          {text ?? 'Donate'}
          <FaEthereum />
        </>
      </DialogTrigger>

      <DialogContent className='gap-0' onClick={(e) => e.stopPropagation()}>
        <DialogTitle className={TextSizeStyles.h4}>
          Donate to campaign
        </DialogTitle>

        <DonateForm
          campaignID={campaignId}
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
