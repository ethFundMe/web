import { getUser } from '@/actions';
import UpdateProfileForm from '@/components/UpdateProfileForm';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default async function UpdateUserProfilePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const user = await getUser(slug as `0x${string}`);

  return (
    <div className='flex w-full flex-col gap-6 p-4 lg:gap-8'>
      <h1 className={cn(TextSizeStyles.h4, 'text-center')}>
        Update your profile
      </h1>

      {user && <UpdateProfileForm user={user} />}
    </div>
  );
}
