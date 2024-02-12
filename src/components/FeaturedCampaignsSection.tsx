import { getCampaigns } from '@/actions';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import FeaturedCampaign from './FeaturedCampaign';

export const FeaturedCampaignsSection = async () => {
  const { campaigns } = await getCampaigns();

  return (
    <section className='flex h-[calc(100vw-2rem)] max-h-[1200px] min-h-[600px] flex-col lg:h-[95dvh]'>
      <Container>
        <div className='py-5 text-center'>
          <h2 className={cn(TextSizeStyles.h2)}>Featured Campaigns</h2>
          <p className='text-lg'>We believe these campaigns need your help</p>
        </div>

        {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {campaigns.slice(0, 3).map((_, idx) => (
            <CampaignCard key={idx} campaign={_} />
            ))}
          </div> */}
      </Container>

      <FeaturedCampaign campaign={campaigns[0]} />
    </section>
  );
};
