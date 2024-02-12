import { getUser } from '@/actions';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export default async function UserProfilePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!REGEX_CODES.walletAddress.test(slug)) return notFound();

  const user = await getUser(slug as `0x${string}`);

  return <UserProfile user={user} />;
}
