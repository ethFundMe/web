import { CampaignCard } from '@/components/CampaignCard';
import { Container } from '@/components/Container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCampaigns } from '@/lib/api';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <Container className='space-y-5 py-10'>
      <h1 className={cn(TextSizeStyles.h1, 'text-center')}>Our Campaigns</h1>

      <div>
        <Select>
          <SelectTrigger className='w-[250px] border-0 outline-0 focus:border-0 focus:outline-0'>
            <SelectValue
              defaultValue='all'
              placeholder='Select campagin type'
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All campaigns</SelectItem>
            <SelectItem value='personal'>Personal campaigns</SelectItem>
            <SelectItem value='others'>Organized for others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {campaigns.map((_, idx) => (
          <CampaignCard key={idx} campaign={_} />
        ))}
      </div>
    </Container>
  );
}
