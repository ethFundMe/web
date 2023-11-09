export type CreateCampaignFormFields = {
  title: string;
  description: string;
  goal: string;
};

export type DonateFormProps = {
  campaignID?: string;
  amount?: number;
};
