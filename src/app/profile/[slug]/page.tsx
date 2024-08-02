import Navbar from '@/components/Navbar';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { getCampaigns, getUser } from '@/lib/queries';
import { seoProfile } from '@/lib/seoBannerUrl';
import { Campaign } from '@/types';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: `0x${string}` };
};

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug;

  const user = await getUser(id);

  if (!user) notFound();
  const campaigns = await getCampaigns({
    page: 1,
    ethAddress: user.ethAddress,
  });

  const previousMetaData = await parent;

  return user
    ? {
        title: `${user.fullName}`,
        description: `${user.bio ? user.bio : '~'}`,
        keywords:
          'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
        openGraph: {
          type: 'website',
          title: `${user.fullName}`,
          description: `${user.bio ? user.bio : '~'}`,
          url: process.env.NEXT_PUBLIC_WEB_URL,
          images: [
            {
              url: seoProfile(
                user.profileUrl || '',
                user.fullName,
                user.bio || '',
                String(campaigns.totalCampaigns),
                user.isVerified
                // user.campaigns.length.toString()
              ),
            },
          ],
        },
        twitter: {
          title: `${user.fullName}`,
          card: 'summary_large_image',
          description: `${user.bio ? user.bio : '~'}`,
          site: '@ethfundme',
          creator: '@ethfundme',
          images: [
            {
              url: seoProfile(
                user.profileUrl || '',
                user.fullName,
                user.bio || '',
                String(campaigns.totalCampaigns),
                user.isVerified
              ),
            },
          ],
        },
      }
    : {
        title: previousMetaData.title,
        description: previousMetaData.description,
      };
}

async function getUserCampaigns(address: string) {
  const url = `${process.env.ETH_FUND_ENDPOINT}/api/campaign/user/${address}`;

  const res = await fetch(url, {
    cache: 'no-store',
    method: 'GET',
  });

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
  params: { slug: `0x${string}` };
}) {
  if (!REGEX_CODES.walletAddress.test(slug)) return notFound();
  const user = await getUser(slug);

  if (!user) return notFound();

  const { campaigns } = await getUserCampaigns(user.ethAddress);

  const { campaigns: beneficiary_campaigns } =
    await getUserBeneficiaryCampaigns(user.ethAddress);

  return (
    <div className='flex min-h-[calc(100dvh-269px)] flex-col'>
      <Navbar />

      <div className='flex-1'>
        <UserProfile
          user={user}
          campaigns={campaigns}
          beneficiaryCampaigns={beneficiary_campaigns}
        />
      </div>
    </div>
  );
}
