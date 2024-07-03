import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'Notifications | EthFundMe',
  description:
    'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
  keywords:
    'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
  twitter: {
    title: 'Notifications | EthFundMe',
    card: 'summary_large_image',
    description:
      'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
    site: '@ethfundme',
    creator: '@ethfundme',
    images: '/images/seo-common.jpg',
  },
  openGraph: {
    title: 'Notifications | EthFundMe',
    type: 'website',
    url: 'https://ethfund.me',
    images: '/images/seo-common.jpg',
    description:
      'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
    siteName: 'EthFundMe',
  },
};

const NotificationsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default NotificationsLayout;
