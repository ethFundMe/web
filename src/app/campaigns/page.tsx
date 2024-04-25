import { CampaignUrlParams, getCampaigns } from '@/actions';
import { Container } from '@/components/Container';
import InfiniteScroll from '@/components/InfiniteScroll';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: string;
}) {
  console.log({ searchParams });

  const { campaigns, totalCampaigns } = await getCampaigns(
    searchParams as unknown as CampaignUrlParams
  );

  return (
    <Container className='space-y-5 py-10'>
      <h1 className={cn(TextSizeStyles.h1, 'text-center')}>Our Campaigns</h1>

      <div>
        <Select>
          <SelectTrigger className='hidden w-[250px]'>
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

      <InfiniteScroll
        initialCampaigns={campaigns}
        totalCampaigns={totalCampaigns}
      />
    </Container>
  );
}
