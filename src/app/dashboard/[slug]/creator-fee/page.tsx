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
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
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
    <div className='w-full'>
      <div className='flex w-full max-w-2xl flex-col gap-6 p-4 lg:gap-8'>
        <div>
          <h2 className={cn(TextSizeStyles.h4)}>Update Creator Fee</h2>
          <p>
            Creator fees are an integral part of EthFundMe, designed to
            incentivize individuals like you to create impactful campaigns that
            resonate with your audience. Creator fees provide a sustainable
            revenue model for individuals who dedicate their time and resources
            to promoting campaigns on our platform.
          </p>
        </div>

        {user && <UpdateCreatorFeeForm user={user} />}
      </div>
    </div>
  );
}
