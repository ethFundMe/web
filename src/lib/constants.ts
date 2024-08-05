import {
  BiLogoDiscordAlt,
  BiLogoGithub,
  BiLogoInstagram,
} from 'react-icons/bi';
import { BsTwitterX } from 'react-icons/bs';
import { CiSquarePlus } from 'react-icons/ci';
import { MdOutlineCampaign } from 'react-icons/md';
import { CampaignTags, CampaignType, NavbarRoute, SocialLink } from './types';

export const NAVBARROUTES: NavbarRoute[] = [
  {
    title: 'Campaigns',
    link: '/campaigns',
    icon: MdOutlineCampaign({ size: 25 }),
  },
  {
    title: 'Create Campaign',
    link: '/campaigns/create',
    icon: CiSquarePlus({ size: 20, strokeWidth: 1.2 }),
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
    question: 'What is EthFundMe?',
    answer:
      'EthFundMe is a blockchain-based crowdfunding platform that leverages the power of Ethereum technology to enable users to support and fund projects or causes they believe in. Our platform provides a transparent, secure, and efficient way for project creators and supporters to connect and contribute to the realization of innovative ideas and impactful initiatives, families, and communities in need. It is a simple click to change lives',
  },
  {
    question: 'How does EthFundMe work?',
    answer:
      'Users can create campaigns for their projects by detailing their goals, the amount needed, and how the funds will be used. Supporters can browse these projects and contribute Ethereum (ETH) directly through our platform. EthFundMe utilizes smart contracts to manage transactions securely, ensuring transparency and trust throughout the funding process.',
  },
  {
    question: 'Is there a fee to use EthFundMe?',
    answer:
      'EthFundMe charges a minimal platform fee on successfully funded projects to cover operational costs.',
  },
  {
    question: 'How secure is EthFundMe?',
    answer:
      'Security is our top priority. EthFundMe utilizes Ethereum blockchain technology, known for its security and immutability. All transactions are conducted through smart contracts, ensuring that funds are only released according to the terms set by the campaign. We also implement best practices in data security to protect the  information of our users.',
  },
  {
    question: 'Do I get any rewards from using the platform?',
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
  username: /^[A-Za-z0-9_]$/,
  ytLink:
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  emoji:
    /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{200D}]|[\u{20E3}]|[\u{0023}-\u{0039}]\u{FE0F}?|\u{1F3FB}-\u{1F3FF})/gu,
  livepeerId: /^[a-zA-Z0-9]{16}$/,
};

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
