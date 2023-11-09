import { TextSizeStyles } from '@/lib/styles';
import { DonationStep } from '@/lib/types';
import { cn } from '@/lib/utils';
type Props = {
  donationStep: DonationStep;
};

export const HowToDonateCard = ({ donationStep }: Props) => {
  const { subtitle, title, description } = donationStep;

  return (
    <div className='group relative h-[350px] overflow-hidden rounded-lg bg-[url(/images/step-card-bg1.avif)] bg-cover bg-center bg-no-repeat text-white transition-all duration-300 ease-in hover:bg-[url(/images/step-card-bg.jpg)]'>
      <div className='inner h-full  bg-black p-5 transition-all duration-300 ease-in group-hover:bg-opacity-50'>
        <div className='h-28 group-hover:space-y-3'>
          <h2
            className={cn(
              TextSizeStyles.h2,
              'text-4xl transition-all duration-200 ease-in group-hover:text-lg'
            )}
          >
            {subtitle}
          </h2>

          <p
            className={cn(
              TextSizeStyles.h3,
              'text-3xl transition-all duration-200 ease-in-out group-hover:text-4xl'
            )}
          >
            {title}
          </p>
        </div>

        <p className='mt-5 text-lg'>{description}</p>
      </div>
    </div>
  );
};
