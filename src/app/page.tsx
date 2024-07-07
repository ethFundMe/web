/* eslint-disable quotes */
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
  themeColor: '#0062A6',
  title:
    "EthFundMe | The World's #1 Decentralised Fundraising and Crowdfunding Platform",
  description:
    'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
  keywords:
    'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
  twitter: {
    title:
      "EthFundMe | The World's #1 Decentralised Fundraising and Crowdfunding Platform",
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
    title:
      "EthFundMe | The World's #1 Decentralised Fundraising and Crowdfunding Platform",
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
