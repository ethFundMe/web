import { HomepageHeader } from '@/components/HomepageHeader';
import { CampaignTypeSection } from '@/components/sections/CampaignTypeSection';
import { FaqsSection } from '@/components/sections/FaqsSection';

export default function Home() {
  return (
    <>
      <HomepageHeader />
      <CampaignTypeSection />
      <FaqsSection />
    </>
  );
}
