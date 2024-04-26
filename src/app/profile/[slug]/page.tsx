import { getCampaigns, getUser } from '@/actions';
import Navbar from '@/components/Navbar';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { seoProfile } from '@/lib/seoBannerUrl';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);

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
          'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
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

export default async function UserProfilePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!REGEX_CODES.walletAddress.test(slug)) return notFound();
  const user = await getUser(slug as `0x${string}`);

  if (!user) return;

  const { campaigns } = await getCampaigns({
    page: 1,
    ethAddress: user.ethAddress,
  });

  return (
    <div className='flex min-h-[calc(100dvh-269px)] flex-col'>
      <Navbar />

      <div className='flex-1'>
        <UserProfile user={user} campaigns={campaigns} />
      </div>
    </div>
  );
}
