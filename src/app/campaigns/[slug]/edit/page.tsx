import { Container } from '@/components/Container';
import EditCampaignForm from '@/components/EditCampaignForm';
import UpdateCampaignMediaForm from '@/components/UpdateCampaignMediaForm';
import { getCampaign } from '@/lib/api';
import { TextSizeStyles } from '@/lib/styles';
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
    <div className='min-h-[calc(100dvh-269px)]'>
      <Container>
        <div className='pb-3 text-center sm:py-5'>
          <h1 className={TextSizeStyles.h1}>Edit Campaign</h1>
        </div>

        <div className='my-5 grid grid-cols-1 items-start gap-y-5 lg:grid-cols-3'>
          <div>
            <UpdateCampaignMediaForm campaign={campaign} />
          </div>
          <div className='col-span-2 w-full'>
            <EditCampaignForm campaign={campaign} />
          </div>
        </div>
      </Container>
    </div>
  );
}
