import { getCampaigns } from '@/lib/queries';
import 'react-multi-carousel/lib/styles.css';
import CampaignsCarousel from './CampaignsCarousel';

export default async function CampaignsByTag({ tag }: { tag: string }) {
  const { campaigns, totalCampaigns } = await getCampaigns({ page: 1, tag });

  return (
    campaigns.length > 0 && (
      <CampaignsCarousel
        campaigns={campaigns}
        totalCampaigns={totalCampaigns}
        tag={tag}
      />
    )
  );
}
