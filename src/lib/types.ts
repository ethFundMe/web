import { User } from '@/types';
import { ReactElement } from 'react';

export type NavbarRoute = {
  title: string;
  link: string;
  icon?: React.ReactNode;
};

export type DonationStep = {
  title: string;
  subtitle: string;
  description: string;
};

export type Notification = {
  eth_address: string;
  description: string;
  notification_type:
    | 'FUNDED'
    | 'FUNDER'
    | 'COMMENT'
    | 'TOKEN REWARDS'
    | 'CAMPAIGN CREATED'
    | 'CREATOR FEE UPDATED'
    | 'CAMPAIGN UPDATED';
  url: string;
  id?: string | undefined;
  created_at?: Date | null | undefined;
  updated_at?: Date | undefined;
  hash?: string | undefined;
  viewed?: boolean | undefined;
};

export type CampaignType = {
  image: string;
  title: 'Yourself' | 'Others';
  description: string;
  link: string;
  ctaBtnText: string;
};

export type Campaign = {
  id: string;
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
  created_at: Date;
  updated_at: Date;
  // fundings: Array<FundingsTable>
  user: User;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: ReactElement;
};

export enum CampaignTags {
  'Technology and Innovation' = 'Technology and Innovation',
  'Arts and Culture' = 'Arts and Culture',
  'Business and Entrepreneurship' = 'Business and Entrepreneurship',
  'Community and Social Impact' = 'Community and Social Impact',
  'Education and Learning' = 'Education and Learning',
  'Health and Wellness' = 'Health and Wellness',
  'Environment and Sustainability' = 'Environment and Sustainability',
  'Entertainment and Media' = 'Entertainment and Media',
  'Lifestyle and Hobbies' = 'Lifestyle and Hobbies',
  'Science and Research' = 'Science and Research',
  'Others' = 'Others',
}

export type Comment = {
  amount: number;
  campaign_id: string;
  comment: string;
  created_at: Date;
  transaction_hash: `0x${string}`;
  id: number;
  user: {
    ethAddress: `0x${string}`;
    fullName: string;
    id: string;
    profileUrl?: string;
  };
};

export type Donation = {
  amount: number;
  created_at: Date;
  transaction_hash: string;
  donor: `0x${string}`;
};

export type DonationResponse = SocketResponse<Donation[]>;

export type SocketResponse<T> = {
  status: 'OK' | 'ERROR';
  data?: T;
  error?: Error;
};

export type FeaturedCampaign = {
  creator_name: string;
  campaign_description: string;
  campaign_title: string;
  campaign_id: number;
  campaign_banner: string;
  campaign_mediaLinks: string[];
  campaign_tag: string;
  campaign_goal: number;
  total_accrued: number;
  campaign_creator: `0x${string}`;
  campaign_beneficiary: `0x${string}`;
};
