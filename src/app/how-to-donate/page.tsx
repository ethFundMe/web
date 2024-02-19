import { getCampaigns } from '@/actions';
import { CampaignCard } from '@/components/CampaignCard';
import { Container } from '@/components/Container';
import { HowToDonateCard } from '@/components/HowToDonateCard';
import Navbar from '@/components/Navbar';
import { DONATIONSTEPS } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default async function HowToDonatePage() {
  const { campaigns } = await getCampaigns();

  return (
    <div className='min-h-[calc(100vh-260px)]'>
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
            {campaigns.length > 0 &&
              campaigns
                .slice(0, 4)
                .map((_, idx) => <CampaignCard key={idx} campaign={_} />)}
          </div>
        </div>
      </Container>
    </div>
  );
}
