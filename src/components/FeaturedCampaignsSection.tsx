import { getFeaturedCampaigns } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import FeaturedCampaign from './FeaturedCampaign';

export const FeaturedCampaignsSection = async () => {
  const featured = await getFeaturedCampaigns();

  if (!featured) return;

  return featured ? (
    <section className='flex flex-col'>
      <Container>
        <div className='py-5 text-center'>
          <h2 className={cn(TextSizeStyles.h2)}>Most Recent</h2>
        </div>
      </Container>

      <div className='relative h-screen max-h-[500px] min-h-[400px] sm:min-h-[600px] md:max-h-[700px]'>
        <FeaturedCampaign campaign={featured} />
      </div>
    </section>
  ) : null;
};
