import { Campaign } from '@/types';

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
  campaign: Campaign;
  amount?: number;
  customClose?: React.ReactNode;
};
