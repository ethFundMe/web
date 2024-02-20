import { getUser } from '@/actions';
import Navbar from '@/components/Navbar';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);

  return {
    title: `${user.fullName}`,
    description: `${user.bio}`,
    keywords:
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
    openGraph: {
      type: 'website',
      title: `${user.fullName}`,
      description: `${user.bio}`,
      url: process.env.NEXT_PUBLIC_WEB_URL,
    },
    twitter: {
      title: `${user.fullName}`,
      card: 'summary_large_image',
      description: `${user.bio}`,
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
  const user = await getUser(slug as `0x${string}`);

  return (
    <>
      <Navbar />
      <UserProfile user={user} />
    </>
  );
}
