import { UpdateCreatorFeeForm } from '@/components/UpdateCreatorFeeForm';
import { getUser } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);
  if (!user) notFound();

  return {
    title: 'Creator Fee',
    description: `${user.bio}`,
    keywords:
      'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
    openGraph: {
      type: 'website',
      title: 'Creator Fee',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      url: 'https://ethfund.me',
    },
    twitter: {
      title: 'Creator Fee',
      card: 'summary_large_image',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      site: '@ethfundme',
      creator: '@ethfundme',
    },
  };
}

export default async function CreatorFeePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const user = await getUser(slug as `0x${string}`);

  return (
    <div className='flex w-full max-w-2xl flex-col gap-6 p-4 lg:gap-8'>
      <div>
        <h2 className={cn(TextSizeStyles.h4)}>Update Creator Fee</h2>

        <p>
          Creator fees are an integral part of EthFundMe, designed to
          incentivize individuals like you to create impactful campaigns that
          resonate with your audience. Creator fees provide a sustainable
          revenue model for individuals who dedicate their time and resources to
          promoting campaigns on our platform.
        </p>
      </div>

      {user?.creatorFee && (
        <p className='text-primary-default'>
          Your current creator fee is{' '}
          <span className='font-semibold'>{Number(user.creatorFee)}%</span>
        </p>
      )}

      {user && <UpdateCreatorFeeForm user={user} />}
    </div>
  );
}
