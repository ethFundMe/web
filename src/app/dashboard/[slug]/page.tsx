import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { getCampaigns, getUser } from '@/lib/queries';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { isAddress } from 'viem';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);
  if (!user) notFound();

  return {
    title: `${user.fullName} | EthFundMe`,
    description: `${user.bio}`,
    keywords:
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
    openGraph: {
      type: 'website',
      title: `${user.fullName} | EthFundMe`,
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      url: 'https://ethfund.me',
    },
    twitter: {
      title: `${user.fullName} | EthFundMe`,
      card: 'summary_large_image',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      site: '@ethfundme',
      creator: '@ethfundme',
    },
  };
}

export default async function UserProfilePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!REGEX_CODES.walletAddress.test(slug)) return notFound();

  if (!isAddress(slug)) notFound();

  const user = await getUser(slug as `0x${string}`);

  if (!user) redirect('/account');

  const { campaigns } = await getCampaigns({
    page: 1,
    ethAddress: user.ethAddress,
  });

  return <UserProfile user={user} campaigns={campaigns} />;
}
