'use client';

import { getCampaigns } from '@/actions';
import { CampaignTags } from '@/lib/types';
import { Campaign } from '@/types';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CampaignCard } from './CampaignCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function InfiniteScroll({
  initialCampaigns,
  totalCampaigns,
}: {
  initialCampaigns: Campaign[];
  totalCampaigns: number;
}) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [campaignsToShow, setCampaignsToShow] = useState(campaigns);
  const [campaignsFiltered, setCampaignsFiltered] = useState(false);
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

  function filterByTag(tag: CampaignTags) {
    // setCampaignsToShow((prev)=>prev.filter((camp) => camp?.tag === tag));
    console.log(tag);

    setCampaignsFiltered(true);
  }

  const filterBySearchTerm = (term: string) => {
    const lowercasedTerm = term.toLowerCase();
    const filteredCampaigns = campaigns.filter(
      (camp) =>
        camp.title.toLowerCase().includes(lowercasedTerm) ||
        camp.description.toLowerCase().includes(lowercasedTerm) ||
        camp.user.fullName.toLowerCase().includes(lowercasedTerm)
    );

    setCampaignsToShow(filteredCampaigns);
    setCampaignsFiltered(true);
  };

  return (
    <div className='space-y-10'>
      <div className='flex flex-wrap items-center gap-4 filter'>
        <Select
          onValueChange={(e: CampaignTags) => filterByTag(e)}
          // defaultValue={field.value}
        >
          <SelectTrigger className='min-w-96 flex-1'>
            <SelectValue
              placeholder='Filter by campaign type'
              // defaultValue={form.getValues('type')}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CampaignTags).map(([key, value]) => (
              <SelectItem value={value} key={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='hidden flex-1 md:block'></div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const searchTerm = formData.get('searchTerm');
            if (typeof searchTerm === 'string' && !searchTerm.trim()) return;
            filterBySearchTerm(searchTerm as string);
          }}
          className='search flex min-w-96 flex-1 items-center gap-2.5'
        >
          <Input required placeholder='Search for campaign' name='searchTerm' />
          <Button>
            <Search />
          </Button>
        </form>

        <Button
          onClick={() => {
            setCampaignsToShow(campaigns);
            setCampaignsFiltered(false);
          }}
          variant='outline'
          className='flex items-center gap-1 hover:text-red-500'
        >
          Clear Filters
          <X size={16} />
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {campaignsToShow.map((i) => (
          <CampaignCard key={i.id} campaign={i} />
        ))}

        <div className='sm:col-span-2 lg:col-span-3'>
          {!campaignsFiltered && campaigns.length !== totalCampaigns ? (
            <div
              ref={ref}
              className='mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary-dark border-t-transparent p-4'
            ></div>
          ) : campaignsFiltered && !campaignsToShow.length ? (
            <div className='flex flex-col items-center gap-4 pt-8'>
              <Image
                className='opacity-50'
                src='/images/no-results.png'
                width={80}
                height={80}
                alt='no-results'
              />
              <p className='py-4 text-center text-slate-500'>
                Your filter produced no results
              </p>
            </div>
          ) : (
            <p className='py-4 text-center text-slate-500'>
              - End of campaigns -
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
