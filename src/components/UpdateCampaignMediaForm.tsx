'use client';

import { REGEX_CODES } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import { Campaign } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaMinusCircle } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

export default function UpdateCampaignMediaForm({
  campaign,
}: {
  campaign: Campaign;
}) {
  const [bannerPreview, setBannerPreview] = useState<null | string>(null);

  const [otherImgsPrepared, setOtherImgsPrepared] = useState<unknown[] | null>(
    null
  );

  const formSchema = z.object({
    camapaignBanner: z.any(),
    otherImages: z.any(),
    ytLink: z
      .string()
      .regex(REGEX_CODES.ytLink, { message: 'Enter a valid youtube link' })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      ytLink:
        campaign.media_links.filter((link) =>
          REGEX_CODES.ytLink.test(link)
        )[0] ?? '',
    },
  });

  function showImagePreview(
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'banner' | 'others'
  ) {
    const data = e.target.files;

    const handleBannerUpload = () => {
      if (data && data[0]) {
        setBannerPreview(createUrl(data[0]));
      } else {
        setBannerPreview(null);
      }
    };

    if (type === 'banner') {
      handleBannerUpload();
    }
  }

  useEffect(() => {
    if (campaign.media_links.length) {
      setBannerPreview(campaign.media_links[0]);
    }
    const otherMedia = campaign.media_links.slice(1);
    const mediaWithoutYTLink = otherMedia.filter(
      (media) => !REGEX_CODES.ytLink.test(media)
    );
    if (otherMedia.length) {
      setOtherImgsPrepared(mediaWithoutYTLink);
    }
  }, [campaign]);

  return (
    <Form {...form}>
      <form className='mx-auto w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'>
        <FormField
          name='camapaignBanner'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign banner</FormLabel>

              {bannerPreview && (
                <Image
                  className='h-auto max-h-96 w-full object-cover'
                  src={bannerPreview}
                  width={300}
                  height={300}
                  alt='banner-preview'
                />
              )}

              <FormControl>
                <Input
                  type='file'
                  onChange={(e) => {
                    showImagePreview(e, 'banner');
                    field.onChange(e.target.files);
                  }}
                  accept='image/*'
                  // {...bannerRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='otherImages'
          control={form.control}
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Other images</FormLabel>

              {otherImgsPrepared && otherImgsPrepared.length > 0 && (
                <>
                  <ScrollArea className='max-h-40'>
                    <div className='grid grid-cols-3 gap-2'>
                      <AnimatePresence>
                        <div className='hidden'>{field.name}</div>
                        {otherImgsPrepared.map((item, idx) => (
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
                              src={
                                typeof item === 'string'
                                  ? item
                                  : createUrl(item as File)
                              }
                              width={300}
                              height={300}
                              alt='image-preview'
                            />

                            <div
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
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </>
              )}

              <FormControl>
                <Input
                  type='file'
                  onChange={(e) => {
                    const itemss: FileList | null = e.target.files;

                    const getFiles = () => {
                      if (itemss) {
                        return [...Array.from(itemss).map((_) => _)].slice(
                          0,
                          otherImgsPrepared ? 6 - otherImgsPrepared.length : 6
                        );
                      }
                    };

                    const files = getFiles();

                    setOtherImgsPrepared((prev) => {
                      if (prev && prev.length > 6 && files && files.length) {
                        toast('Cannot upload more than 6 images');
                        return prev;
                      }
                      if (files && prev) return [...prev, ...files];
                      if (files && !prev) return files;
                      return prev;
                    });
                  }}
                  multiple
                  accept='image/*'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full'>Upload files</Button>

        {/* <div className='relative min-h-80'>
          <DnDUpload handleUpload={() => console.log('hi')} />
        </div> */}
      </form>
    </Form>
  );
}
