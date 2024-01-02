import { Campaign } from '@/types';
import { LinkPreviewCmp } from './LinkPreview';
import { ShareCampaignLinkBox } from './ShareCampaignLinkBox';

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
          title: campaign.title,
          image: campaign.media_links[0],
          description: campaign.description,
        }}
      />
      <ShareCampaignLinkBox link={link} />
    </div>
  );
};
