import { Container } from '@/components/Container';
import EditCampaignForm from '@/components/EditCampaignForm';
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
    <div className='min-h-[calc(100vh-260px)]'>
      <Container>
        <div className='pb-3 text-center sm:py-5'>
          <h1 className={TextSizeStyles.h1}>Edit Campaign</h1>
          {/* <p className='font-edium text-lg'>
            Get started by filling out the form below
          </p> */}
        </div>

        {/* <div className='mx-auto grid grid-cols-5 gap-8'>
          <div className='col-span-2 min-h-[50px] bg-slate-200'>
            <div className='group relative h-full w-full overflow-hidden'>
              <Image
                className='h-full w-full object-cover'
                src='https://res.cloudinary.com/dado30t6k/image/upload/v1706791527/hvm0ugo1iainvkiy84qi.webp'
                width={800}
                height={800}
                alt='...'
              />

              <div className='absolute -bottom-20 w-full bg-black text-white group-hover:bottom-0'>
                <RefreshCcw />
              </div>
            </div>
          </div>
          <div className='col-span-3 grid min-h-[50px] grid-cols-3 gap-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Image
                key={i}
                src={
                  'https://res.cloudinary.com/dado30t6k/image/upload/v1706693399/z38ycdb71mywwiq4sw1a.jpg'
                }
                width={400}
                height={400}
                alt='...'
              />
            ))}

            <div className='grid cursor-pointer place-content-center place-items-center bg-gray-200 text-center text-sm text-gray-500  hover:text-black'>
              <Plus />
              Add image
            </div>
          </div>
        </div> */}

        <EditCampaignForm campaign={campaign} />
      </Container>
    </div>
  );
}
