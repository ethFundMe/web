export interface Funding {
  id: string;
  campaign_id: string;
  funder: `0x${string}`;
  amount: number;
  amt_after_fees: number;
  creator_funded: boolean;
  created_at: Date;
}
