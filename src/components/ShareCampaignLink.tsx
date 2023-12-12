import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { LinkPreview } from './LinkPreview';
import { ShareCampaignLinkBox } from './ShareCampaignLinkBox';

export const ShareCampaignLink = ({ link }: { link: string }) => {
  return (
    <div className='space-y-4 p-2'>
      <h2 className={cn(TextSizeStyles.h6, 'text-neutral-600')}>Share link</h2>
      <LinkPreview url={link} />
      <ShareCampaignLinkBox link={link} />
    </div>
  );
};
