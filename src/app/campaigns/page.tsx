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
import { Metadata } from 'next';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'Campaigns',
  description:
    'Welcome to EthFundMe - where passion meets potential! Empower your dreams with the ultimate ethereum-powered crowdfunding experience. Harness the blockchain revolution to fuel your projects, ideas, and causes. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support. Start your journey today with EthFundMe, where every donation counts, and every dream matters. Elevate, innovate, and fundraise with crypto - the future is in your hands!',
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
  twitter: {
    title: 'EthFundMe',
    card: 'summary_large_image',
    description:
      'Welcome to EthFundMe - where passion meets potential! Empower your dreams with the ultimate ethereum-powered crowdfunding experience. Harness the blockchain revolution to fuel your projects, ideas, and causes. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support. Start your journey today with EthFundMe, where every donation counts, and every dream matters. Elevate, innovate, and fundraise with crypto - the future is in your hands!',
    site: '@ethfundme',
    creator: '@ethfundme',
    images:
      'https://images.pexels.com/photos/5486872/pexels-photo-5486872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  openGraph: {
    type: 'website',
    url: 'https://ethfund.me',
    title: 'EthFundMe',
    description:
      'Welcome to EthFundMe - where passion meets potential! Empower your dreams with the ultimate ethereum-powered crowdfunding experience. Harness the blockchain revolution to fuel your projects, ideas, and causes. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support. Start your journey today with EthFundMe, where every donation counts, and every dream matters. Elevate, innovate, and fundraise with crypto - the future is in your hands!',
    siteName: 'EthFundMe',
    images: [
      {
        url: 'https://images.pexels.com/photos/5486872/pexels-photo-5486872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
  },
};

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

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
        {campaigns.map((_, idx) => (
          <CampaignCard key={idx} campaign={_} />
        ))}
      </div>
    </Container>
  );
}
