'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES } from '@/lib/constants';
import { CampaignTags } from '@/lib/types';
import { GET_CREATE_CAMPAIGN_FORM_SCHEMA, createUrl } from '@/lib/utils';
import { Campaign } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';
import { formatEther, parseEther } from 'viem';
import { useAccount, useContractWrite } from 'wagmi';
import * as z from 'zod';
import { LinkPreview } from './LinkPreview';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export default function EditCampaignForm({ campaign }: { campaign: Campaign }) {
  const { address } = useAccount();

  useEffect(() => {
    if (!address) redirect('/');
  }, [address]);

  const [bannerPreview, setBannerPreview] = useState<null | string>(null);

  const [otherImgsPrepared, setOtherImgsPrepared] = useState<unknown[] | null>(
    null
  );

  const {
    error: updateCampaignError,
    isError: isUpdateCampaignError,
    isLoading: isLoadingUpdateCampaign,
    isSuccess: isUpdateCampaignSuccess,
    write: updateCampaign,
  } = useContractWrite({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    functionName: 'updateCampaign',
    chainId: ethChainId,
    onSettled(data, error) {
      console.log('Settled updateCampaign', { data, error });
    },
  });

  const formSchema = GET_CREATE_CAMPAIGN_FORM_SCHEMA();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      type: campaign.beneficiary === campaign.creator ? 'personal' : 'others',
      beneficiaryAddress: campaign.beneficiary,
      banner: campaign.media_links[0],
      description: campaign.description,
      title: campaign.title,
      goal: parseFloat(formatEther(BigInt(campaign.goal))),
      tag: CampaignTags['Arts and Culture'],
      ytLink:
        campaign.media_links.filter((link) =>
          REGEX_CODES.ytLink.test(link)
        )[0] ?? undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

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

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);
    const { description, goal, title, beneficiaryAddress } = data;
    const { campaign_id } = campaign;

    // validate and make sure there is a change before calling the func below

    return updateCampaign({
      args: [
        BigInt(campaign_id),
        title,
        description,
        parseEther(goal.toString()),
        [
          'https://images.unsplash.com/photo-1527788263495-3518a5c1c42d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVuZHJhaXNpbmd8ZW58MHx8MHx8fDA%3D',
        ],
        beneficiaryAddress as `0x${string}`,
      ],
    });
  };

  useEffect(() => {
    if (isUpdateCampaignError) {
      toast.error('Failed to update campaign');
      console.error(updateCampaignError);
    }

    if (isUpdateCampaignSuccess) {
      toast.success('Campaign updated');
    }
  }, [isUpdateCampaignError, isUpdateCampaignSuccess, updateCampaignError]);

  return (
    <Form {...form}>
      <form
        className='mx-auto mt-5 grid grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Campaign title</FormLabel>
              <FormControl>
                <Input placeholder='Enter campaign title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='title'
        />

        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Campaign type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Choose a campaign type'
                      defaultValue={form.getValues('type')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='personal'>Personal</SelectItem>
                    <SelectItem value='others'>For others</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='type'
        />

        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal (ETH)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step={0.00001}
                  defaultValue={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='goal'
        />

        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Campaign tag</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Choose a campaign tag' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CampaignTags).map(([key, value]) => (
                      <>
                        <SelectItem value={key}>{value}</SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='tag'
        />

        {form.watch('type') === 'others' && (
          <>
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiary address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='beneficiaryAddress'
            />

            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className='flex items-center gap-2 pb-2'>
                            <span>Creator fees (ETH)</span>
                            <AiOutlineExclamationCircle />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Visit your{' '}
                              <Link
                                className='italic text-primary-default'
                                href={`/dashboard/${address}/update-profile`}
                              >
                                dashboard
                              </Link>{' '}
                              if you wish to change your creator fee
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  </FormLabel>

                  <FormControl>
                    <Input
                      type='number'
                      step={0.00001}
                      disabled
                      // value={User.creatorFee}
                      value={0.02}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='creatorFee'
            />
          </>
        )}

        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Campaign description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Enter campaign description' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='banner'
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

        <div className='col-span-2 space-y-4'>
          {!!REGEX_CODES.ytLink.test(form.watch('ytLink') as string) && (
            <LinkPreview url={form.watch('ytLink') as string} />
          )}

          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link to Youtube video</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Paste youtube video link' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='ytLink'
          />
        </div>

        <Button
          type='submit'
          size='default'
          className='col-span-2 disabled:cursor-not-allowed'
        >
          {isLoadingUpdateCampaign ? 'Loading...' : 'Update campaign'}
        </Button>
      </form>
    </Form>
  );
}
