import { CAMPAIGNTYPES } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { CampaignTypeCard } from '../CampaignTypeCard';
import { Container } from '../Container';

export const CampaignTypeSection = () => {
  return (
    <section>
      <Container className='space-y-5 py-10 lg:py-20'>
        <div className='py-5 text-center'>
          <h2 className={TextSizeStyles.h2}>Campaign Types</h2>
          <p className='text-lg'>You can create campaigns for:</p>
        </div>

        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2'>
          {CAMPAIGNTYPES.map((campaignType) => (
            <CampaignTypeCard
              campaignType={campaignType}
              key={campaignType.title}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
