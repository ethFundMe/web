import Navbar from '@/components/Navbar';
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

export default function CampaignsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-[calc(100dvh-269px)]'>
      <Navbar />
      {children}
    </div>
  );
}
