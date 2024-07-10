/* eslint-disable quotes */
import ClientLoader from '@/components/ClientLoader';
import { ClientToaster } from '@/components/ClientToaster';
import ModalProvider from '@/components/ModalProvider';
import StagingAlert from '@/components/StagingAlert';
import { Footer } from '@/components/content';
import { Toaster } from '@/components/ui/sonner';
import { WagmiWrapper } from '@/lib/provider';
import { Analytics } from '@vercel/analytics/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import type { Metadata, Viewport } from 'next';
import Head from 'next/head';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';

dayjs.extend(advancedFormat);

const meta = {
  title:
    "EthFundMe | The World's #1 Decentralised Fundraising and Crowdfunding Platform",
  description:
    'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
};

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL as string),
  title: {
    default: meta.title,
    template: `%s | EthFundMe`,
  },
  description: meta.description,
  keywords:
    'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations, crypto crowdfunding',
  twitter: {
    title: {
      default: meta.title,
      template: `%s | EthFundMe`,
    },
    card: 'summary_large_image',
    description: meta.description,
    site: '@ethfundme',
    creator: '@ethfundme',
    images: '/images/seo-common.jpg',
  },
  openGraph: {
    type: 'website',
    url: 'https://ethfund.me',
    title: {
      default: meta.title,
      template: `%s | EthFundMe`,
    },
    description: meta.description,
    siteName: meta.title,
    images: '/images/seo-common.jpg',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang='en'>
        <body className='flex min-h-screen flex-col'>
          <Head>
            <meta name='theme-color' content='#0062a6' />
          </Head>
          <ClientLoader showSpinner={false} height={4} color='#0062a6' />
          <ClientToaster />
          <Toaster />

          <WagmiWrapper>
            <ModalProvider />
            <main className='flex-1'>{children}</main>
            <Footer />
            <StagingAlert />
          </WagmiWrapper>
          <Analytics />
        </body>
      </html>
    </>
  );
}
