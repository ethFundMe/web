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
  flagged: boolean;
  goal: number;
  discontinued: boolean;
  total_accrued: number;
  transaction_hash: `0x${string}`;
  md_hash: string;
  title: string;
  description: string;
  banner_url: string;
  youtube_link: string | null;
  media_links: Array<string>;
  tag: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  fundings: Array<FundingsTable>;
  user: UserTable;
}

// export interface CampaignTag {
//   id: number;
//   name: CampaignTags;
// }

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
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
  registered: boolean;
}

export interface UserEarning {
  id: string;
  creator: {
    ethAddress: `0x${string}`;
    id: string;
    fullName: string;
    profileUrl: string;
  };
  amount: string;
  rewardType: 'campaign_creation' | 'funding';
  auto: boolean;
  transaction_hash: `0x${string}`;
  created_at: string;
}

export type Campaign = Selectable<CampaignsTable>;
export type NewCampaign = Insertable<CampaignsTable>;
export type CampaignUpdate = Updateable<CampaignsTable>;
