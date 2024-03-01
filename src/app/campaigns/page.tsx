import { getCampaigns } from '@/actions';
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
import { Metadata } from 'next';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'Campaigns',
  description:
    'Explore active, inspiring campaigns on EthFundMe, where innovators and changemakers seek your support. Discover projects that resonate with your values and contribute to causes you believe in. Your journey to making an impact starts here!',
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
  twitter: {
    title: 'Campaigns',
    card: 'summary_large_image',
    description:
      'Explore active, inspiring campaigns on EthFundMe, where innovators and changemakers seek your support. Discover projects that resonate with your values and contribute to causes you believe in. Your journey to making an impact starts here!',
    site: '@ethfundme',
    images: '/images/seo-common.jpg',
    creator: '@ethfundme',
  },
  openGraph: {
    type: 'website',
    url: 'https://ethfund.me',
    title: 'Campaigns',
    images: '/images/seo-common.jpg',
    description:
      'Explore active, inspiring campaigns on EthFundMe, where innovators and changemakers seek your support. Discover projects that resonate with your values and contribute to causes you believe in. Your journey to making an impact starts here!',
    siteName: 'EthFundMe',
  },
};

export default async function CampaignsPage() {
  const { campaigns, totalCampaigns } = await getCampaigns();

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

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <InfiniteScroll
          initialCampaigns={campaigns}
          totalCampaigns={totalCampaigns}
        />
      </div>
    </Container>
  );
}
