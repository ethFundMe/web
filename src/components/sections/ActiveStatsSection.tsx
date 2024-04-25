import { fetchActiveStats } from '@/actions';
import Image from 'next/image';
import { formatEther } from 'viem';
import { Container } from '../Container';
import CountUp from '../CountUp';
import LiveDonations from '../LiveDonations';

export default async function ActiveStatsSection() {
  const stats = await fetchActiveStats();

  // if (!stats) return;

  console.log(stats);

  return (
    <>
      <section>
        <Container className='space-y-20 py-10 lg:py-20'>
          {stats && (
            <div className='grid grid-cols-1 place-items-center  gap-6 sm:grid-cols-3'>
              <div className='flex flex-col items-center gap-4 text-center md:flex-row md:text-left'>
                <Image
                  className='w-10 md:w-[70px]'
                  src='/images/eth-logo.png'
                  width={70}
                  height={0}
                  alt='eth-logo'
                />
                <p>
                  <span className='text-xl font-bold md:text-3xl'>
                    <CountUp
                      end={parseFloat(
                        formatEther(stats.ethFunded || BigInt(0))
                      )}
                      duration={3}
                    />
                  </span>
                  <span className='block'>ETH donated</span>
                </p>
              </div>

              <div className='flex flex-col items-center gap-4 text-center md:flex-row md:text-left'>
                <Image
                  className='w-10 md:w-[80px]'
                  src='/images/funded-campaigns.svg'
                  width={80}
                  height={80}
                  alt='funded'
                />
                <p>
                  <span className='text-xl font-bold md:text-3xl'>
                    <CountUp duration={3} end={stats.activeCampaigns} />
                  </span>
                  <span className='block'>active campaigns</span>
                </p>
              </div>

              <div className='flex flex-col items-center gap-4 text-center md:flex-row md:text-left'>
                <Image
                  className='w-10 md:w-[80px]'
                  src='/images/active-campaigns.svg'
                  width={80}
                  height={80}
                  alt='eth-logo'
                />
                <p>
                  <span className='text-xl font-bold md:text-3xl'>
                    <CountUp duration={3} end={stats.fundedCampaigns} />
                  </span>
                  <span className='block'>campaigns funded</span>
                </p>
              </div>
            </div>
          )}

          <LiveDonations />
        </Container>
      </section>
    </>
  );
}
