import { AboutSection } from '@/components/AboutSection';
import { FeaturedCampaignsSection } from '@/components/FeaturedCampaignsSection';
import { HomepageHeader } from '@/components/HomepageHeader';
import Navbar from '@/components/Navbar';
import ActiveStatsSection from '@/components/sections/ActiveStatsSection';
import { CampaignTypeSection } from '@/components/sections/CampaignTypeSection';
import { FaqsSection } from '@/components/sections/FaqsSection';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'Welcome | EthFundMe',
  description:
    'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
  twitter: {
    title: 'Welcome | EthFundMe',
    card: 'summary_large_image',
    images: '/images/seo-common.jpg',
    description:
      'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
    site: '@ethfundme',
    creator: '@ethfundme',
  },
  openGraph: {
    type: 'website',
    images: '/images/seo-common.jpg',
    url: 'https://ethfund.me',
    title: 'Welcome | EthFundMe',
    description:
      'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
    siteName: 'EthFundMe',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <HomepageHeader />
      <ActiveStatsSection />
      <FeaturedCampaignsSection />
      <CampaignTypeSection />
      <AboutSection />
      <FaqsSection />
    </>
  );
}
