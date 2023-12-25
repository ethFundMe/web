import { AboutSection } from '@/components/AboutSection';
import { FeaturedCampaignsSection } from '@/components/FeaturedCampaignsSection';
import { HomepageHeader } from '@/components/HomepageHeader';
import { CampaignTypeSection } from '@/components/sections/CampaignTypeSection';
import { FaqsSection } from '@/components/sections/FaqsSection';

export default function Home() {
  return (
    <>
      <HomepageHeader />
      <AboutSection />
      <FeaturedCampaignsSection />
      <CampaignTypeSection />
      <FaqsSection />
    </>
  );
}
