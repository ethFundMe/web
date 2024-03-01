import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  }[] = [
    {
      hash: '/',
      type: 'claim',
      amt: 500,
    },
    {
      hash: '/',
      type: 'earn',
      amt: 500,
      source: 'Create campaign',
    },
    {
      hash: '/',
      type: 'earn',
      amt: 250,
      source: 'Donation',
    },
  ];

  const earningBadge: Record<EarningVariant, React.ReactNode> = {
    claim: <Badge className='bg-red-500'>Claim</Badge>,
    earn: <Badge className='bg-green-600'>Earn</Badge>,
  };

  return (
    <div className='mt-4 flex w-full p-4'>
      <div className='hidden'>{slug}</div>

      <div className='grid w-full grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20'>
        <div className='space-y-16 lg:space-y-20'>
          <div>
            <h2 className='text-xl font-bold text-primary-default'>
              Current Earnings
            </h2>
            <p>Tokens earned from all activities</p>

            <p className='my-4 text-2xl font-bold lg:text-4xl'>1350 FUNDME</p>

            <Button className='w-full max-w-72 text-lg font-bold'>
              Claim Tokens
            </Button>
          </div>

          <div>
            <h2 className='text-xl font-bold text-primary-default'>
              Validator Incentives
            </h2>

            <div className='mt-4 space-y-6 rounded-lg bg-primary-default p-6 text-center text-white'>
              <p className='text-3xl'>12:00:03</p>

              <div className='space-y-4'>
                <p className='text-sm'>
                  Earn more tokens by validating our smart contracts to keep
                  them running smoothly.
                </p>
                <Link href='/'>Learn more</Link>
              </div>

              <Button
                variant='secondary'
                className='w-full max-w-72 text-lg font-bold'
              >
                Validate
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-bold text-primary-default'>History</h2>

          <div className='mt-4 rounded-lg border border-slate-300 bg-slate-100 p-4 lg:min-h-[90%] lg:p-6'>
            <ul className='space-y-4'>
              {earnings.map((earning, idx) => (
                <li key={idx}>
                  <Link href={earning.hash}>
                    <div className='space-y-1.5 text-primary-default lg:space-y-2.5'>
                      {earningBadge[earning.type]}

                      <div className='flex flex-wrap justify-between gap-4'>
                        <p className='text-xl font-semibold leading-4'>
                          {earning.amt} Funder
                        </p>

                        <p>{earning.source}</p>
                      </div>

                      <small>25th July, 2025</small>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <EarningsCard /> */}
    </div>
  );
}
