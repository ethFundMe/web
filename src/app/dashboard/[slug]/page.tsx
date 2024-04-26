import { getCampaigns, getUser } from '@/actions';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { isAddress } from 'viem';

export default async function UserProfilePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!REGEX_CODES.walletAddress.test(slug)) return notFound();

  if (!isAddress(slug)) notFound();

  const user = await getUser(slug as `0x${string}`);

  if (!user) notFound();

  const { campaigns } = await getCampaigns({
    page: 1,
    ethAddress: user.ethAddress,
  });

  return <UserProfile user={user} campaigns={campaigns} />;
}
