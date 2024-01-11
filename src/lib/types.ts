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

export type CampaignType = {
  image: string;
  title: 'Yourself' | 'Others';
  description: string;
  link: string;
};

export type Campaign = {
  campaign_id: number;
  beneficiary: string;
  creator: string;
  date_created: number;
  description: string;
  flagged: boolean;
  goal: number;
  is_closed: boolean;
  links: string[];
  title: string;
  total_accrued: number;
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
