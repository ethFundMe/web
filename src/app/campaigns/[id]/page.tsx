/* eslint-disable @next/next/no-img-element */
import { CampaignCard } from '@/components/CampaignCard';
import { CampaignComments } from '@/components/CampaignComments';
import { Container } from '@/components/Container';
import { DonateBtn } from '@/components/DonateBtn';
import DonateXShareButtons from '@/components/DonateXShareButtons';
import ImageWithFallback from '@/components/ImageWithFallback';
import ReportCampaignDialog from '@/components/ReportCampaignDialog';
import { SwiperCarousel } from '@/components/SwiperCarousel';
import { getCampaign, getCampaigns, getUser } from '@/lib/queries';
import { seoCampaign } from '@/lib/seoBannerUrl';
import { TextSizeStyles } from '@/lib/styles';
import { cn, formatWalletAddress } from '@/lib/utils';
import dayjs from 'dayjs';
import { Flag } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatEther } from 'viem';
import { DonationObjectiveIndicator } from '../DonationObjectiveIndicator';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const campaign = await getCampaign(Number(id));

  if (!campaign) notFound();

  const user = await getUser(campaign.creator as `0x${string}`);
  if (!user) notFound();

  const previousMetaData = await parent;

  return user
    ? {
        title: `${campaign.title} | EthFundMe`,
        description: `${campaign.description}`,
        keywords:
          'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
        openGraph: {
          type: 'website',
          title: `${campaign.title}`,
          description: `${campaign.description}`,
          images: [
            {
              url: seoCampaign(
                campaign.user.fullName,
                parseFloat(formatEther(BigInt(campaign.goal))).toString(),
                campaign.title,
                campaign.description,
                campaign.banner_url,
                campaign.user.profileUrl || '',
                campaign.user.isVerified
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
                campaign.banner_url,
                campaign.user.profileUrl || '',
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
  params: { id },
}: {
  params: { id: string };
}) {
  const campaign = await getCampaign(Number(id));
  async function getBeneficiary() {
    if (campaign.user?.ethAddress === campaign.beneficiary) return null;
    const beneficiary = await getUser(campaign.beneficiary as `0x${string}`);
    return beneficiary;
  }

  const beneficiary = await getBeneficiary();

  const campaignsData = await getCampaigns({ tag: campaign.tag });
  const { campaigns: allCampaigns } = await getCampaigns({});

  const { campaigns: c } = campaignsData;

  const campaigns = [...c, ...allCampaigns];

  if (!campaign) return;
  const user = await getUser(campaign.creator as `0x${string}`);

  if (!user) return;

  const campaignsToShow = campaigns
    .filter(
      (_) =>
        _.campaign_id !== campaign.campaign_id && !_.flagged && !_.discontinued
    )
    .slice(0, 3);

  const media_links = campaign.youtube_link
    ? [campaign.banner_url, ...campaign.media_links, campaign.youtube_link]
    : [campaign.banner_url, ...campaign.media_links];
  return (
    <>
      {(campaign.flagged || campaign.discontinued) && (
        <div className='flex flex-wrap items-center justify-center gap-2 bg-red-500/10 py-2 text-center text-sm text-red-500 lg:text-base'>
          {campaign.discontinued ? (
            <span>
              This campaign has been discontinued. It can no longer receive
              donations.
            </span>
          ) : (
            <>
              <Flag className='fill-red-600' size={15} />
              <span>This campaign has been flagged.</span>
            </>
          )}
          <Link href='/legal/terms-and-conditions'>Learn more</Link>
        </div>
      )}

      <div className='space-y-10 py-10 lg:space-y-12 lg:py-12'>
        <Container
          className={cn(
            'relative grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-3 lg:items-start',
            (campaign.flagged || campaign.discontinued) &&
              '!pointer-events-none !grayscale'
          )}
        >
          <div className='space-y-5 lg:col-span-2 lg:space-y-8'>
            <div>
              <h2 className={cn(TextSizeStyles.h4, 'leading-tight')}>
                {campaign.title}
              </h2>
              <small className='w-fit rounded-sm border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-slate-500'>
                {campaign.tag}
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

              <div className='flex flex-col-reverse justify-between gap-2 text-sm sm:flex-row sm:items-start sm:text-base md:gap-x-4'>
                <div className='flex flex-col items-start'>
                  <div
                    // href={`/profile/${campaign.creator}`}
                    className={cn(
                      'relative flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-md p-3 sm:gap-4 md:hover:bg-slate-200',
                      campaign.creator === campaign.beneficiary
                        ? 'w-full'
                        : 'flex-1 sm:flex-none'
                    )}
                  >
                    <Link
                      href={`/profile/${campaign.creator}`}
                      className='relative h-[40px] w-[40px] flex-shrink-0 sm:h-[50px] sm:w-[50px]'
                    >
                      <ImageWithFallback
                        src={user.profileUrl ?? ''}
                        fallback='/images/user-pfp.png'
                        className='block rounded-full bg-slate-50 object-cover'
                        fill
                        alt='...'
                      />
                    </Link>

                    <div className='flex w-full items-center justify-between pr-2'>
                      <Link href={`/profile/${campaign.creator}`}>
                        <p className={TextSizeStyles.caption}>Organizer</p>
                        <div className='flex items-center gap-x-1'>
                          <p
                            title={
                              user?.fullName ??
                              formatWalletAddress(
                                campaign.creator as `0x${string}`
                              )
                            }
                            className='sm:max-w-s line-clamp-1 flex w-full max-w-[250px] gap-1 font-semibold [word-break:break-all] sm:line-clamp-2'
                          >
                            {user?.fullName ??
                              formatWalletAddress(
                                campaign.creator as `0x${string}`
                              )}

                            {/* {user.isVerified && (
                            <Image
                              src='/images/verified.svg'
                              width={15}
                              height={15}
                              alt='check'
                            />
                          )} */}
                          </p>
                          {user.isVerified && (
                            <Image
                              className='mt-0.5 h-auto w-5'
                              src='/images/verified.svg'
                              width={30}
                              height={30}
                              alt='...'
                            />
                          )}
                          {user.username && (
                            <p className='text-sm text-gray-500'>
                              @{user.username}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>

                  {campaign.creator !== campaign.beneficiary &&
                    (beneficiary ? (
                      <Link
                        href={`/profile/${beneficiary?.ethAddress}`}
                        className='flex flex-1 flex-shrink-0 cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-slate-200 sm:flex-none sm:gap-4'
                      >
                        <div className='relative h-[40px] w-[40px] flex-shrink-0 sm:h-[50px] sm:w-[50px]'>
                          <ImageWithFallback
                            src={beneficiary.profileUrl ?? ''}
                            fallback='/images/user-pfp.png'
                            className='block rounded-full bg-slate-50 object-cover'
                            fill
                            alt='...'
                          />
                        </div>

                        <div className='pr-2'>
                          <>
                            <p className={TextSizeStyles.caption}>
                              Beneficiary
                            </p>
                            <p className='line-clamp-2 flex w-full max-w-[250px] gap-1 text-ellipsis font-semibold [word-break:break-all] sm:max-w-xs'>
                              {beneficiary?.fullName ??
                                formatWalletAddress(beneficiary?.ethAddress)}

                              {beneficiary.isVerified && (
                                <Image
                                  src='/images/verified.svg'
                                  width={15}
                                  height={15}
                                  alt='check'
                                />
                              )}
                            </p>
                          </>
                        </div>
                      </Link>
                    ) : (
                      <div>
                        <div className='pr-2'>
                          <p className={TextSizeStyles.caption}>
                            Organized for
                          </p>
                          <p className='font-semibold'>
                            {formatWalletAddress(
                              campaign.beneficiary as `0x${string}`
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                {/* <div className='hidden md:block'>
                  <ReportCampaignDialog campaign_id={campaign.campaign_id} />
                </div> */}
                <div className='my-6 flex gap-x-2 text-neutral-500 md:my-0 md:gap-x-4'>
                  <div className='ml-2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-200 md:h-14 md:w-14'>
                    <img
                      src='/images/calendar.png'
                      alt='calendar'
                      className='h-6 w-6 md:h-8 md:w-8'
                    />
                  </div>
                  <div className='mt-1'>
                    <p className={TextSizeStyles.caption}>Created on</p>
                    <p className='font-semibold'>
                      {dayjs(campaign.created_at).format('Do MMM, YYYY')}
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>{campaign.description}</div>
              <div className='flex gap-x-4'>
                <DonateXShareButtons campaign={campaign} />
                <div className='col-start-12 col-end-13 justify-self-end'>
                  <ReportCampaignDialog campaign_id={campaign.campaign_id} />
                </div>
              </div>
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
                ? 'These might interest you'
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
