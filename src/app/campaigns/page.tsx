import { CampaignCard } from '@/components/CampaignCard';
import { Container } from '@/components/Container';
import { getCampaigns } from '@/lib/api';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <Container className='space-y-5 py-10'>
      <h1 className={cn(TextSizeStyles.h1, 'text-center')}>Our Campaigns</h1>

      <div>
        <select className='rounded-md border px-4 py-2 outline-0 focus:border-primaryDark'>
          <option value=''>All campaigns</option>
          <option value=''>Type 1</option>
          <option value=''>Type 2</option>
          <option value=''>Type 3</option>
        </select>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {campaigns.map((_, idx) => (
          <CampaignCard key={idx} campaign={_} />
        ))}
      </div>
    </Container>
  );
}
