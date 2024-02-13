import { getCampaign } from '@/lib/api';
import { seoBannerURL } from '@/lib/seoBannerUrl';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!/^\d+$/.test(slug)) notFound();
  const campaign = await getCampaign(parseInt(slug));
  if (!campaign) return notFound();

  return {
    title: campaign.title,
    openGraph: {
      images: seoBannerURL(
        campaign?.user?.fullName,
        campaign.goal.toString(),
        campaign.title,
        campaign.description
      ),
    },
    description: campaign.description,
  };
}

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='min-h-[calc(100vh-260px)]'>{children}</div>;
}
