import { UpdateCreatorFeeForm } from '@/components/UpdateCreatorFeeForm';
import { getUser } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default async function CreatorFeePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const user = await getUser(slug as `0x${string}`);

  return (
    <div className='w-full'>
      <div className='mx-auto flex w-full max-w-2xl flex-col gap-6 p-4 lg:gap-8'>
        <div className='px-10 text-center'>
          <h1 className={cn(TextSizeStyles.h4, 'text-center')}>
            Update Creator Fee
          </h1>
          <p className='text-sm text-slate-500'>
            Creator fees are an integral part of EthFundMe, designed to
            incentivize individuals like you to create impactful campaigns that
            resonate with your audience. Creator fees provide a sustainable
            revenue model for individuals who dedicate their time and resources
            to promoting campaigns on our platform.
          </p>
        </div>

        {user && <UpdateCreatorFeeForm user={user} />}
      </div>
    </div>
  );
}
