import { Campaign, SimpleCampaign } from '@/types';

export type DonateFormProps = {
  campaign: Campaign | SimpleCampaign;
  amount?: number;
  customClose?: React.ReactNode;
};
