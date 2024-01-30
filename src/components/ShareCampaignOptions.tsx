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
        '\n\nThank you in advance for your generosity!\n\nBest regards, \n' +
        campaign.user.fullName
    )}`,
  };
  return (
    <div className='mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3'>
      <OptionCard link={shareLinks.whatsapp}>
        <Image
          src='/images/whatsapp-logo.png'
          width={40}
          height={40}
          priority
          alt='whatsapp'
        />
        <p className='text-center text-xs md:text-sm'>Share on Whatsapp</p>
      </OptionCard>
      <OptionCard link={shareLinks.email}>
        <Image
          src='/images/email.png'
          width={40}
          height={40}
          priority
          alt='email'
        />
        <p className='text-center text-xs md:text-sm'>Email campaign</p>
      </OptionCard>
      <OptionCard link={shareLinks.twitter}>
        <Image
          src='/images/x-logo.webp'
          width={40}
          height={40}
          priority
          alt='whatsapp'
        />
        <p className='text-center text-xs md:text-sm'>Post on X/Twitter</p>
      </OptionCard>
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
