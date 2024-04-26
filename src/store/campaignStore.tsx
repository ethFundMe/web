import { getCampaigns } from '@/actions';
import { Campaign } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CampaignStoreType = {
  campaigns: Campaign[];
  totalCampaigns: number;
  fetchCampaigns: () => void;
  filteredCampaigns: Campaign[];
  updateCampaigns: (campaigns: Campaign[]) => void;
  filterCampaigns: (campaigns: Campaign[]) => void;
};

export const campaignStore = create<CampaignStoreType>()(
  persist(
    (set) => ({
      totalCampaigns: 0,
      campaigns: [],
      fetchCampaigns: async () => {
        const { campaigns, totalCampaigns } = await getCampaigns({});
        set({ campaigns, totalCampaigns });
      },
      filteredCampaigns: [],
      updateCampaigns: (campaigns) => set({ campaigns }),
      filterCampaigns: (filteredCampaigns) => set({ filteredCampaigns }),
    }),
    { name: 'campaignsStore' }
  )
);
