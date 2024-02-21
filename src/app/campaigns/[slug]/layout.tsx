import { getUser } from '@/actions';
import { getCampaign } from '@/lib/api';
import { seoCampaign } from '@/lib/seoBannerUrl';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { formatEther } from 'viem';
type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const campaign = await getCampaign(parseInt(id));
  if (!campaign) notFound();

  const user = await getUser(campaign.creator as `0x${string}`);

  console.log({ user });

  if (!user) notFound();

  const previousMetaData = await parent;

  return user
    ? {
        title: `${campaign.title}`,
        description: `${campaign.description}`,
        keywords:
          'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
        openGraph: {
          type: 'website',
          title: `${campaign.title}`,
          description: `${campaign.description}`,
          images: [
            {
              url: seoCampaign(
                user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))),
                campaign.title,
                campaign.description,
                campaign?.media_links[0] || ''
              ),
            },
          ],
          url: 'https://ethfund.me',
        },
        twitter: {
          title: `${campaign.title}`,
          card: 'summary_large_image',
          description: `${campaign.description}`,
          images: [
            {
              url: seoCampaign(
                user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))),
                campaign.title,
                campaign.description,
                campaign?.media_links[0] || ''
              ),
            },
          ],
          site: '@ethfundme',
          creator: '@ethfundme',
        },
      }
    : {
        title: previousMetaData.title,
        description: previousMetaData.description,
      };
}
export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='min-h-[calc(100dvh-269px)]'>{children}</div>;
}
