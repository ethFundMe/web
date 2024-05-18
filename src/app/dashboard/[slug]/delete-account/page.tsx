import { getUser } from '@/actions';
import { DeleteAccountForm } from '@/components/DeleteAccountForm';
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
    title: 'Delete Account | EthFundMe',
    description: `${user.bio}`,
    keywords:
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
    openGraph: {
      type: 'website',
      title: 'Delete Account | EthFundMe',
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
          <p>This action is not reversible.</p>
          <p>All your campaigns will be discontinued immediately.</p>
        </div>
      </div>

      <DeleteAccountForm />
    </div>
  );
}
