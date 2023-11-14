import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

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
          <span className={TextSizeStyles.h6}>Eth{currentAmount} </span>
          raised
          <span className={cn(goalReached && 'hidden')}>
            {' '}
            of Eth{seekingAmount}
          </span>
        </p>

        <p
          className={cn(
            TextSizeStyles.h6,
            goalReached ? 'block text-primary' : 'hidden'
          )}
        >
          Goal reached 🎉
        </p>
      </div>

      <div
        className='h-2 w-full overflow-hidden rounded-full bg-customGray'
        // style={{ boxShadow: '0px 0px 5px 1px rgb(0 98 166)' }}
      >
        <div
          style={{
            width: `${percentageRaised}%`,
          }}
          className={cn(
            'h-full rounded-full bg-primary  shadow-md shadow-black'
          )}
        />
      </div>
    </div>
  );
};
