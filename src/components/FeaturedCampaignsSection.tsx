import { getCampaigns, getUser } from '@/actions';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import FeaturedCampaign from './FeaturedCampaign';

export const FeaturedCampaignsSection = async () => {
  const { campaigns } = await getCampaigns();
  if (!campaigns[0]) return;

  const user = await getUser(campaigns[0].creator as `0x${string}`);

  return campaigns[0] ? (
    <section className='flex h-[calc(100vw-2rem)] max-h-[1200px] min-h-[600px] flex-col lg:h-[95dvh]'>
      <Container>
        <div className='py-5 text-center'>
          <h2 className={cn(TextSizeStyles.h2)}>Featured Campaign</h2>
        </div>
      </Container>

      <FeaturedCampaign campaign={campaigns[0]} user={user} />
    </section>
  ) : null;
};
