import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { FaTrophy } from 'react-icons/fa';
import { formatEther } from 'viem';

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
          <span className={TextSizeStyles.h6}>
            {formatEther(BigInt(currentAmount))} ETH{' '}
          </span>
          raised
          <span className={cn(goalReached && 'hidden')}>
            {' '}
            of {formatEther(BigInt(seekingAmount))} ETH
          </span>
        </p>
      </div>

      <div className='relative h-2 w-full rounded-full bg-primary-gray'>
        <div
          style={{
            width: `${percentageRaised}%`,
          }}
          className={cn('h-full rounded-full bg-primary-default ')}
        />
        {goalReached && (
          <div className='absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-primary-dark text-white'>
            <FaTrophy size={20} />
            {/* <Image
              src='/images/cup.avif'
              width={20}
              height={20}
              alt='...'
              className='rounded-full border border-primary-default'
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};
