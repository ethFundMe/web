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

          <Carousel />

          <div className='space-y-7 pb-5'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <DonationObjectiveIndicator
                seekingAmount={20}
                currentAmount={20}
              />

              <div className='w-full sm:w-72 sm:pt-4 lg:w-80'>
                {/* <button className='w-full flex-shrink-0 rounded-md bg-primary-default px-4 py-2 text-white hover:bg-opacity-90 md:px-5 md:py-3'> */}
                <DonateBtn
                  className='w-full whitespace-nowrap'
                  campaignId={campaign.campaign_id}
                />
              </div>
            </div>
            <div className='flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center md:gap-4'>
              <Link
                href='/campaigns/organizers/1'
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
                <p className={TextSizeStyles.caption}>Organized On:</p>
                <p className='font-semibold'>29th October, 2023</p>
              </div>
            </div>
            <div className='space-y-4'>{campaign.description}</div>
            <DonateXShareButtons campaign={campaign} />C
          </div>
        </div>

        <aside className='mt-16 space-y-4 pb-4'>
          <h2 className={TextSizeStyles.h6}>Related campaigns</h2>

          <ScrollArea className='lg:h-[800px] lg:pr-2'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1'>
              {campaigns
                .filter((_) => _.campaign_id !== campaign.campaign_id)
                .slice(0, 3)
                .map((_, idx) => (
                  <CampaignCard campaign={_} key={idx} />
                ))}
            </div>
          </ScrollArea>
        </aside>
      </Container>
    </>
  );
}
