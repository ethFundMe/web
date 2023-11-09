import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CampaignCategoryCardProps } from './types';

export const CampaignCategoryCard = ({
  category: { type, image },
  handleOnClick,
}: CampaignCategoryCardProps) => {
  return (
    <div
      title={type.toUpperCase()}
      className={cn(
        'relative h-20 w-1/4 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-slate-500 sm:w-full'
      )}
      onClick={handleOnClick}
    >
      <Image src={image} alt='...' fill className='object-cover' />

      <div className='overlay absolute inset-0 z-20 grid place-content-center bg-black bg-opacity-70 text-white'>
        <p className='text-center font-bold uppercase'>{type}</p>
      </div>
    </div>
  );
};
