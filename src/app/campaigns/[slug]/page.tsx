import { getCampaign, getCampaigns, getUser } from '@/actions';
import { CampaignCard } from '@/components/CampaignCard';
import { Container } from '@/components/Container';
import { DonateBtn } from '@/components/DonateBtn';
import DonateXShareButtons from '@/components/DonateXShareButtons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DonationObjectiveIndicator } from '../DonationObjectiveIndicator';

import ImageWithFallback from '@/components/ImageWithFallback';
import { SwiperCarousel } from '@/components/SwiperCarousel';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { seoCampaign } from '@/lib/seoBannerUrl';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { FaEthereum, FaTelegramPlane } from 'react-icons/fa';
import { formatEther } from 'viem';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const campaign = await getCampaign(parseInt(id));

  if (!campaign) notFound();

  const user = await getUser(campaign.creator as `0x${string}`);
  if (!user) notFound();

  const previousMetaData = await parent;

  return user
    ? {
        title: `${campaign.title}`,
        description: `${campaign.description}`,
        keywords:
          'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
        openGraph: {
          type: 'website',
          title: `${campaign.title}`,
          description: `${campaign.description}`,
          images: [
            {
              url: seoCampaign(
                user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))).toString(),
                campaign.title,
                campaign.description,
                campaign?.media_links[0],
                campaign.user.profileUrl,
                user.isVerified
              ),
            },
          ],
          url: 'https://ethfund.me',
        },
        twitter: {
          title: `${campaign.title}`,
          card: 'summary_large_image',
          description: `${campaign.description}`,
          images: [
            {
              url: seoCampaign(
                user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))).toString(),
                campaign.title,
                campaign.description,
                campaign?.media_links[0],
                campaign.user.profileUrl,
                user.isVerified
              ),
            },
          ],
          site: '@ethfundme',
          creator: '@ethfundme',
        },
      }
    : {
        title: previousMetaData.title,
        description: previousMetaData.description,
      };
}

