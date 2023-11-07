import { TextSizeStyles } from '@/lib/styles';

export const DonationObjectiveIndicator = ({
  currentAmount,
  seekingAmount,
}: {
  currentAmount: number;
  seekingAmount: number;
}) => {
  const percentageRaised =
    100 - ((seekingAmount - currentAmount) / seekingAmount) * 100;
  return (
    <div className='w-full space-y-2'>
      <p>
        <span className={TextSizeStyles.h6}>Eth{currentAmount}</span> raised of
        Eth{seekingAmount}
      </p>

      <div className='h-2 w-full overflow-hidden rounded-full bg-customGray'>
        <div
          style={{
            width: `${percentageRaised}%`,
          }}
          className='h-full rounded-full bg-primary shadow-md  shadow-black'
        />
      </div>
    </div>
  );
};
