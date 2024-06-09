import { Container } from '@/components/Container';
import EditCampaignForm from '@/components/EditCampaignForm';
import UpdateCampaignMediaForm from '@/components/UpdateCampaignMediaForm';
import { getCampaign } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditCampaign({
  params: { slug },
}: {
  params: { slug: number };
}) {
  if (!slug) notFound();
  const campaign = await getCampaign(slug);
  if (!campaign) notFound();

  return (
    <>
      {campaign.discontinued && (
        <div className='bg-red-500/10 py-2 text-center text-sm text-red-500 lg:text-base'>
          Campaign discontinued. You can no longer make changes to this
          campaign.
        </div>
      )}
      <div
        className={cn(
          'min-h-[calc(100dvh-269px)]',
          campaign.discontinued && 'pointer-events-none opacity-50'
        )}
      >
        {campaign.flagged && (
          <div className='flex flex-wrap items-center justify-center gap-2 bg-red-500/10 py-2 text-center text-sm text-red-500 lg:text-base'>
            <Flag className='fill-red-600' size={15} />
            <span>This campaign has been flagged. </span>
            <Link href='/legal/terms-and-conditions'>Learn more</Link>
          </div>
        )}
        <Container>
          <div className='pb-3 text-center sm:py-5'>
            <h1 className={TextSizeStyles.h1}>Edit Campaign</h1>
          </div>

          <div className='my-5 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-start'>
            <div className='mx-auto lg:mx-0'>
              <UpdateCampaignMediaForm campaign={campaign} />
            </div>
            <div className='col-span-2 row-start-1 w-full lg:col-start-2'>
              <EditCampaignForm campaign={campaign} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
