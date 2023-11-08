import { CampaignCard } from '@/components/CampaignCard';
import { Container } from '@/components/Container';
import Navbar from '@/components/Navbar';
import { DONATIONSTEPS } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { DonationStep } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function HowToDonatePage() {
  return (
    <>
      {/* Move navbar to /how-to-donate/layout.tsx if file is created */}
      <Navbar />

      <Container className='py-10'>
        <div className='text-center'>
          <h1 className={cn(TextSizeStyles.h1)}>How To Donate</h1>
          <p className='text-lg font-medium'>
            Learn how you can impart lives in 3 easy steps
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {DONATIONSTEPS.map((step) => (
            <HowToDonateCard donationStep={step} key={step.subtitle} />
          ))}
        </div>

        <div className='mt-28 space-y-10 py-10'>
          <div className='text-center'>
            <h2 className={cn(TextSizeStyles.h2)}>Ready to donate?</h2>
            <p className='text-lg font-medium'>
              Here are some campaigns that need your help
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, idx) => (
              <CampaignCard key={idx} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export const HowToDonateCard = ({
  donationStep: { title, subtitle, description },
}: {
  donationStep: DonationStep;
}) => (
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
