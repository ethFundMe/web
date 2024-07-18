import { EarningsChart } from '@/components/EarningsChart';
import { ValidatorCountdown } from '@/components/ValidatorCountdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  fetchTotalUserEarnings,
  fetchUserEarnings,
  getUser,
} from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Coins, History } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CiSquarePlus } from 'react-icons/ci';
import { GiFairyWand } from 'react-icons/gi';
import { isAddress } from 'viem';
import { TokenButton } from './TokenButton';

dayjs.extend(advancedFormat);

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.slug;

  const user = await getUser(id as `0x${string}`);
  if (!user) notFound();

  return {
    title: 'Earnings',
    description: `${user.bio}`,
    keywords:
      'Ethereum alternative to GoFundMe, Blockchain-based GoFundMe competitor, Crypto fundraising vs GoFundMe, Decentralized GoFundMe alternative, Ethereum crowdfunding like GoFundMe, GoFundMe for Ethereum projects, Crypto version of GoFundMe, GoFundMe for blockchain campaigns, GoFundMe alternative for crypto donations, Ethereum-based GoFundMe alternative, Raise funds like GoFundMe with Ethereum, Blockchain fundraising similar to GoFundMe, GoFundMe alternative using Ethereum, Crypto crowdfunding similar to GoFundMe, Ethereum donation platform vs GoFundMe, Ethereum crowdfunding, Blockchain fundraising, Decentralized fundraising platform, Crypto donations, Ethereum charity platform, Blockchain-based donations, Ethereum fundraising campaigns, Crowdfunding with Ethereum, Secure fundraising on blockchain, Crypto fundraising platform, Ethereum campaign management, Transparent crowdfunding, Smart contract fundraising, Donate with Ethereum, Blockchain philanthropy, EthFundMe, EthFundMe platform, EthFundMe fundraising, EthFundMe campaigns, EthFundMe donations',
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

  return (
    <div className='my-4 flex w-full p-4'>
      <div className='flex w-full flex-col items-start gap-8 lg:flex-row'>
        <div className='flex-1 space-y-16 lg:space-y-20'>
          <div>
            <h2 className={cn(TextSizeStyles.h4)}>All Earnings</h2>
            <p>
              Your FUNDME tokens are automatically sent to you after each
              activity. The amount shown below represents the total tokens you
              have received so far based on all your activities.
            </p>

            <div className='flex flex-wrap items-center justify-between'>
              <p className='my-4 text-3xl font-bold text-primary-default'>
                {(totalEarnings && totalEarnings.total) ?? 0} FUNDME
              </p>
            </div>
            {Number(totalEarnings?.total) > 0 ? (
              <p className='text-gray-500'>
                Can&apos;t see FUNDME tokens in your wallet?{' '}
                <span>
                  <TokenButton />
                </span>
              </p>
            ) : (
              <></>
            )}
          </div>

          {/* Chart */}
          {(earnings.length ?? 0) > 0 && (
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
          )}

          <div>
            <h2 className={cn(TextSizeStyles.h4)}>Validate to Earn More</h2>

            <p className='max-w-screen-[500px] my-2'>
              Keep an eye here for the opportunity to influence reward
              distribution by participating in updating our reward system.
            </p>

            <Link
              target='_blank'
              href='/about/validator-program'
              className='mb-4 block text-primary-default'
            >
              📖 How it works
            </Link>

            <ValidatorCountdown />
          </div>
        </div>

        <aside className='top-24 w-full lg:sticky lg:max-w-72'>
          {(totalEarnings && totalEarnings.total) ?? 0 > 0 ? (
            <div className='mt-4 h-fit rounded-lg border border-slate-300 p-3 pr-0 lg:min-h-[90%]'>
              {earnings.length > 0 && (
                <>
                  <div className='mb-2 flex items-center gap-2 pr-3'>
                    <History size={30} className='stroke-1' />
                    <h2 className=' text-xl font-bold'>History</h2>
                  </div>

                  <ScrollArea
                    className={cn(
                      'pr-3',
                      earnings.length > 2 ? 'h-96' : 'h-fit'
                    )}
                  >
                    {earnings.length > 0 ? (
                      <ul className='mt-4 space-y-4'>
                        {earnings.map((earning, idx) => (
                          <li key={idx}>
                            <Link
                              target='_blank'
                              href={`${process.env.NEXT_PUBLIC_TNX_LINK}/${earning.transaction_hash}`}
                              className='flex items-start justify-between gap-2 rounded-md bg-slate-300/20 p-3 hover:bg-slate-300/40'
                            >
                              <div>
                                <div className='space-y-1.5 lg:space-y-2.5'>
                                  <div>
                                    <p className='text-lg font-medium'>
                                      {earning.amount} FUNDME
                                    </p>

                                    <p className='text-sm'>
                                      {earning.rewardType ===
                                        'campaign_creation' && (
                                        <span className='flex items-center gap-1'>
                                          <CiSquarePlus size={16} />

                                          <span>Create campaign</span>
                                        </span>
                                      )}
                                      {earning.rewardType === 'funding' && (
                                        <span className='flex items-center gap-1'>
                                          <Coins size={16} />

                                          <span>Fund campaign</span>
                                        </span>
                                      )}

                                      {earning.rewardType === 'validator' && (
                                        <span className='flex items-center gap-1'>
                                          <GiFairyWand size={16} />

                                          <span>Diminish</span>
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
                                className='mt-1'
                                src='/images/etherscan.svg'
                                width={16}
                                height={16}
                                alt='etherscan'
                                priority
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
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </aside>
      </div>
    </div>
  );
}
