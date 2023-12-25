import { LinkPreview } from './LinkPreview';
import { ShareCampaignLinkBox } from './ShareCampaignLinkBox';

export const ShareCampaignLink = ({ link }: { link: string }) => {
  return (
    <div className='space-y-4'>
      <LinkPreview url={link} />
      <ShareCampaignLinkBox link={link} />
    </div>
  );
};
