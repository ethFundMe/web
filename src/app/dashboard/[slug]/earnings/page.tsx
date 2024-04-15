import { fetchTotalUserEarnings, fetchUserEarnings } from '@/actions';
import { EarningsChart } from '@/components/EarningsChart';
import { ValidatorCountdown } from '@/components/ValidatorCountdown';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { History } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isAddress } from 'viem';

// type EarningVariant = 'claim' | 'earn';

export default async function EarningsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!isAddress(slug)) notFound();
  const totalEarnings = await fetchTotalUserEarnings(slug);
  const earnings = await fetchUserEarnings(slug);

  // const earningBadge: Record<EarningVariant, React.ReactNode> = {
  //   claim: <Badge className='bg-red-500'>Claim</Badge>,
  //   earn: <Badge className='bg-green-600'>Earn</Badge>,
  // };

  return (
    <div className='mt-4 flex w-full p-4'>
      <div className='hidden'>{slug}</div>

      <div className='flex w-full flex-col items-start gap-8 lg:flex-row'>
        <div className='flex-1 space-y-16 lg:space-y-20'>
          <div>
            <h2 className='text-lg font-bold text-primary-default'>
              Current Earnings
            </h2>
            <p>Tokens earned from all activities</p>

            <div className='flex flex-wrap items-center justify-between'>
              <p className='my-4 text-3xl font-bold text-primary-dark'>
                {totalEarnings?.total || 0} FUNDME
              </p>

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

        <aside className='top-24 w-full min-w-max lg:sticky lg:max-w-72'>
          <h2 className='text-xl font-bold text-primary-default'>History</h2>

          <div className='mt-4 h-fit rounded-lg border border-slate-300 bg-neutral-100 p-4 lg:min-h-[90%] lg:p-6'>
            <History size={50} className='stroke-1 text-slate-500' />

            {earnings.length > 0 ? (
              <ul className='mt-8 space-y-4'>
                {earnings.map((earning, idx) => (
                  <li key={idx}>
                    <Link href={'/'}>
                      <div className='space-y-1.5 text-neutral-700 lg:space-y-2.5'>
                        {/* {earningBadge[earning.type]} */}

                        <div>
                          <p className='text-xl font-semibold leading-4'>
                            {earning.rewardType === 'campaign_creation'
                              ? '-'
                              : '+'}{' '}
                            {earning.amount} Fundme
                          </p>

                          <p>{earning.rewardType}</p>

                          <p className='capitalize'>{earning.rewardType}</p>
                        </div>

                        <small>
                          {dayjs(earning.created_at)
                            .subtract(2, 'minute')
                            .format('Do MMM, YYYY . HH : mm a')}
                        </small>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='mt-4 text-slate-500'>
                Keep creating and funding more campaigns to earn tokens
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* <EarningsCard /> */}
    </div>
  );
}
