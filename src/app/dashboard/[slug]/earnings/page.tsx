import { fetchTotalUserEarnings, fetchUserEarnings } from '@/actions';
import { Earnings } from '@/components/Earnings';
import { EarningsChart } from '@/components/EarningsChart';
import { ValidatorCountdown } from '@/components/ValidatorCountdown';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import dayjs from 'dayjs';
import { BellPlus, Coins, History } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isAddress } from 'viem';

export default async function EarningsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!isAddress(slug)) notFound();
  const totalEarnings = await fetchTotalUserEarnings(slug);
  const earnings = await fetchUserEarnings(slug);

  console.log({ earnings });

  return (
    <div className='mt-4 flex w-full p-4'>
      <div className='flex w-full flex-col items-start gap-8 lg:flex-row'>
        <div className='flex-1 space-y-16 lg:space-y-20'>
          <div>
            <h2 className='text-lg font-bold text-primary-default'>
              Current Earnings
            </h2>
            <p>Tokens earned from all activities</p>

            <div className='flex flex-wrap items-center justify-between'>
              <Earnings user={slug} />

              <Button
                disabled={
                  totalEarnings ? parseFloat(totalEarnings.total) < 0 : true
                }
                className='lg:text-md w-full max-w-44 text-base font-bold'
              >
                Claim Tokens
              </Button>
            </div>
          </div>

          {/* Chart */}
          <EarningsChart />

          <div>
            <h2 className='text-lg font-bold text-primary-default'>
              Earn More!
            </h2>
            <p className='max-w-screen-[500px]'>
              Keep an eye here for the opportunity to influene reward
              distribution by participating in updating our reward system.
            </p>

            <Link
              target='_blank'
              href='/about/validationg-program'
              className='my-4 block text-primary-default'
            >
              📖 Learn more
            </Link>

            <div className='flex flex-wrap items-center justify-between gap-4'>
              <ValidatorCountdown />

              <button className='grid h-24 w-24 flex-shrink-0 place-content-center rounded-full bg-neutral-400 text-sm text-white hover:bg-neutral-400/80 sm:h-32 sm:w-32 sm:text-base'>
                UPDATE
              </button>
            </div>
          </div>
        </div>

        <aside className='top-24 w-full lg:sticky lg:max-w-72'>
          <div className='mt-4 h-fit rounded-lg border border-slate-300 bg-primary-default p-4 lg:min-h-[90%]'>
            <div className='flex items-center gap-2 text-white'>
              <History size={40} className='stroke-1' />
              <h2 className='text-xl font-bold'>History</h2>
            </div>

            <ScrollArea className='h-96'>
              {earnings.length > 0 ? (
                <ul className='mt-4 space-y-4'>
                  {earnings.map((earning, idx) => (
                    <li key={idx}>
                      <Link
                        href={'/'}
                        className='block rounded-md bg-white/20 p-2.5 text-white'
                      >
                        <div className=''>
                          {/* {earningBadge[earning.type]} */}

                          <div className='space-y-1.5 lg:space-y-2.5'>
                            <div className='flex items-end justify-between gap-2'>
                              <p className='text-xl font-semibold'>
                                {/* {earning.rewardType === 'campaign_creation'
                                ? '-'
                              : '+'}{' '} */}
                                {earning.amount} Fundme
                              </p>

                              <p className='text-sm'>
                                {earning.rewardType === 'campaign_creation' && (
                                  <span className='flex items-center gap-1'>
                                    <BellPlus size={16} />

                                    <span>Create campaign</span>
                                  </span>
                                )}
                                {earning.rewardType === 'campaign_funding' && (
                                  <span className='flex items-center gap-1'>
                                    <Coins size={16} />

                                    <span>Fund campaign</span>
                                  </span>
                                )}
                              </p>
                            </div>

                            <p className='capitalize'>{earning.rewardType}</p>
                          </div>

                          <small>
                            {dayjs(earning.created_at)
                              .subtract(2, 'minute')
                              .format('DD MMM, YYYY . HH : mm a')}
                          </small>
                        </div>
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
