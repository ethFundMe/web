export type CampaignFormFields = {
  title: string;
  description: string;
  goal: number;
  fees: number;
  campaignType: 'personal' | 'others';
  links: Array<string>;
  beneficiary: `0x${string}`;
};

export type DonateFormProps = {
  campaignID?: string;
  amount?: number;
};
