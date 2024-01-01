import { CampaignCard } from '@/components/CampaignCard';
import { Carousel } from '@/components/Carousel';
import { Container } from '@/components/Container';
import { DonateBtn } from '@/components/DonateBtn';
import DonateXShareButtons from '@/components/DonateXShareButtons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCampaign, getCampaigns } from '@/lib/api';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { DonationObjectiveIndicator } from '../DonationObjectiveIndicator';

export default async function CampaignPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const campaigns = await getCampaigns();
  const campaign = await getCampaign(parseInt(slug));

  return (
    <>
      <Container className='relative grid grid-cols-1 gap-4 py-10 sm:gap-8 lg:grid-cols-3 lg:items-start lg:py-12'>
        <div className='space-y-5 md:col-span-2 lg:space-y-8'>
          <h2 className={cn(TextSizeStyles.h4, 'leading-tight')}>
            {campaign.title}
          </h2>

          <Carousel images={campaign.media_links} />

          <div className='space-y-7 pb-5'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <DonationObjectiveIndicator
                seekingAmount={campaign.goal}
                currentAmount={campaign.total_accrued}
              />

              <div className='w-full sm:w-72 sm:pt-4 lg:w-80'>
                {/* <button className='w-full flex-shrink-0 rounded-md bg-primary-default px-4 py-2 text-white hover:bg-opacity-90 md:px-5 md:py-3'> */}
                <DonateBtn
                  text='Donate Now'
                  className='w-full whitespace-nowrap sm:mt-1'
                  campaignId={campaign.campaign_id}
                />
              </div>
            </div>
            <div className='flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center md:gap-4'>
              <Link
                href={`/user-profiles/${campaign.creator}`}
                className='mt-2 flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200 sm:w-fit'
              >
                <Image
                  src='/images/Logo-Virgin.png'
                  className='block h-12 w-12 flex-shrink-0 rounded-full bg-white'
                  width={50}
                  height={50}
                  alt='...'
                />

                <div>
                  <p className={TextSizeStyles.caption}>Campaign Organizer</p>
                  <p className='font-semibold'>CLET For Africa Foundation</p>
                </div>
              </Link>

              <div>
                <p className={TextSizeStyles.caption}>Organized On</p>
                <p className='font-semibold'>29th October, 2023</p>
              </div>
            </div>
            <div className='space-y-4'>{campaign.description}</div>
            <DonateXShareButtons campaign={campaign} />
          </div>
        </div>

        <aside className='mt-16 space-y-4 pb-4'>
          <h2
            className={cn(TextSizeStyles.h5, 'font-light text-primary-default')}
          >
            Related campaigns
          </h2>

          <ScrollArea className='rounded-md border-primary-default lg:h-[800px] lg:border'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1'>
              {campaigns
                .filter((_) => _.campaign_id !== campaign.campaign_id)
                .slice(0, 3)
                .map((_, idx) => (
                  <>
                    <CampaignCard inSidebar campaign={_} key={idx} />
                    {idx !== 2 && (
                      <div className='mx-auto hidden w-[95%] border-t border-primary-default lg:block' />
                    )}
                  </>
                ))}
            </div>
          </ScrollArea>
        </aside>
      </Container>
    </>
  );
}
