'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Container } from './Container';
import { ButtonStyle } from './inputs';

export const AboutSection = () => {
  return (
    <section>
      <Container className='mx-auto max-w-3xl space-y-5 py-10 text-center lg:py-20'>
        <div className='pt-5'>
          <h2 className={TextSizeStyles.h2}>About Us</h2>
        </div>

        <p className='text-center'>
          EthFundMe is the pioneering crowdfunding platform where compassion
          meets blockchain technology. Here, we unite the power of community
          support with the transparency and efficiency of web3 technologies.
          Whether you&rsquo;re fueling a personal dream, supporting a local
          project, or aiding global causes, EthFundMe is your gateway to making
          a real impact. Dive into a world where every contribution is a step
          towards a brighter future
        </p>

        <Link
          href='/about'
          className={cn(
            'mx-auto block w-fit',
            ButtonStyle.base,
            ButtonStyle.size.md,
            ButtonStyle.variant.primary
          )}
        >
          Learn More
        </Link>
      </Container>
    </section>
  );
};
