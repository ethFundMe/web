import { Campaign, SimpleCampaign } from '@/types';

export type CampaignFormFields = {
  title: string;
  description: string;
  goal: number;
  campaignType: 'personal' | 'others';
  links: Array<string>;
  beneficiary: `0x${string}`;
  fees?: number;
};

export type DonateFormProps = {
  campaign: Campaign | SimpleCampaign;
  amount?: number;
  customClose?: React.ReactNode;
};
