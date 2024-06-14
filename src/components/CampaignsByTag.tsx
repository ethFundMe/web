'use client';
// import { getCampaigns } from '@/lib/queries';
import { Campaign } from '@/types';
import 'react-multi-carousel/lib/styles.css';
// import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import CampaignsCarousel from './CampaignsCarousel';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Meta {
  limit: number;
  page: number;
  totalCampaigns: number;
  totalPages: number;
}

export default function CampaignsByTag({ tag }: { tag: string }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  const getKey = (pageIndex: number, previousPageData: Campaign[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${apiBaseUrl}/api/campaigns?tag=${tag}&page=${pageIndex}&limit=10`; // SWR key
  };
  const { data, size, setSize, isLoading } = useSWRInfinite<{
    campaigns: Campaign[];
    meta: Meta;
  }>(getKey, fetcher);
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  const campaigns = data?.flatMap((item) => item.campaigns) as Campaign[];
  const isLoadingMore = size > 0 && typeof data?.[size - 1] === 'undefined';
  return (
    campaigns?.length > 0 && (
      <CampaignsCarousel
        campaigns={campaigns}
        tag={tag}
        isLoadingMore={isLoadingMore}
        // size={size}
        setSize={setSize}
      />
    )
  );
}
