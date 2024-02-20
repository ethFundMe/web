import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CampaignsTable {
  id: Generated<string>; // uuid
  campaign_id: number;
  // user_id: number;
  beneficiary: string;
  creator: string;
  date_created: number;
  description: string;
  flagged: boolean;
  goal: number;
  is_closed: boolean;
  media_links: Array<string>;
  title: string;
  total_accrued: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface UserTable {
  id: Generated<string>;
  ethAddress: string;
  fullName: string;
  email: string;
  role: string;
  isBanned: boolean;
  isVerified: boolean;
  profileUrl: string;
  creatorFee: number;
  bannerUrl: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export type Campaign = Selectable<CampaignsTable>;
export type NewCampaign = Insertable<CampaignsTable>;
export type CampaignUpdate = Updateable<CampaignsTable>;
