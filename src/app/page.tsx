import { AboutSection } from '@/components/AboutSection';
import { HomepageHeader } from '@/components/HomepageHeader';
import Navbar from '@/components/Navbar';
import { CampaignTypeSection } from '@/components/sections/CampaignTypeSection';
import { FaqsSection } from '@/components/sections/FaqsSection';

export default function Home() {
  return (
    <>
      <Navbar />

      <HomepageHeader />
      <AboutSection />
      {/* <CampaignCategorySection /> */}
      <CampaignTypeSection />

      <FaqsSection />
    </>
  );
}
