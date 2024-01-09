import Navbar from '@/components/Navbar';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { REGEX_CODES } from '@/lib/constants';

export default function UserProfilePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!REGEX_CODES.walletAddress.test(slug)) return notFound();

  return (
    <>
      <Navbar />
      <UserProfile ethAddress={slug as `0x${string}`} />
    </>
  );
}
