'use client';

import Image from 'next/image';

// import CountUp from 'react-countup';
import { Container } from '../Container';
import CountUp from '../CountUp';
import LiveDonations from '../LiveDonations';

export default function ActiveStatsSection() {
  return (
    <section>
      <Container className='space-y-20 py-10 lg:py-20'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
            <Image
              src='/images/eth-logo.png'
              width={90}
              height={100}
              alt='eth-logo'
            />
            <p>
              <span className='text-3xl font-bold'>
                <CountUp end={521} duration={3} />
                ETH
              </span>
              <span className='block'>donated so far</span>
            </p>
          </div>

          <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
            <Image
              src='/images/fundraising-icon.png'
              width={150}
              height={200}
              alt='eth-logo'
            />
            <p>
              <span className='text-3xl font-bold'>
                <CountUp duration={3} end={3218} />
              </span>
              <span className='block'>campaigns funded</span>
            </p>
          </div>

          <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
            <Image
              src='/images/fundraising-icon.png'
              width={150}
              height={100}
              alt='eth-logo'
            />
            <p>
              <span className='text-3xl font-bold'>
                <CountUp duration={3} end={3000} />
              </span>
              <span className='block'>active campaigns</span>
            </p>
          </div>
        </div>

        <LiveDonations />
      </Container>
    </section>
  );
}
