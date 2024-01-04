import { Container } from '@/components/Container';
import CreateCampaignForm from '@/components/forms/ZodForm';
import { TextSizeStyles } from '@/lib/styles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Campaign | EthFundMe',
  description:
    'Welcome to EthFundMe - where passion meets potential! Empower your dreams with the ultimate ethereum-powered crowdfunding experience. Harness the blockchain revolution to fuel your projects, ideas, and causes. Join a community driven by innovation, transparency, and the limitless possibilities of decentralized support. Start your journey today with EthFundMe, where every donation counts, and every dream matters. Elevate, innovate, and fundraise with crypto - the future is in your hands!',
  keywords:
    'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
  twitter: {
    title: 'Create Campaign | EthFundMe',
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

export default function CreateCampaignPage() {
  return (
    <Container className='pb-4 sm:pb-10'>
      <div className='pb-3 text-center sm:py-5'>
        <h1 className={TextSizeStyles.h1}>Create campaign</h1>
        <p className='font-edium text-lg'>
          Get started by filling out the form below
        </p>
      </div>

      {/* <CreateCampaignForm /> */}
      <CreateCampaignForm />
    </Container>
  );
}
