export interface Funding {
  id: number;
  campaign_id: string;
  funder: `0x${string}`;
  amount: number;
  amt_after_fees: number;
  creator_funded: boolean;
  created_at: string;
}

export interface SimpleCampaign {
  id: string;
  campaign_id: number;
  beneficiary: `0x${string}`;
  creator: `0x${string}`;
  date_created: string;
  description: string;
  flagged: boolean;
  goal: number;
  is_closed: boolean;
  media_links: string[];
  title: string;
  total_accrued: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  ethAddress: `0x${string}`;
  fullName: string;
  email: string;
  bio: string | null;
  role: 'beneficiary' | 'creator' | 'admin';
  isBanned: boolean;
  isVerified: boolean;
  creatorFee: number;
  profileUrl: string | null;
  bannerUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  campaigns: SimpleCampaign[];
  fundings: Funding[];
}
