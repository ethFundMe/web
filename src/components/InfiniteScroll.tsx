'use client';

import { getCampaigns } from '@/actions';
import { Campaign } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CampaignCard } from './CampaignCard';

export default function InfiniteScroll({
  initialCampaigns,
  totalCampaigns,
}: {
  initialCampaigns: Campaign[];
  totalCampaigns: number;
}) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({ rootMargin: '50px' });

  const loadMoreCampaigns = useCallback(
    async function () {
      const next = page + 1;

      const { campaigns: c } = await getCampaigns(next);

      if (c.length && !(campaigns.length === totalCampaigns)) {
        setPage(next);
        setCampaigns((prev) => [...prev, ...c]);
      }
    },
    [page, campaigns.length, totalCampaigns]
  );

  useEffect(() => {
    if (inView) {
      loadMoreCampaigns();
    }
  }, [inView, loadMoreCampaigns]);

  return (
    <>
      {campaigns.map((i) => (
        <CampaignCard key={i.id} campaign={i} />
      ))}

      <div className='sm:col-span-2 lg:col-span-3'>
        {campaigns.length !== totalCampaigns ? (
          <div
            ref={ref}
            className='mx-auto h-10 w-10 animate-spin rounded-full border-2 border-red-300 border-t-transparent p-4'
          ></div>
        ) : (
          <p className='py-4 text-center text-slate-500'>
            - End of campaigns -
          </p>
        )}
      </div>
    </>
  );
}
