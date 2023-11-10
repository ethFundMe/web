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
