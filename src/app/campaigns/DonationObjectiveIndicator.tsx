import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { FaTrophy } from 'react-icons/fa';
import { formatEther } from 'viem';

export const DonationObjectiveIndicator = ({
  currentAmount,
  seekingAmount,
  className,
}: {
  currentAmount: number;
  seekingAmount: number;
  className?: ClassValue;
}) => {
  const percentage = (currentAmount / seekingAmount) * 100;
  const percentageRaised = percentage > 100 ? 100 : percentage;
  const goalReached = percentageRaised >= 100;

  return (
    <div className={cn('w-full space-y-1', className)}>
      <div className='flex justify-between'>
        <p className='leading-[1]'>
          <span className='text-lg font-bold text-primary-default'>
            {formatEther(BigInt(currentAmount))} ETH{' '}
          </span>
          raised
          <span className={cn(goalReached && 'hidden')}>
            {' '}
            of {formatEther(BigInt(seekingAmount))} ETH
          </span>
        </p>
      </div>

      <div className='relative h-2 w-full rounded-full bg-[#ccc]'>
        <div
          style={{
            width:
              percentageRaised > 1
                ? `${percentageRaised}%`
                : percentageRaised !== 0
                ? '2%'
                : 0,
            // width: `${percentageRaised}%`,
          }}
          className={cn('h-full rounded-full bg-primary-default ')}
        />
        {goalReached && (
          <div className='absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-primary-default text-white'>
            <FaTrophy size={20} />
          </div>
        )}
      </div>
    </div>
  );
};
