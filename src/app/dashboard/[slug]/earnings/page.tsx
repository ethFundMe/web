import { EarningsChart } from '@/components/EarningsChart';
import { ValidatorCountdown } from '@/components/ValidatorCountdown';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { History } from 'lucide-react';
import Link from 'next/link';

type EarningVariant = 'claim' | 'earn';

export default async function EarningsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Fetch user earnings

  const earnings: {
    type: EarningVariant;
    amt: number;
    source?: string;
    hash: string;
    date: Date;
  }[] = [
    {
      hash: '/',
      type: 'claim',
      amt: 500,
      date: dayjs().subtract(1, 'h').toDate(),
    },
    {
      hash: '/',
      type: 'earn',
      amt: 500,
      source: 'Create campaign',
      date: dayjs().subtract(2, 'h').subtract(30, 'minutes').toDate(),
    },
    {
      hash: '/',
      type: 'earn',
      amt: 250,
      source: 'Donation',
      date: dayjs().subtract(3, 'h').toDate(),
    },
  ];

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
                45,500.02 FUNDME
              </p>

              <Button className='lg:text-md w-full max-w-44 text-base font-bold'>
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

            <Link href='/' className='my-4 block text-primary-default'>
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

        <aside className='w-full min-w-max lg:max-w-72'>
          <h2 className='text-xl font-bold text-primary-default'>History</h2>

          <div className='mt-4 h-fit rounded-lg border border-slate-300 bg-neutral-100 p-4 lg:min-h-[90%] lg:p-6'>
            <History size={50} className='stroke-1 text-slate-500' />

            <ul className='mt-8 space-y-4'>
              {earnings.map((earning, idx) => (
                <li key={idx}>
                  <Link href={earning.hash}>
                    <div className='space-y-1.5 text-neutral-700 lg:space-y-2.5'>
                      {/* {earningBadge[earning.type]} */}

                      <div>
                        <p className='text-xl font-semibold leading-4'>
                          {earning.type === 'claim' ? '-' : '+'} {earning.amt}{' '}
                          Fundme
                        </p>

                        <p>{earning.source}</p>

                        <p className='capitalize'>{earning.type}</p>
                      </div>

                      <small>{dayjs(earning.date).format('DD/MM/YYYY')}</small>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {/* <EarningsCard /> */}
    </div>
  );
}
