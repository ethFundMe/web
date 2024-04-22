import { getCampaign, getCampaigns, getUser } from '@/actions';
import { CampaignCard } from '@/components/CampaignCard';
import { CampaignComments } from '@/components/CampaignComments';
import { Container } from '@/components/Container';
import { DonateBtn } from '@/components/DonateBtn';
import DonateXShareButtons from '@/components/DonateXShareButtons';
import ImageWithFallback from '@/components/ImageWithFallback';
import { SwiperCarousel } from '@/components/SwiperCarousel';
import { seoCampaign } from '@/lib/seoBannerUrl';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import dayjs from 'dayjs';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatEther } from 'viem';
import { DonationObjectiveIndicator } from '../DonationObjectiveIndicator';

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
        title: `${campaign.metadata.title}`,
        description: `${campaign.metadata.description}`,
        keywords:
          'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
        openGraph: {
          type: 'website',
          title: `${campaign.metadata.title}`,
          description: `${campaign.metadata.description}`,
          images: [
            {
              url: seoCampaign(
                campaign.user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))).toString(),
                campaign.metadata.title,
                campaign.metadata.description,
                campaign.metadata.banner_url,
                campaign.user.profileUrl,
                campaign.user.isVerified
              ),
            },
          ],
          url: 'https://ethfund.me',
        },
        twitter: {
          title: `${campaign.metadata.title}`,
          card: 'summary_large_image',
          description: `${campaign.metadata.description}`,
          images: [
            {
              url: seoCampaign(
                user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))).toString(),
                campaign.metadata.title,
                campaign.metadata.description,
                campaign.metadata.banner_url,
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

  const media_links = campaign.metadata.youtube_link
    ? [
        campaign.metadata.banner_url,
        ...campaign.metadata.media_links,
        campaign.metadata.youtube_link,
      ]
    : [campaign.metadata.banner_url, ...campaign.metadata.media_links];
  return (
    <>
      <div className='space-y-10 py-10 lg:space-y-12 lg:py-12'>
        <Container className='relative grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-3 lg:items-start'>
          <div className='space-y-5 lg:col-span-2 lg:space-y-8'>
            <div>
              <h2 className={cn(TextSizeStyles.h4, 'leading-tight')}>
                {campaign.metadata.title}
              </h2>
              <small className='w-fit rounded-sm border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-slate-500'>
                {campaign.metadata.tag.name}
              </small>
            </div>

            <SwiperCarousel images={media_links} />

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
              <div className='flex flex-col-reverse justify-between gap-2 text-sm sm:flex-row sm:items-center sm:text-base md:gap-4'>
                <div className='flex items-center gap-2'>
                  <Link
                    href={`/profile/${campaign.creator}`}
                    className='flex flex-shrink-0 cursor-pointer items-center gap-4 rounded-md p-3 hover:bg-slate-200'
                  >
                    <div className='relative h-[50px] w-[50px] flex-shrink-0'>
                      <ImageWithFallback
                        src={user.profileUrl ?? ''}
                        fallback='/images/user-pfp.png'
                        className='block rounded-full bg-slate-50 object-cover'
                        fill
                        alt='...'
                      />
                    </div>

                    <div className='pr-2'>
                      <>
                        <p className={TextSizeStyles.caption}>Organizer</p>
                        <p className='font-semibold'>
                          {user?.fullName ??
                            formatWalletAddress(
                              campaign.creator as `0x${string}`
                            )}
                        </p>
                      </>
                    </div>
                  </Link>

                  {campaign.creator !== campaign.beneficiary && (
                    <div>
                      <div className='pr-2'>
                        <p className={TextSizeStyles.caption}>Organized for</p>
                        <p className='font-semibold'>
                          {formatWalletAddress(
                            campaign.beneficiary as `0x${string}`
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className={TextSizeStyles.caption}>Organized On</p>
                  <p className='font-semibold'>
                    {dayjs(campaign.created_at).format('Do MMM, YYYY')}
                  </p>
                </div>
              </div>
              <div className='space-y-4'>{campaign.metadata.description}</div>
              <DonateXShareButtons campaign={campaign} />
            </div>
          </div>

          <CampaignComments campaign={campaign} />
        </Container>
        <Container>
          <div className='space-y-4'>
            <h2
              className={cn(
                TextSizeStyles.h5,
                'font-light text-primary-default'
              )}
            >
              {campaignsToShow.length > 0
                ? 'Related campaigns'
                : 'No related campaigns'}
            </h2>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {campaignsToShow.map((_, idx) => (
                <CampaignCard campaign={_} key={idx} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
