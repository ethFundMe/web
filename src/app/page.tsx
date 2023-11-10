import { HomepageHeader } from '@/components/HomepageHeader';
import { CampaignCategorySection } from '@/components/sections/CampaignCategorySection';
import { CampaignTypeSection } from '@/components/sections/CampaignTypeSection';

export default function Home() {
  return (
    <div>
      <HomepageHeader />

      <CampaignCategorySection />
      <CampaignTypeSection />
    </div>
  );
}
