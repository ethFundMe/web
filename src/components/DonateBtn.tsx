'use client';

import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { FaEthereum } from 'react-icons/fa';
import { Button } from './Button';
import DonateForm from './forms/DonateForm';

type Props = React.ComponentProps<'button'> & {
  campaignId?: number;
};

export const DonateBtn = ({ className, campaignId, ...rest }: Props) => {
  const { openModal } = useModalStore();

  const btnStyles = {
    base: 'flex items-center justify-center gap-2 rounded-md bg-primary-default px-4 py-2 text-white transition-all duration-200 ease-in hover:bg-opacity-90 md:px-5 md:py-3',
  };

  const combinedStyles = cn(btnStyles.base, className);

  const handleClick = () => {
    openModal(<DonateForm campaignID={campaignId} />);
  };

  return (
    <Button className={combinedStyles} onClick={handleClick} {...rest}>
      Donate Now
      <FaEthereum />
    </Button>
  );
};
