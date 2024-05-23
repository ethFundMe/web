import { EarningsChart } from '@/components/EarningsChart';
import { ValidatorCountdown } from '@/components/ValidatorCountdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  fetchTotalUserEarnings,
  fetchUserEarnings,
  getUser,
} from '@/lib/queries';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { BellPlus, Coins, History } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isAddress } from 'viem';

dayjs.extend(advancedFormat);

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);
  if (!user) notFound();

  return {
    title: 'Earnings',
    description: `${user.bio}`,
    keywords:
      'Crypto fundraising, ethFundMe, Eth fundraising, Ethereum fundraising, Blockchain-powered crowdfunding, Decentralized support, Innovation and transparency, Empower your dreams, Community-driven fundraising, Limitless possibilities, Donate with crypto, Donate with eth, Donate with ethereum, Future of fundraising, Blockchain innovation, Cryptocurrency donations',
    openGraph: {
      type: 'website',
      title: 'Earnings',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      url: 'https://ethfund.me',
    },
    twitter: {
      title: 'Earnings | EthFundMe',
      card: 'summary_large_image',
      description: `${user.bio}`,
      images: '/images/seo-common.jpg',
      site: '@ethfundme',
      creator: '@ethfundme',
    },
  };
}

export default async function EarningsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!isAddress(slug)) notFound();
  const totalEarnings = await fetchTotalUserEarnings(slug);
  const earnings = await fetchUserEarnings(slug);

  // console.log(
  //   earnings.map((i) => ({
  //     amount: parseFloat(i.amount),
  //     source:
  //       i.rewardType === 'campaign_creation'
  //         ? 'Created campaign'
  //         : 'Funded campaign',
  //     dateEarned: new Date(i.created_at),
  //   }))
  // );

  return (
    <div className='mt-4 flex w-full p-4'>
      <div className='flex w-full flex-col items-start gap-8 lg:flex-row'>
        <div className='flex-1 space-y-16 lg:space-y-20'>
          <div>
            <h2 className='text-lg font-bold text-primary-default'>
              All Earnings
            </h2>
            <p>
              Your FUNDME tokens are sent to you immediately. The amount shown
              below is the total sent based on your activities.
            </p>

            <div className='flex flex-wrap items-center justify-between'>
              <p className='my-4 text-3xl font-bold text-primary-dark'>
                {totalEarnings && totalEarnings.total} FUNDME
              </p>

              {/* <ClaimTokenBtn
                userAddress={slug}
                disabled={
                  totalEarnings ? parseFloat(totalEarnings.total) < 0 : true
                }
              /> */}
            </div>
          </div>

          {/* Chart */}
          <EarningsChart
            earnings={earnings.map((i) => ({
              amount: parseFloat(i.amount),
              source:
                i.rewardType === 'campaign_creation'
                  ? 'Created campaign'
                  : 'Funded campaign',
              dateEarned: new Date(i.created_at),
            }))}
          />

          <div>
            <h2 className='text-lg font-bold text-primary-default'>
              Earn More!
            </h2>
            <p className='max-w-screen-[500px]'>
              Keep an eye here for the opportunity to influence reward
              distribution by participating in updating our reward system.
            </p>

            <Link
              target='_blank'
              href='/about/validator-program'
              className='my-4 block text-primary-default'
            >
              📖 Learn more
            </Link>

            {/* <div className='flex flex-wrap items-center justify-between gap-4'> */}
            <ValidatorCountdown />

            {/* <button className='grid h-24 w-24 flex-shrink-0 place-content-center rounded-full bg-neutral-400 text-sm text-white hover:bg-neutral-400/80 sm:h-32 sm:w-32 sm:text-base'>
                UPDATE
              </button>
            </div> */}
          </div>
        </div>

        <aside className='top-24 w-full lg:sticky lg:max-w-72'>
          <div className='mt-4 h-fit rounded-lg border border-slate-300 p-3 pr-0 lg:min-h-[90%]'>
            <div className='mb-2 flex items-center gap-2 pr-3'>
              <History size={30} className='stroke-1' />
              <h2 className=' text-xl font-bold'>History</h2>
            </div>

            <ScrollArea
              className={cn('pr-3', earnings.length > 2 ? 'h-96' : 'h-fit')}
            >
              {earnings.length > 0 ? (
                <ul className='mt-4 space-y-4'>
                  {earnings.map((earning, idx) => (
                    <li key={idx}>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_TNX_LINK}/${earning.transaction_hash}`}
                        className='flex items-start justify-between gap-2 rounded-md bg-slate-300/20 p-3'
                      >
                        <div>
                          <div className='space-y-1.5 lg:space-y-2.5'>
                            <div>
                              <p className='text-lg font-medium'>
                                {earning.amount} FUNDME
                              </p>

                              <p className='text-sm'>
                                {earning.rewardType === 'campaign_creation' && (
                                  <span className='flex items-center gap-1'>
                                    <BellPlus size={16} />

                                    <span>Create campaign</span>
                                  </span>
                                )}
                                {earning.rewardType === 'funding' && (
                                  <span className='flex items-center gap-1'>
                                    <Coins size={16} />

                                    <span>Fund campaign</span>
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <small>
                            {dayjs(earning.created_at)
                              .subtract(2, 'minute')
                              .format('Do MMM, YYYY . HH : mm a')}
                          </small>
                        </div>

                        <Image
                          src='/images/etherscan.svg'
                          width={17}
                          height={17}
                          alt='etherscan'
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='mt-4 rounded-md bg-white/20 p-2 text-white'>
                  Keep creating and funding more campaigns to earn tokens
                </p>
              )}
            </ScrollArea>
          </div>
        </aside>
      </div>

      {/* <EarningsCard /> */}
    </div>
  );
}
