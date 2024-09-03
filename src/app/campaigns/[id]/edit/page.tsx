import { Container } from '@/components/Container';
import { EditCampaignForm } from '@/components/forms/EditCampaign';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Campaign } from '@/types';
import { Flag } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Campaign | EthFundMe',
  description:
    'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
  keywords:
    'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
  twitter: {
    title: 'Edit Campaign | EthFundMe',
    card: 'summary_large_image',
    description:
      'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
    site: '@ethfundme',
    creator: '@ethfundme',
    images: '/images/seo-common.jpg',
  },
  openGraph: {
    title: 'Edit Campaign | EthFundMe',
    type: 'website',
    url: 'https://ethfund.me',
    images: '/images/seo-common.jpg',
    description:
      'Empower your ideas with EthFundMe by creating a campaign that can change the world. Our user-friendly platform helps you connect with supporters to turn your vision into action. Begin your journey to impact with just a few clicks!',
    siteName: 'EthFundMe',
  },
};

export default async function EditCampaign({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) return notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/campaign/${id}`,
    { cache: 'no-store' }
  );
  const campaign: Campaign = await res.json();

  if (!campaign) return notFound();

  return (
    <>
      {campaign.discontinued && (
        <div className='bg-red-500/10 py-2 text-center text-sm text-red-500 lg:text-base'>
          Campaign discontinued. You can no longer make changes to this
          campaign.
        </div>
      )}
      <div
        className={cn(
          'min-h-[calc(100dvh-269px)]',
          campaign.discontinued && 'pointer-events-none opacity-50'
        )}
      >
        {campaign.flagged && (
          <div className='flex flex-wrap items-center justify-center gap-2 bg-red-500/10 py-2 text-center text-sm text-red-500 lg:text-base'>
            <Flag className='fill-red-600' size={15} />
            <span>This campaign has been flagged. </span>
            <Link href='/legal/terms-and-conditions'>Learn more</Link>
          </div>
        )}
        <Container>
          <div className='pb-3 text-center sm:py-5'>
            <h1 className={TextSizeStyles.h1}>Edit Campaign</h1>
          </div>
          <EditCampaignForm campaign={campaign} />
        </Container>
      </div>
    </>
  );
}
