import { ReactElement } from 'react';

export type NavbarRoute = {
  title: string;
  link: string;
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
