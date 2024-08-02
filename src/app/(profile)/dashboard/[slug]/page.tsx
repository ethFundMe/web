import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { getUser } from '@/lib/queries';
import { Campaign } from '@/types';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
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
    title: `${user.fullName}`,
    description: `${user.bio}`,
    keywords:
      'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
    openGraph: {
      type: 'website',
      title: `${user.fullName}`,
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

async function getUserBeneficiaryCampaigns(address: string) {
  const url = `${process.env.ETH_FUND_ENDPOINT}/api/campaign/user/${address}?role=beneficiary`;
  const authToken = cookies().get('efmToken')?.value;

  const res = await fetch(url, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 404) {
    return notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to fetch user campaigns');
  }

  return (await res.json()) as {
    campaigns: Array<Campaign>;
    meta: {
      page: number;
      limit: number;
      totalCampaigns: number;
      totalPages: number;
    };
  };
}

async function getUserCampaigns(address: string) {
  const url = `${process.env.ETH_FUND_ENDPOINT}/api/campaign/user/${address}`;
  const authToken = cookies().get('efmToken')?.value;

  const res = await fetch(url, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 404) {
    return notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to fetch user campaigns');
  }

  return (await res.json()) as {
    campaigns: Array<Campaign>;
    meta: {
      page: number;
      limit: number;
      totalCampaigns: number;
      totalPages: number;
    };
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

  const { campaigns } = await getUserCampaigns(user.ethAddress);
  const { campaigns: beneficiary_campaigns } =
    await getUserBeneficiaryCampaigns(user.ethAddress);

  return (
    <UserProfile
      user={user}
      campaigns={campaigns}
      beneficiaryCampaigns={beneficiary_campaigns}
    />
  );
}
