import ClientLoader from '@/components/ClientLoader';
import { ClientToaster } from '@/components/ClientToaster';
import ModalProvider from '@/components/ModalProvider';
import { Footer } from '@/components/content';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/lib/QueryClientProvider';
import { WagmiWrapper } from '@/lib/provider';
import { Analytics } from '@vercel/analytics/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';

dayjs.extend(advancedFormat);

const meta = {
  title: 'EthFundMe',
  description:
    'Welcome to EthFundMe! The only platform that gives you the ultimate ethereum-powered crowdfunding experience. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support.',
};

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL as string),
  title: {
    default: meta.title,
    template: `%s | ${meta.title}`,
  },
  description: meta.description,
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations, crypto crowdfunding',
  twitter: {
    title: {
      default: meta.title,
      template: `%s | ${meta.title}`,
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
      template: `%s | ${meta.title}`,
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
          <ClientLoader showSpinner={false} height={4} color='#0062a6' />
          <ClientToaster />
          <Toaster />

          <WagmiWrapper>
            <ModalProvider />
            <ReactQueryProvider>
              <main className='flex-1'>{children}</main>
            </ReactQueryProvider>
            <Footer />
          </WagmiWrapper>
          <Analytics />
        </body>
      </html>
    </>
  );
}
