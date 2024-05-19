import { getCampaigns, getUser } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import FeaturedCampaign from './FeaturedCampaign';

export const FeaturedCampaignsSection = async () => {
  const { campaigns } = await getCampaigns({});

  if (!campaigns[0]) return;

  const user = await getUser(campaigns[0].creator as `0x${string}`);

  return campaigns[0] ? (
    <section className='flex flex-col'>
      <Container>
        <div className='py-5 text-center'>
          <h2 className={cn(TextSizeStyles.h2)}>Most Recent</h2>
        </div>
      </Container>

      {user && (
        <div className='relative h-screen max-h-[500px] min-h-[400px] sm:min-h-[600px] md:max-h-[700px]'>
          <FeaturedCampaign campaign={campaigns[0]} user={user} />
        </div>
      )}
    </section>
  ) : null;
};
