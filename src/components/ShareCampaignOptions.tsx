import { Campaign } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ShareCampaignOptions({
  campaign,
}: {
  campaign: Campaign;
}) {
  const shareLinks = {
    whatsapp:
      'https://wa.me/?text=' +
      encodeURI(
        `Help Make a Difference! \n\nDonate to '${campaign.title}' and make an impact. \n\nCheck out the full details of the campaign at \n${process.env.NEXT_PUBLIC_WEB_URL}/campaigns/${campaign.campaign_id}\n\nEthFundMe`
      ),
    twitter:
      'https://twitter.com/intent/tweet?text=' +
      encodeURI(
        `Help Make a Difference! \n\nDonate to '${campaign.title}' and make an impact. \n\nCheck out the full details of the campaign at \n${process.env.NEXT_PUBLIC_WEB_URL}/campaigns/${campaign.campaign_id}\n\n@EthFundMe`
      ),
    email: `mailto:${
      process.env.NEXT_PUBLIC_EFM_EMAIL
    }/?subject=Make a Difference&body=${encodeURI(
      'Hi there,\n\nI hope this message finds you well. I wanted to reach out to you and share my EthFundMe campaign, "' +
        campaign.title +
        '". \nYour support would mean the world to me. \n\nYou can find more details and contribute through the following link: ' +
        process.env.NEXT_PUBLIC_WEB_URL +
        '/campaigns/' +
        campaign.campaign_id +
        '\n\nThank you in advance for your generosity!\n\nBest regards, \n'
    )}`,
  };

  const options = [
    {
      image: '/images/whatsapp-icon.webp',
      cta: 'Share on Whatsapp',
      link: shareLinks.whatsapp,
    },
    {
      image: '/images/x-logo.webp',
      cta: 'Post on X/Twitter',
      link: shareLinks.twitter,
    },
    {
      image: '/images/email-icon.webp',
      cta: 'Email campaign',
      link: shareLinks.email,
    },
  ];
  return (
    <div className='mt-4 grid grid-cols-3 gap-4'>
      {options.map(({ link, cta, image }) => (
        <OptionCard key={cta} link={link}>
          <Image src={image} width={40} height={40} priority alt='whatsapp' />
          <p className='text-center text-xs md:text-sm'>{cta}</p>
        </OptionCard>
      ))}
    </div>
  );
}

type CardProps = React.ComponentProps<'a'> & { link: string };

function OptionCard({ children, link }: CardProps) {
  return (
    <Link
      href={link}
      target='_blank'
      rel='noreferrer'
      className='flex flex-col items-center gap-2 rounded-md border border-transparent  bg-gray-50 p-4 hover:border-gray-300 hover:bg-gray-100'
    >
      {children}
    </Link>
  );
}
