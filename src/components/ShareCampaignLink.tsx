import { Campaign } from '@/types';
import { LinkPreviewCmp } from './LinkPreview';
import { ShareCampaignLinkBox } from './ShareCampaignLinkBox';
import ShareCampaignOptions from './ShareCampaignOptions';

export const ShareCampaignLink = ({
  link,
  campaign,
}: {
  link: string;
  campaign: Campaign;
}) => {
  return (
    <div className='space-y-4'>
      <LinkPreviewCmp
        params={{
          title: campaign.metadata.title,
          image: campaign.metadata.banner_url,
          description: campaign.metadata.description,
        }}
      />
      <ShareCampaignLinkBox link={link} />

      <ShareCampaignOptions campaign={campaign} />
    </div>
  );
};

// https://wa.me/?text=I'm%20inquiring%20about%20the%20apartment%20listing
