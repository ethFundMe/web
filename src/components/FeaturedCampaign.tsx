'use client';

import { Campaign, User } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { formatEther } from 'viem';
import { DonateBtn } from './DonateBtn';
import { Button } from './ui/button';

export default function FeaturedCampaign({
  // images = ['/images/family.jpg', '/images/pets.jpg', '/images/accident.webp'],
  campaign,
  user,
}: {
  images?: string[];
  campaign: Campaign;
  user: User;
}) {
  const [index, setIndex] = useState(0);

  const images = useMemo(
    () => [campaign.metadata.banner_url, ...campaign.metadata.media_links],
    [campaign]
  );

  const AnimImage = motion(Image);

  const percentage = (campaign.total_accrued / campaign.goal) * 100;

  const percentageRaised = percentage > 100 ? 100 : percentage;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === images.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className='relative h-full flex-1 overflow-hidden'>
      <div
        className='absolute left-0 top-0 z-20 mt-auto flex h-full w-full flex-col items-center justify-end px-4 pb-8'
        style={{ background: 'linear-gradient(#004f6c96 60%,#004f6c)' }}
      >
        <div className='relative z-20 mx-auto flex max-w-2xl flex-col items-center text-center text-white'>
          <div className='mb-3 text-slate-300'>
            <p className='font-semibold leading-[0]  md:text-lg md:leading-[1]'>
              {user.fullName}
            </p>
            <span className='text-xs leading-[0] md:text-sm'>presents</span>
          </div>
          <p className='mb-1 text-xl font-bold sm:text-3xl lg:text-5xl'>
            {campaign.metadata.title}
          </p>
          <p className='line-clamp-2 max-w-lg text-xs md:text-sm'>
            {campaign.metadata.description}
          </p>
        </div>

        <div className='mt-4 flex w-full  max-w-4xl items-center gap-x-4'>
          <div className='flex items-center font-semibold text-gray-300'>
            <FaEthereum size={20} />
            <span className='text-xl lg:text-2xl'>
              {formatEther(BigInt(campaign.total_accrued))}
            </span>
          </div>

          <div className='h-2 w-full flex-1 overflow-hidden rounded-full bg-gray-400'>
            <div
              className='h-full rounded-full bg-white'
              style={{
                width:
                  percentageRaised > 1
                    ? `${percentageRaised}%`
                    : percentageRaised !== 0
                    ? '1%'
                    : 0,
              }}
            />
          </div>

          <div className='flex items-center font-semibold text-white'>
            <FaEthereum size={20} />
            <span className='text-xl lg:text-2xl'>
              {formatEther(BigInt(campaign.goal))}
            </span>
          </div>
        </div>

        <div className='mt-4 flex flex-wrap items-center gap-2'>
          <DonateBtn
            text='Help now'
            size='lg'
            campaign={campaign}
            className='text-md'
          />

          <Button
            asChild
            variant='secondary'
            className='text-md w-full max-w-[10rem] flex-shrink-0 px-8'
            size='lg'
          >
            <Link href={`/campaigns/${campaign.campaign_id}`}>
              <span>View campaign</span>
            </Link>
          </Button>
        </div>
      </div>

      <AnimatePresence mode='popLayout' initial={false}>
        <AnimImage
          key={index}
          animate={{
            opacity: [0, 1],
            x: index === 0 ? ['80%', '0%'] : ['100%', '0%'],
            transition: { x: { type: 'spring', damping: 20 } },
          }}
          exit={{
            // opacity: [1, 0],
            x: ['0%', '-100%'],
            transition: { x: { type: 'spring', damping: 20 } },
          }}
          src={images[index]}
          className='object-cover'
          fill
          alt='...'
          priority
        />
      </AnimatePresence>
    </div>
  );
}
