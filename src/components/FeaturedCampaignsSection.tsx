import { getCampaigns } from '@/actions';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import FeaturedCampaign from './FeaturedCampaign';

export const FeaturedCampaignsSection = async () => {
  const { campaigns } = await getCampaigns();

  return campaigns[0] ? (
    <section className='flex h-[calc(100vw-2rem)] max-h-[1200px] min-h-[600px] flex-col border border-blue-500 lg:h-[95dvh]'>
      <Container>
        <div className='py-5 text-center'>
          <h2 className={cn(TextSizeStyles.h2)}>Featured Campaign</h2>
        </div>
      </Container>

      <FeaturedCampaign campaign={campaigns[0]} />
    </section>
  ) : null;
};
