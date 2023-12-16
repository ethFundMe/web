import { getCampaign } from '@/lib/api';
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
      images: '/images/homepage-header.jpg',
    },
    description: campaign.description,
  };
}

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
