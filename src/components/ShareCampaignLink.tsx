import { TextSizeStyles } from '@/lib/styles';
// import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { LinkPreview } from './LinkPreview';
import { ShareCampaignLinkBox } from './ShareCampaignLinkBox';

export const ShareCampaignLink = ({ link }: { link: string }) => {
  return (
    <div className='space-y-3'>
      <h2 className={TextSizeStyles.h4}>Share link</h2>

      <LinkPreview url={link} />
      <ShareCampaignLinkBox link={link} />
    </div>
  );
};
