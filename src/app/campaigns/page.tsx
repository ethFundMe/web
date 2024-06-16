import CampaignsByTag from '@/components/CampaignsByTag';
import { Container } from '@/components/Container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchCampaignTags } from '@/lib/queries';

export default async function CampaignsPage() {
  const tags = await fetchCampaignTags();

  return (
    <Container className='space-y-5 py-10'>
      {/* <h1 className={cn(TextSizeStyles.h1, 'text-center')}>Our Campaigns</h1> */}

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

      <div className='w-full space-y-8'>
        {tags?.map((tag) => <CampaignsByTag key={tag.id} tag={tag.name} />)}
      </div>
    </Container>
  );
}
