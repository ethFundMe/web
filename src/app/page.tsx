import { AboutSection } from '@/components/AboutSection';
import { FeaturedCampaignsSection } from '@/components/FeaturedCampaignsSection';
import { HomepageHeader } from '@/components/HomepageHeader';
import Navbar from '@/components/Navbar';
import { CampaignTypeSection } from '@/components/sections/CampaignTypeSection';
import { FaqsSection } from '@/components/sections/FaqsSection';
import { Metadata } from 'next';
// import Head from 'next/head';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'EthFundMe',
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

export default function Home() {
  return (
    <>
      <Navbar />

      <HomepageHeader />
      <AboutSection />
      <FeaturedCampaignsSection />
      <CampaignTypeSection />
      <FaqsSection />
    </>
  );
}
