import { Container } from '@/components/Container';
import { HowToDonateCard } from '@/components/HowToDonateCard';
import Navbar from '@/components/Navbar';
import { DONATIONSTEPS } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'How to Donate',
  description:
    'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
  twitter: {
    title: 'How to Donate',
    card: 'summary_large_image',
    description:
      'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
    site: '@ethfundme',
    creator: '@ethfundme',
    images: '/images/seo-common.jpg',
  },
  openGraph: {
    type: 'website',
    url: 'https://ethfund.me',
    title: 'How to Donate',
    images: '/images/seo-common.jpg',
    description:
      'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
    siteName: 'EthFundMe',
  },
};

export default async function HowToDonatePage() {
  // const { campaigns } = await getCampaigns();

  return (
    <div className='min-h-[calc(100dvh-269px)]'>
      {/* Move navbar to /how-to-donate/layout.tsx if file is created */}
      <Navbar />

      <Container className='py-10'>
        <div className='text-center'>
          <h1 className={cn(TextSizeStyles.h1)}>How To Donate</h1>
          <p className='text-lg font-medium'>
            Learn how you can impart lives in 3 easy steps
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {DONATIONSTEPS.map((step) => (
            <HowToDonateCard donationStep={step} key={step.subtitle} />
          ))}
        </div>

        {/* <div className='mt-28 space-y-10 py-10'>
          <div className='text-center'>
            <h2 className={cn(TextSizeStyles.h2)}>Ready to donate?</h2>
            <p className='text-lg font-medium'>
              Here are some campaigns that need your help
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {campaigns.length > 0 &&
              campaigns
                .slice(0, 4)
                .map((_, idx) => <CampaignCard key={idx} campaign={_} />)}
          </div>
        </div> */}
      </Container>
    </div>
  );
}
