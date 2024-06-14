// 'use client';
// import { getCampaigns } from '@/lib/queries';
import 'react-multi-carousel/lib/styles.css';
import CampaignsCarousel from './CampaignsCarousel';
// import useSWR from 'swr';

// const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CampaignsByTag({ tag }: { tag: string }) {
  // const { campaigns } = await getCampaigns({ page: 1, tag });
  // const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  // const { data: campaigns, isLoading } = useSWR(
  //   `${apiBaseUrl}/api/notifications?tags=${tag}`,
  //   fetcher
  // );

  // if(isLoading) return <div>loading...</div>

  return <CampaignsCarousel tag={tag} />;
}
