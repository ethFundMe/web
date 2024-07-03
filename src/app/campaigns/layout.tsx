import Navbar from '@/components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'Campaigns',
  description:
    'Explore active, inspiring campaigns on EthFundMe, where innovators and changemakers seek your support. Discover projects that resonate with your values and contribute to causes you believe in. Your journey to making an impact starts here!',
  keywords:
    'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
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
