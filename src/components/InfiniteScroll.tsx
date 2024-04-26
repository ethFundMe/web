'use client';

import { getCampaigns } from '@/actions';
import { cn } from '@/lib/utils';
import { campaignStore } from '@/store/campaignStore';
import { Campaign } from '@/types';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const [campaignsFiltered, setCampaignsFiltered] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({ rootMargin: '50px' });
  const [filterValues, setFilterValues] = useState<{
    tag: number | undefined;
    searchTerm: string;
  }>({ tag: undefined, searchTerm: '' });

  const router = useRouter();

  const { campaigns, updateCampaigns, filterCampaigns, filteredCampaigns } =
    campaignStore();

  useEffect(() => {
    updateCampaigns(initialCampaigns);
    filterCampaigns(initialCampaigns);
  }, [filterCampaigns, initialCampaigns, updateCampaigns]);

  const loadMoreCampaigns = useCallback(
    async function () {
      const next = page + 1;

      const { campaigns: c } = await getCampaigns({
        page: next,
        tagId: filterValues.tag,
      });

      if (c.length && !(campaigns.length === totalCampaigns)) {
        setPage(next);
        updateCampaigns([...campaigns, ...c]);
      }
    },
    [page, campaigns, updateCampaigns, filterValues.tag, totalCampaigns]
  );

  useEffect(() => {
    if (inView) {
      loadMoreCampaigns();
    }
  }, [inView, loadMoreCampaigns]);

  const filterBySearchTerm = (term: string) => {
    const lowercasedTerm = term.toLowerCase();
    const _ = campaigns.filter(
      (camp) =>
        camp.metadata.title.toLowerCase().includes(lowercasedTerm) ||
        camp.metadata.description.toLowerCase().includes(lowercasedTerm) ||
        camp.user.fullName.toLowerCase().includes(lowercasedTerm)
    );

    filterCampaigns(_);
    setCampaignsFiltered(true);
  };

  const handleTagChange = async (tag: number) => {
    setFilterValues((prev) => ({ ...prev, tag }));
    const { campaigns: c } = await getCampaigns({ page: 1, tagId: tag });
    setCampaignsFiltered(true);
    filterCampaigns(c);
  };

  return (
    <div className='space-y-10'>
      <div className='flex flex-wrap items-center justify-start gap-2 md:gap-4'>
        <form
          className='search relative flex w-full items-center gap-2.5 sm:basis-96'
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const searchTerm = formData.get('searchTerm');
            if (typeof searchTerm === 'string' && !searchTerm.trim()) return;
            filterBySearchTerm(searchTerm as string);
          }}
        >
          <Input
            value={filterValues.searchTerm}
            onChange={(e) => {
              setFilterValues((prev) => ({
                ...prev,
                searchTerm: e.target.value,
              }));
            }}
            required
            placeholder='Search for campaign'
            name='searchTerm'
            className='pr-20'
          />
          <Button className='absolute right-1 h-4/5'>
            <Search />
          </Button>
        </form>

        <Select
          onValueChange={(e) => {
            handleTagChange(parseInt(e));
            router.push(`/campaigns?tagId=${e}`);
          }}
          value={String(filterValues.tag)}
        >
          <SelectTrigger className='w-full sm:basis-96'>
            <SelectValue
              defaultValue={filterValues.tag}
              placeholder='Filter by campaign type'
            />
          </SelectTrigger>
          <SelectContent>
            {[
              {
                id: 1,
                name: 'Arts and Culture',
              },
              {
                id: 2,
                name: 'Business and Entrepreneurship',
              },
              {
                id: 3,
                name: 'Community and Social Impact',
              },
              {
                id: 4,
                name: 'Education and Learning',
              },
              {
                id: 5,
                name: 'Entertainment and Media',
              },
              {
                id: 6,
                name: 'Environment and Sustainability',
              },
              {
                id: 7,
                name: 'Health and Wellness',
              },
              {
                id: 8,
                name: 'Lifestyle and Hobbies',
              },
              {
                id: 9,
                name: 'Others',
              },
              {
                id: 10,
                name: 'Science and Research',
              },
              {
                id: 11,
                name: 'Technology and Innovation',
              },
            ].map(({ id, name }) => (
              <SelectItem value={String(id)} key={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            filterCampaigns(initialCampaigns);
            setFilterValues({ tag: undefined, searchTerm: '' });
            // fetchCampaigns();
            setCampaignsFiltered(false);
          }}
          // disabled={!campaignsFiltered}
          variant='outline'
          className={cn(
            'flex items-center gap-1 disabled:pointer-events-auto  lg:ml-auto',
            campaignsFiltered && 'hover:text-red-500'
          )}
        >
          Clear Filters
          <X size={16} />
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredCampaigns.map((i) => (
          <CampaignCard key={i.id} campaign={i} />
        ))}

        <div className='sm:col-span-2 lg:col-span-3'>
          {!campaignsFiltered && campaigns.length !== totalCampaigns ? (
            <div
              ref={ref}
              className='mx-auto mt-8 h-10 w-10 animate-spin rounded-full border-2 border-primary-dark border-t-transparent p-4'
            ></div>
          ) : campaignsFiltered && filteredCampaigns.length === 0 ? (
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
            <p className='mt-4 py-4 text-center text-slate-500'>
              - End of campaigns -
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