export default async function CampaignPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const campaign = await getCampaign(parseInt(slug));
  // console.log(campaign);

  const campaignsData = await getCampaigns();
  const { campaigns } = campaignsData;
  if (!campaign) return;
  const user = await getUser(campaign.creator as `0x${string}`);

  if (!user) return;

  const campaignsToShow = campaigns
    .filter((_) => _.campaign_id !== campaign.campaign_id)
    .slice(0, 3);

  const chats = [
    {
      user: {
        fullname: 'John Smith',
      },
      date: '2024-02-26T18:52:42.185Z',
      // text: 'Thank you all for your incredible support! Every contribution means the world to us and brings us closer to our goal.',
      text: '',
      amt: 100000000000000000,
    },
    {
      user: {
        fullname: 'Emily Johnson',
      },
      date: '2024-02-26T19:30:00.000Z',
      text: 'I just donated what I could. Let us keep spreading the word and helping those in need!',
      amt: 5000000000000000,
    },
    {
      user: {
        fullname: 'David Rodriguez',
      },
      date: '2024-02-26T20:15:00.000Z',
      text: 'This campaign is truly inspiring. I am proud to be a part of this community that comes together to support each other.',
      // amt: 2500000000000000000,
      amt: 0,
    },
    {
      user: {
        fullname: 'Sarah Thompson',
      },
      date: '2024-02-26T21:00:00.000Z',
      text: 'It is heartwarming to see the impact we can make when we join forces. Let us keep the momentum going!',
      amt: 100000000000000000,
    },
    {
      user: {
        fullname: 'Michael Nguyen',
      },
      date: '2024-02-26T22:00:00.000Z',
      text: 'Small acts of kindness can create big changes. Proud to support this cause.',
      amt: 200000000000000000,
    },
  ];

  return (
    <div className='space-y-10 py-10 lg:space-y-12 lg:py-12'>
      <Container className='relative grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-3 lg:items-start'>
        <div className='space-y-5 lg:col-span-2 lg:space-y-8'>
          <h2 className={cn(TextSizeStyles.h4, 'leading-tight')}>
            {campaign.title}
          </h2>

          <SwiperCarousel images={campaign.media_links} />

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
                  campaign={campaign}
                />
              </div>
            </div>
            <div className='flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center md:gap-4'>
              <Link
                href={`/profile/${campaign.creator}`}
                className='mt-2 flex w-full flex-shrink-0 cursor-pointer items-center gap-4 rounded-md p-3 hover:bg-slate-200 sm:w-fit'
              >
                <div className='relative h-[50px] w-[50px] flex-shrink-0'>
                  <ImageWithFallback
                    src={user.profileUrl ?? ''}
                    fallback='/images/pfp.svg'
                    className='block rounded-full bg-slate-50'
                    fill
                    alt='...'
                  />
                </div>

                <div className='pr-2'>
                  <p className={TextSizeStyles.caption}>Organizer</p>
                  <p className='font-semibold'>
                    {user?.fullName ??
                      formatWalletAddress(campaign.creator as `0x${string}`)}
                  </p>
                </div>
              </Link>
              <div>
                <p className={TextSizeStyles.caption}>Organized On</p>
                <p className='font-semibold'>
                  {dayjs(campaign.created_at).format('DD MMM, YYYY')}
                </p>
              </div>
            </div>
            <div className='space-y-4'>{campaign.description}</div>
            <DonateXShareButtons campaign={campaign} />
          </div>
        </div>

        <aside className='mt-16 space-y-8'>
          {/* Chats */}
          <div className='chats flex flex-col space-y-4 pb-4'>
            <h2
              className={cn(
                TextSizeStyles.h5,
                'font-light text-primary-default'
              )}
            >
              Comments & Donations
            </h2>

            <ScrollArea className='h-[500px] pr-4'>
              <div className='space-y-4'>
                {chats.map(({ user: { fullname }, date, amt, text }, j) => (
                  <div
                    key={j}
                    className='rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm'
                  >
                    <div className='mb-2 flex flex-wrap items-start justify-between gap-2'>
                      <div className='flex items-center gap-2'>
                        <div className='relative h-8 w-8 flex-shrink-0'>
                          <Image
                            className='block flex-shrink-0 rounded-full object-cover'
                            src='/images/pets.jpg'
                            fill
                            sizes='50px'
                            alt='...'
                          />
                        </div>

                        <div>
                          <p>{fullname}</p>
                          <small>
                            {dayjs(date)
                              .subtract(2, 'minute')
                              .format('DD MMM, YYYY . HH : mm a')}
                          </small>
                        </div>
                      </div>

                      {!!amt && (
                        <div className='flex items-center gap-1 pr-2 text-xl font-bold text-primary-default'>
                          <FaEthereum />
                          <span>{formatEther(BigInt(amt))}</span>
                        </div>
                      )}
                    </div>
                    <p className='font-medium'>{text}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <form className='relative space-y-4 rounded-md'>
              <Textarea
                placeholder='Enter your comments'
                className='max-h-52'
              />
              <Button className='absolute bottom-2 right-2 p-0 px-2'>
                <FaTelegramPlane size={20} />
              </Button>
            </form>
          </div>
        </aside>
      </Container>
      <Container>
        <div className='space-y-4'>
          <h2
            className={cn(TextSizeStyles.h5, 'font-light text-primary-default')}
          >
            {campaignsToShow.length > 0
              ? 'Related campaigns'
              : 'No related campaigns'}
          </h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {campaignsToShow.map((_, idx) => (
              <>
                <div key={idx}>
                  <CampaignCard campaign={_} />
                  {campaignsToShow.length > 1 && idx !== 2 && (
                    <div className='mx-auto hidden w-[95%] border-t border-primary-default lg:block' />
                  )}
                </div>
                <div key={idx}>
                  <CampaignCard campaign={_} />
                  {campaignsToShow.length > 1 && idx !== 2 && (
                    <div className='mx-auto hidden w-[95%] border-t border-primary-default lg:block' />
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
