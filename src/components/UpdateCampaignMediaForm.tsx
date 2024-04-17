'use client';

import { Campaign } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

export default function UpdateCampaignMediaForm({
  campaign,
}: {
  campaign: Campaign;
}) {
  // const preparedImages = campaign.metadata.media_links
  //   .filter((_, idx) => idx !== 0)
  //   .filter((image) => !REGEX_CODES.ytLink.test(image));

  // const {
  //   metadata: { description, title },
  //   goal,
  //   campaign_id,
  //   beneficiary: beneficiaryAddress,
  // } = campaign;

  // const { refresh } = useRouter();

  // const handleDelete = (url: string) => {
  //   console.log({ url });

  //   const newMediaLinks = campaign.metadata.media_links.filter(
  //     (src) => src !== url
  //   );

  //   return handleWriteContract(newMediaLinks);
  // };

  // const handleUpload = (res: string[]) => {
  //   const lastItem =
  //     campaign.metadata.media_links[campaign.metadata.media_links.length - 1];
  //   const ytLink = REGEX_CODES.ytLink.test(lastItem);

  //   const newMediaLinks = ytLink
  //     ? [campaign.metadata.banner_url, ...preparedImages, ...res, lastItem]
  //     : [campaign.metadata.banner_url, ...preparedImages, ...res];

  //   return handleWriteContract(newMediaLinks);
  // };

  // const handleBannerUpload = (url: string[]) => {
  //   const newMediaLinks = campaign.metadata.media_links.map((item, idx) =>
  //     idx === 0 ? url[0] : item
  //   );
  //   return handleWriteContract(newMediaLinks);
  // };

  // const uploadsRemaining = 6 - preparedImages.length;

  return (
    <div className='space-y-4'>
      <div className='mx-auto w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'>
        <Image
          width={400}
          height={400}
          src={campaign.metadata.banner_url}
          alt='campaign-banner'
        />
        <Input type='file' accept='image/*' />
      </div>

      <div className='mx-auto w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'>
        {campaign.metadata.media_links.length > 0 && (
          <>
            <ScrollArea className='max-h-40'>
              <div className='grid grid-cols-3 gap-2'>
                <AnimatePresence>
                  {campaign.metadata.media_links.map((item, idx) => (
                    <motion.div
                      animate={{
                        scale: ['0%', '100%'],
                      }}
                      transition={{ type: 'spring', damping: 20 }}
                      exit={{ scale: 0 }}
                      key={idx}
                      className='relative'
                    >
                      <Image
                        className='h-16 w-full object-cover lg:h-20'
                        // src={createUrl(item as File)}
                        src={item}
                        width={300}
                        height={300}
                        alt='image-preview'
                      />

                      {/* <div
                              title='Remove image'
                              onClick={() => {
                                setOtherImgsPrepared((prev) => {
                                  return prev
                                    ? prev.filter(
                                        (item) =>
                                          item !== otherImgsPrepared[idx]
                                      )
                                    : null;
                                });
                              }}
                              className='absolute left-0 top-0 grid h-full w-full cursor-pointer place-content-center bg-black/50 opacity-0 transition-all duration-150 ease-in-out hover:opacity-100'
                            >
                              <FaMinusCircle color='tomato' />
                            </div> */}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
