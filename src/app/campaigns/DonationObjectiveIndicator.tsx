import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { FaTrophy } from 'react-icons/fa';

export const DonationObjectiveIndicator = ({
  currentAmount,
  seekingAmount,
}: {
  currentAmount: number;
  seekingAmount: number;
}) => {
  const goalReached = currentAmount >= seekingAmount;
  const percentageRaised =
    100 - ((seekingAmount - currentAmount) / seekingAmount) * 100;
  return (
    <div className='w-full space-y-2'>
      <div className='flex justify-between'>
        <p>
          <span className={TextSizeStyles.h6}>{currentAmount} ETH </span>
          raised
          <span className={cn(goalReached && 'hidden')}>
            {' '}
            of {seekingAmount} ETH
          </span>
        </p>
      </div>

      <div className='relative h-2 w-full rounded-full bg-customGray'>
        <div
          style={{
            width: `${percentageRaised}%`,
          }}
          className={cn('h-full rounded-full bg-primary')}
        />
        {goalReached && (
          <div className='absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-primary text-white'>
            <FaTrophy size={20} />
            {/* <Image
              src='/images/cup.avif'
              width={20}
              height={20}
              alt='...'
              className='rounded-full border border-primary'
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};
