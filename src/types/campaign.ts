import { Funding } from './funding';
import { User } from './user';

export interface Campaign {
  id: string;
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
  created_at: Date;
  updated_at: Date;
  fundings: Array<Funding>;
  user: User;
}
