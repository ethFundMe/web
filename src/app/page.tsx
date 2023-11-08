import { HomepageHeader } from '@/components/HomepageHeader';
import { CampaignCategorySection } from '@/components/sections/CampaignCategorySection';

export default function Home() {
  return (
    <div>
      <HomepageHeader />

      <CampaignCategorySection />

      <div className='py-96'></div>
    </div>
  );
}
