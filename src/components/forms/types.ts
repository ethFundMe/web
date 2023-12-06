export type CreateCampaignFormFields = {
  title: string;
  description: string;
  goal: number;
  campaignType: 'personal' | 'others';
  fees?: number;
  beneficiaryAddress?: number;
};

export type DonateFormProps = {
  campaignID?: string;
  amount?: number;
};
