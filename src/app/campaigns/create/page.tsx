import ConnectWalletIndicator from '@/components/ConnectWalletIndicator';
import { Container } from '@/components/Container';
import CreateCampaignForm from '@/components/forms/ZodForm';
import { TextSizeStyles } from '@/lib/styles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // viewport: { width: 'device-width', initialScale: 1 },
  title: 'Create Campaign',
  description:
    'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
  twitter: {
    title: 'Create Campaign',
    card: 'summary_large_image',
    description:
      'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
    site: '@ethfundme',
    creator: '@ethfundme',
    images: '/images/seo-common.jpg',
  },
  openGraph: {
    title: 'Create Campaign',
    type: 'website',
    url: 'https://ethfund.me',
    images: '/images/seo-common.jpg',
    description:
      'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
    siteName: 'EthFundMe',
  },
};

export default function CreateCampaignPage() {
  return (
    <div className='space-y-4'>
      <ConnectWalletIndicator />

      <Container className='p-4 sm:pb-10'>
        <div className='pb-3 text-center sm:py-5'>
          <h1 className={TextSizeStyles.h1}>New Campaign</h1>
          <p className='text-lg font-medium'>
            Get started by filling out the form below
          </p>
        </div>

        <CreateCampaignForm />
      </Container>
    </div>
  );
}
