'use client';

import { CAMPAIGNCATEGORIES } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ButtonStyle } from '../Button';
import { CampaignCategoryCard } from '../CampaignCategoryCard';
import { Container } from '../Container';
import { CampaignCategory } from '../types';

export const CampaignCategorySection = () => {
  const [selectedcategory, setSelectedcategory] = useState<CampaignCategory>(
    CAMPAIGNCATEGORIES[0]
  );

  return (
    <section>
      <Container className='space-y-5 py-10'>
        <div className='py-5 text-center'>
          <h2 className={TextSizeStyles.h2}>Our campaign categories</h2>
          <p className='font-edium text-lg'>
            You can contribute to the following categories
          </p>
        </div>

        <div className='grid grid-cols-1 items-center gap-5 sm:grid-cols-5'>
          <div className='group relative h-96 overflow-hidden rounded-2xl bg-slate-200 sm:col-span-3 sm:h-96'>
            <Image
              src={selectedcategory.image}
              alt='...'
              fill
              className='object-cover'
            />

            <div className='text absolute inset-0 bottom-0 left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 opacity-0 transition-all duration-200 ease-in group-hover:opacity-100'>
              <div className='flex h-full flex-col items-center justify-center p-2 text-center text-white'>
                <p className='max-w-sm text-lg lg:max-w-lg lg:text-xl'>
                  {selectedcategory.description}
                </p>
                <Link
                  className={cn(
                    ButtonStyle.base,
                    ButtonStyle.size.sm,
                    'mt-4 block'
                  )}
                  href={`/campaigns/categories?type=${selectedcategory.type}`}
                >
                  Browse category
                </Link>
              </div>
            </div>
          </div>

          <div className='scrollbar-hidden w-full overflow-x-scroll sm:col-span-2'>
            <div className='flex w-full grid-cols-2 gap-4 sm:grid'>
              {CAMPAIGNCATEGORIES.map((_, idx) => (
                <CampaignCategoryCard
                  handleOnClick={() => setSelectedcategory(_)}
                  category={_}
                  key={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
