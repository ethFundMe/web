import { CampaignCategory } from '@/components/types';
import {
  BiDonateHeart,
  BiLogoDiscordAlt,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoTwitter,
} from 'react-icons/bi';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { MdOutlineCampaign } from 'react-icons/md';
import { CampaignType, DonationStep, NavbarRoute, SocialLink } from './types';

export const NAVBARROUTES: NavbarRoute[] = [
  {
    title: 'Campaigns',
    link: '/campaigns',
    icon: MdOutlineCampaign({ size: 20 }),
  },
  {
    title: 'How to Donate',
    link: '/how-to-donate',
    icon: FaRegQuestionCircle({ size: 20, strokeWidth: 0.5 }),
  },
  {
    title: 'Create Campaign',
    link: '/campaigns/create',
    icon: BiDonateHeart({ size: 20 }),
  },
];

export const CAMPAIGNCATEGORIES: CampaignCategory[] = [
  {
    image: '/images/accident.webp',
    description:
      // 'When life takes an unexpected turn, heroes emerge. Your support can help those affected by accidents get back on their feet, whether it is covering medical bills, rehab, or just lending a hand in their journey to recovery.',
      'Your support can help those affected by accidents get back on their feet, whether it is covering medical bills, rehab, or just lending a hand in their journey to recovery.',
    type: 'accident',
  },
  {
    image: '/images/natural-disaster.jpg',
    description:
      // 'Natures fury knows no bounds, but neither does human compassion. Contribute to our natural disaster relief campaigns and be a ray of hope for communities struck by adversity. Your support rebuilds lives and homes.',
      'Contribute to our natural disaster relief campaigns and be a ray of hope for communities struck by adversity. Your support rebuilds lives and homes.',

    type: 'natural disaster',
  },
  {
    image: '/images/humanitarian.jpg',
    description:
      // 'Compassion has no borders. Our humanitarian campaigns are the heart and soul of generosity. They provide aid to those facing crises worldwide, ensuring that kindness and assistance reach the corners of the earth.',
      'Our humanitarian campaigns are the heart and soul of generosity. They provide aid to those facing crises worldwide, ensuring that kindness and assistance reach the corners of the earth.',
    type: 'humanitarian',
  },
  {
    image: '/images/emergency.jpg',
    description:
      // 'Urgent situations require immediate help. Your contributions to emergency campaigns can be a lifeline for those facing unexpected crises. Be the hero who steps up in times of dire need.',
      'Your contributions to emergency campaigns can be a lifeline for those facing unexpected crises. Be the hero who steps up in times of dire need.',
    type: 'emergency',
  },
  {
    image: '/images/family.jpg',
    description:
      // 'Families are the pillars of society, but sometimes they need a little extra support. Help parents, children, and caregivers facing financial hardships or other challenges. Every contribution strengthens the bonds of family.',
      'Help parents, children, and caregivers facing financial hardships or other challenges. Every contribution strengthens the bonds of family.',
    type: 'family',
  },
  {
    image: '/images/medical.jpg',
    description:
      // 'Good health is priceless, but medical expenses can be overwhelming. Support medical campaigns to provide relief to individuals and families burdened by healthcare costs. Your generosity can make recovery possible.',
      'Support medical campaigns to provide relief to individuals and families burdened by healthcare costs. Your generosity can make recovery possible.',
    type: 'medical',
  },
  {
    image: '/images/family.jpg',
    description:
      // 'Families are the pillars of society, but sometimes they need a little extra support. Help parents, children, and caregivers facing financial hardships or other challenges. Every contribution strengthens the bonds of family.',
      'Help parents, children, and caregivers facing financial hardships or other challenges. Every contribution strengthens the bonds of family.',
    type: 'family',
  },
  {
    image: '/images/medical.jpg',
    description:
      // 'Good health is priceless, but medical expenses can be overwhelming. Support medical campaigns to provide relief to individuals and families burdened by healthcare costs. Your generosity can make recovery possible.',
      'Support medical campaigns to provide relief to individuals and families burdened by healthcare costs. Your generosity can make recovery possible.',
    type: 'medical',
  },
];

export const DONATIONSTEPS: DonationStep[] = [
  {
    subtitle: 'Step 1',
    title: 'Find campaign',
    description:
      'Discover a cause that resonates with you. Browse through a variety of campaigns, from helping accident victims to supporting humanitarian efforts. Find a campaign that touches your heart and aligns with your values',
  },
  {
    subtitle: 'Step 2',
    title: 'Connect wallet',
    description:
      'Secure your digital wallet for seamless contributions. Link your wallet to your account on our platform to ensure safe and transparent transactions. It is your key to making a difference',
  },
  {
    subtitle: 'Step 3',
    title: 'Authorize payment',
    description:
      'With your wallet connected, it is time to give. Authorize your payment securely and effortlessly. Your support will empower individuals, families, and communities in need. It is a simple click to change lives',
  },
];

export const CAMPAIGNTYPES: CampaignType[] = [
  {
    image: '/images/Personal finance-bro.svg',
    title: 'Yourself',
    description:
      'Share your dreams, challenges, aspirations and hurdles with personal campaigns and rally community support for your journey.',
    link: '/campaigns/create?campaign-type=personal',
  },
  {
    image: '/images/Creative team-pana.svg',
    title: 'Others',
    description:
      'Support others on their journey with campaigns for friends, family, or strangers facing challenges,  directly impacting the lives of others.',
    link: '/campaigns/create?campaign-type=others',
  },
];

export const FAQS = [
  {
    question: 'How to do some action?',
    answer:
      'With your wallet connected, it is time to give. Authorize your payment securely and effortlessly. Your support will empower individuals, families, and communities in need. It is a simple click to change lives',
  },
  {
    question: 'Is this allowed on EFM?',
    answer:
      'With your wallet connected, it is time to give. Authorize your payment securely and effortlessly. Your support will empower individuals, families, and communities in need. It is a simple click to change lives',
  },
  {
    question: 'More queries?',
    answer:
      'With your wallet connected, it is time to give. Authorize your payment securely and effortlessly. Your support will empower individuals, families, and communities in need. It is a simple click to change lives',
  },
  {
    question: 'Do you have customer support?',
    answer:
      'With your wallet connected, it is time to give. Authorize your payment securely and effortlessly. Your support will empower individuals, families, and communities in need. It is a simple click to change lives',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Github',
    href: 'https://github.com/ethfundme',
    icon: BiLogoGithub({ size: 20 }),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/ethfundme',
    icon: BiLogoTwitter({ size: 20 }),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/ethfundme',
    icon: BiLogoInstagram({ size: 20 }),
  },
  {
    name: 'Discord',
    href: 'https://twitter.com/ethfundme',
    icon: BiLogoDiscordAlt({ size: 20 }),
  },
];

export const REGEX_CODES = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  intlPhoneNumber:
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
  link: /(?:https?|ftp):\/\/\S+/gi,
  walletAddress: /^0x/,
  ytLink:
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
};

export const CAROUSEL_IMAGES = [
  'https://picsum.photos/id/123/700',
  'https://picsum.photos/id/132/700',
  'https://picsum.photos/id/13/700',
  'https://picsum.photos/id/113/700',
];
