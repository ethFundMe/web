import { CampaignCategory } from '@/components/types';
import {
  BiDonateHeart,
  BiLogoDiscordAlt,
  BiLogoGithub,
  BiLogoInstagram,
} from 'react-icons/bi';
import { BsTwitterX } from 'react-icons/bs';
import { MdOutlineCampaign } from 'react-icons/md';
import {
  CampaignTags,
  CampaignType,
  DonationStep,
  NavbarRoute,
  SocialLink,
} from './types';

export const NAVBARROUTES: NavbarRoute[] = [
  {
    title: 'Campaigns',
    link: '/campaigns',
    icon: MdOutlineCampaign({ size: 25 }),
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
    ctaBtnText: 'Launch My Campaign',
  },
  {
    image: '/images/Creative team-pana.svg',
    title: 'Others',
    description:
      'Support others on their journey with campaigns for friends, family, or strangers facing challenges,  directly impacting the lives of others.',
    link: '/campaigns/create?campaign-type=others',
    ctaBtnText: 'Start Support Campaign',
  },
];

export const FAQS = [
  {
    question: '❓ What is EthFundMe',
    answer:
      'EthFundMe is a blockchain-based crowdfunding platform that leverages the power of Ethereum technology to enable users to support and fund projects or causes they believe in. Our platform provides a transparent, secure, and efficient way for project creators and supporters to connect and contribute to the realization of innovative ideas and impactful initiatives, families, and communities in need. It is a simple click to change lives',
  },
  {
    question: '🏋️ How does EthFundMe work?',
    answer:
      'Users can create campaigns for their projects by detailing their goals, the amount needed, and how the funds will be used. Supporters can browse these projects and contribute Ethereum (ETH) directly through our platform. EthFundMe utilizes smart contracts to manage transactions securely, ensuring transparency and trust throughout the funding process.',
  },
  {
    question: '💲 Is there a fee to use EthFundMe?',
    answer:
      'EthFundMe charges a minimal platform fee on successfully funded projects to cover operational costs.',
  },
  {
    question: '🔒 How secure is EthFundMe?',
    answer:
      'Security is our top priority. EthFundMe utilizes Ethereum blockchain technology, known for its security and immutability. All transactions are conducted through smart contracts, ensuring that funds are only released according to the terms set by the campaign. We also implement best practices in data security to protect the  information of our users.',
  },
  {
    question: '🎁 Do I get any rewards from using the platform?',
    answer:
      'Both campaign creators and contributors are rewarded with the $FUNDME tokens relative to their engagement levels. Moreover, users who contribute to maintaining our systems reliability to enhance operational efficiency also earn $FUNDME tokens.',
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
    icon: BsTwitterX({ size: 18 }),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/ethfund.me',
    icon: BiLogoInstagram({ size: 20 }),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/9kac2FFMWe',
    icon: BiLogoDiscordAlt({ size: 20 }),
  },
];

export const REGEX_CODES = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
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

export const COMMENTS = [
  {
    user: {
      fullname: 'John Smith',
    },
    date: '2024-02-26T18:52:42.185Z',
    // text: 'Thank you all for your incredible support! Every contribution means the world to us and brings us closer to our goal.',
    text: '',
    amt: 100000000000000000,
  },
  {
    user: {
      fullname: 'Emily Johnson',
    },
    date: '2024-02-26T19:30:00.000Z',
    text: 'I just donated what I could. Let us keep spreading the word and helping those in need!',
    amt: 5000000000000000,
  },
  {
    user: {
      fullname: 'David Rodriguez',
    },
    date: '2024-02-26T20:15:00.000Z',
    text: 'This campaign is truly inspiring. I am proud to be a part of this community that comes together to support each other.',
    // amt: 2500000000000000000,
    amt: 0,
  },
  {
    user: {
      fullname: 'Sarah Thompson',
    },
    date: '2024-02-26T21:00:00.000Z',
    text: 'It is heartwarming to see the impact we can make when we join forces. Let us keep the momentum going!',
    amt: 100000000000000000,
  },
  {
    user: {
      fullname: 'Michael Nguyen',
    },
    date: '2024-02-26T22:00:00.000Z',
    text: 'Small acts of kindness can create big changes. Proud to support this cause.',
    amt: 200000000000000000,
  },
];

export const TagsWithIds: { id: number; name: CampaignTags }[] = [
  {
    id: 1,
    name: CampaignTags['Arts and Culture'],
  },
  {
    id: 2,
    name: CampaignTags['Business and Entrepreneurship'],
  },
  {
    id: 3,
    name: CampaignTags['Community and Social Impact'],
  },
  {
    id: 4,
    name: CampaignTags['Education and Learning'],
  },
  {
    id: 5,
    name: CampaignTags['Entertainment and Media'],
  },
  {
    id: 6,
    name: CampaignTags['Environment and Sustainability'],
  },
  {
    id: 7,
    name: CampaignTags['Health and Wellness'],
  },
  {
    id: 8,
    name: CampaignTags['Lifestyle and Hobbies'],
  },
  {
    id: 9,
    name: CampaignTags['Others'],
  },
  {
    id: 10,
    name: CampaignTags['Science and Research'],
  },
  {
    id: 11,
    name: CampaignTags['Technology and Innovation'],
  },
];

export const ShortLabels: Record<string, string> = {
  'Created campaign': 'CC',
  'Funded campaign': 'FC',
  Validator: 'Diminish',
};
