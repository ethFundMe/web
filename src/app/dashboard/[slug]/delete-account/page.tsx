import { DeleteAccountForm } from '@/components/DeleteAccountForm';
import { getUser } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);
  if (!user) notFound();

  return {
    title: 'Delete Account',
    description: `${user.bio}`,
    keywords:
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
    openGraph: {
      type: 'website',
      title: 'Delete Account',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      url: 'https://ethfund.me',
    },
    twitter: {
      title: 'Delete Account | EthFundMe',
      card: 'summary_large_image',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      site: '@ethfundme',
      creator: '@ethfundme',
    },
  };
}

export default function DeleteAccountPage() {
  return (
    <div className='flex w-full flex-col items-center gap-6 p-4 lg:gap-8'>
      <div>
        <h1 className={cn(TextSizeStyles.h4, 'text-center')}>
          Delete your EthFundMe account?
        </h1>

        <div>
          <p>
            This action will erase all your data from our system without
            impacting your on-chain campaign data. You will still be able to
            receive donations for active campaigns, but managing and viewing
            them on our platform will require creating a new account
          </p>
        </div>
      </div>

      <DeleteAccountForm />
    </div>
  );
}
