export type CreateCampaignFormFields = {
  title: string;
  description: string;
  goal: number;
  fees: number;
  campaignType: 'personal' | 'others';
};

export type DonateFormProps = {
  campaignID?: string;
  amount?: number;
};
