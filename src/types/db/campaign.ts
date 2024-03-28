import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface FundingsTable {
  id: Generated<string>;
  campaign_id: string;
  funder: `0x${string}`;
  amount: number;
  amt_after_fees: number;
  creator_funded: boolean;
  created_at: Generated<Date>;
}

export interface CampaignsTable {
  id: Generated<string>;
  campaign_id: number;
  beneficiary: `0x${string}`;
  creator: `0x${string}`;
  date_created: number;
  description: string;
  flagged: boolean;
  goal: number;
  discontinued: boolean;
  banner_url: string;
  media_links: Array<string>;
  title: string;
  total_accrued: number;
  youtube_link: string | null;
  uri: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  fundings: Array<FundingsTable>;
  user: UserTable;
}

export interface UserTable {
  id: Generated<string>;
  ethAddress: string;
  fullName: string;
  email: string;
  role: 'beneficiary' | 'creator' | 'admin';
  isBanned: boolean;
  isVerified: boolean;
  creatorFee: number;
  profileUrl: string;
  bannerUrl: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export type Campaign = Selectable<CampaignsTable>;
export type NewCampaign = Insertable<CampaignsTable>;
export type CampaignUpdate = Updateable<CampaignsTable>;
