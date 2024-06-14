'use client';
// import { getCampaigns } from '@/lib/queries';
import { Campaign } from '@/types';
import 'react-multi-carousel/lib/styles.css';
import useSWR from 'swr';
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
  const { data, isLoading } = useSWR<{ campaigns: Campaign[]; meta: Meta }>(
    `${apiBaseUrl}/api/campaigns?tag=${tag}`,
    fetcher
  );
  if (isLoading) return <div>loading...</div>;

  const campaigns = data?.campaigns as Campaign[];

  return (
    campaigns?.length > 0 && (
      <CampaignsCarousel campaigns={campaigns} tag={tag} />
    )
  );
}
