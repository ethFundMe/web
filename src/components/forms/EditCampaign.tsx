'use client';

import { handleIPFSPush } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES } from '@/lib/constants';
import { fetchCampaignTags } from '@/lib/queries';
import { CampaignTags } from '@/lib/types';
import {
  createUrl,
  deleteFromCloudinary,
  GET_EDIT_CAMPAIGN_FORM_SCHEMA,
  uploadToCloudinary,
} from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';
import useRefs from 'react-use-refs';
import { BaseError, formatEther, parseEther } from 'viem';
import { mainnet } from 'viem/chains';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { z } from 'zod';
import { DiscontinueCampaignBtn } from '../DiscontinueCampaignBtn';
// import { Input } from '../inputs';
import { useQueryClient } from '@tanstack/react-query';
import { LinkPreview } from '../LinkPreview';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const EditCampaignForm = ({ campaign }: { campaign: Campaign }) => {
  const [updating, setUpdating] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(campaign.banner_url);
  const [otherPreview, setOtherPreview] = useState(campaign.media_links);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [preparedBanner, setPreparedBanner] = useState<FileList | null>(null);
  const [preparedOtherImages, setPreparedOtherImages] =
    useState<FileList | null>(null);
  const [closeRef, triggerRef] = useRefs<HTMLButtonElement>(null);

  const { address } = useAccount();
  const { push } = useRouter();
  const { user } = userStore();
  const queryClient = useQueryClient();

  const isPreview = (url: string) => {
    return /\b(blob)\b/.test(url);
  };

  const {
    data: hash,
    error,
    isError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log('Settled updateCampaign', { data, error });
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID || mainnet.id,
      hash,
    });

  const uploadBanner = async () => {
    if (!preparedBanner) return [];
    await deleteFromCloudinary(campaign.banner_url);
    const bannerUploadUrl = await uploadToCloudinary(preparedBanner);

    return bannerUploadUrl;
  };

  const uploadOtherImages = async () => {
    if (!preparedOtherImages) return [];
    const otherImagesUrl = await uploadToCloudinary(preparedOtherImages);

    return otherImagesUrl;
  };

  const goalReached = () => {
    if (campaign.total_accrued >= campaign.goal) {
      return true;
    }
    return false;
  };

  const handlePreviewDelete = (item: string) => {
    if (isPreview(item)) {
      setOtherPreview((prev) => prev.filter((_) => _ !== item));
    } else {
      deleteFromCloudinary(item)
        .then(() => {
          toast.success('Image deleted');
          setOtherPreview((prev) => prev.filter((_) => _ !== item));
        })
        .catch(() => toast.error('Failed to delete image'));
    }
  };

  const formSchema = GET_EDIT_CAMPAIGN_FORM_SCHEMA(user?.isVerified);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      type: campaign.beneficiary === campaign.creator ? 'personal' : 'others',
      beneficiaryAddress: campaign.beneficiary,
      banner: campaign.banner_url,
      description: campaign.description,
      title: campaign.title,
      goal: parseFloat(formatEther(BigInt(campaign.goal))),
      tag: campaign.tag as CampaignTags,
      ytLink: campaign.youtube_link ?? undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isDirty },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setUpdating(true);
    try {
      const { goal, beneficiaryAddress, tag, title, description } = data;
      const { campaign_id } = campaign;
      const [bannerUrl] = await uploadBanner();
      const mediaLinks = await uploadOtherImages();

      const updatedTag = tags.find((item) => item.name === tag)?.id;
      if (typeof updatedTag === 'undefined') {
        return toast.error('Tag not found.');
      }

      const updatedHash = await handleIPFSPush({
        title,
        description,
        bannerUrl: bannerUrl || campaign.banner_url,
        youtubeLink: campaign.youtube_link || undefined,
        mediaLinks: mediaLinks || campaign.media_links,
        tag: updatedTag,
      });

      const newHash = updatedHash?.hash as `0x${string}`;

      if (!newHash) {
        return toast.error('Something went wrong.');
      }

      writeContract({
        abi: EthFundMe,
        address: ethFundMeContractAddress,
        functionName: 'updateCampaign',
        chainId: ethChainId,
        args: [
          newHash,
          BigInt(campaign_id),
          parseEther(goal.toString()),
          form.watch('type') === 'personal'
            ? campaign.creator
            : (beneficiaryAddress as `0x${string}`),
        ],
      });
      setUpdating(false);
    } catch (error) {
      setUpdating(false);
      console.error(error);
      toast.error('Failed to update campaign.');
      return;
    }
  };

  useEffect(() => {
    fetchCampaignTags().then((res) => {
      setTags(res);
    });
  }, []);

  useEffect(() => {
    if (isConfirmedTxn) {
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'unreadNotifications'],
      });
      toast.success('Campaign updated');
      push(`/campaigns/${campaign.campaign_id}`);
      return;
    }
  }, [campaign.campaign_id, isConfirmedTxn, push]);

  useEffect(() => {
    if (isError && error) {
      let errorMsg = (error as BaseError).shortMessage || error.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to update campaign';
      }

      toast.error(errorMsg);
    }
  }, [error, isError]);

  return (
    <div className='mb-8 rounded-md border border-neutral-300 py-8'>
      <div className='my-5 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-start'>
        <div className='mx-auto border-neutral-300 md:border-r lg:mx-0'>
          <div className='w-full sm:max-w-2xl'>
            <div className='w-full space-y-5  p-3 sm:gap-8 sm:p-5'>
              <h2 className='text-xl'>Banner</h2>

              <Image
                className='mx-auto h-[300px] w-auto object-contain'
                width={400}
                height={400}
                src={bannerPreview}
                alt='campaign-banner'
              />
              <div className='relative'>
                <Input
                  type='file'
                  onChange={(e) => {
                    if (!e.target.files) {
                      setPreparedBanner(null);
                      return;
                    }
                    setBannerPreview(createUrl(e.target.files[0]));
                    setPreparedBanner(e.target.files);
                  }}
                  accept='image/*'
                />

                {isPreview(bannerPreview) && (
                  <div className='pointer-events-none absolute bottom-0 top-0 w-full rounded-md border border-slate-300 bg-white p-1'>
                    <button
                      className='pointer-events-auto flex h-full w-full items-center justify-center gap-2 bg-neutral-100'
                      onClick={() => {
                        setBannerPreview(campaign.banner_url);
                        setPreparedBanner(null);
                      }}
                    >
                      <Trash size={16} />
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='mx-auto my-4 w-full space-y-5  p-3 sm:gap-8 sm:p-5'>
              <h2 className='text-xl'>Other Images</h2>

              <p className='text-sm text-slate-400'>
                {6 - otherPreview.length} remaining
              </p>
              {otherPreview.length > 0 && (
                <>
                  <ScrollArea className='max-h-40'>
                    <div className='grid grid-cols-3 gap-2'>
                      <AnimatePresence>
                        {otherPreview.map((item, idx) => (
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
                              className='h-20 w-full object-cover'
                              // src={createUrl(item as File)}
                              src={item}
                              width={300}
                              height={300}
                              alt='image-preview'
                            />

                            <Dialog>
                              <DialogTrigger
                                ref={triggerRef}
                                title='Remove image'
                                className='absolute left-0 top-0 grid h-full w-full cursor-pointer place-content-center bg-black/50 opacity-0 transition-all duration-150 ease-in-out hover:opacity-100'
                              >
                                <FaMinusCircle color='tomato' />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Sure to remove image?
                                  </DialogTitle>
                                </DialogHeader>

                                <div className='grid grid-cols-2 gap-4'>
                                  <Button
                                    variant='destructive'
                                    onClick={() => handlePreviewDelete(item)}
                                  >
                                    Delete
                                  </Button>
                                  <DialogClose ref={closeRef}>
                                    Close
                                  </DialogClose>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </>
              )}

              <div className='relative'>
                <Input
                  type='file'
                  multiple
                  max={6 - otherPreview.length}
                  onChange={(e) => {
                    const images: FileList | null = e.target.files;

                    const getFiles = () => {
                      if (images) {
                        return [
                          ...Array.from(images).map((_) => createUrl(_)),
                        ].slice(0, 6 - otherPreview.length);
                      } else {
                        return [];
                      }
                    };

                    const files = getFiles();

                    setOtherPreview((prev) => {
                      if (prev && prev.length > 6 && files && files.length) {
                        toast('Cannot upload more than 6 images');
                        return prev;
                      }
                      if (files && prev) return [...prev, ...files];
                      if (files && !prev) return files;
                      return prev;
                    });

                    setPreparedOtherImages(images);
                  }}
                  accept='image/*'
                />

                {otherPreview.some((_) => isPreview(_)) && (
                  <div className='pointer-events-none absolute bottom-0 top-0 grid w-full grid-cols-2 gap-1 rounded-md border border-slate-300 bg-white p-1'>
                    <button
                      disabled={6 - otherPreview.length === 0}
                      className='flex items-center justify-center gap-2 bg-neutral-100 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50'
                      onClick={(e) => {
                        if (6 - otherPreview.length === 0) {
                          e.stopPropagation();
                        }
                      }}
                    >
                      <ImagePlus size={16} /> Add image
                    </button>

                    <button
                      className='pointer-events-auto flex w-full items-center justify-center gap-2 bg-neutral-100'
                      onClick={() => setOtherPreview(campaign.media_links)}
                    >
                      <Trash size={16} />
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-2 row-start-1 w-full lg:col-start-2'>
          <Form {...form}>
            <form
              className='grid w-full grid-cols-2 gap-5 p-3 sm:max-w-2xl sm:gap-8 sm:p-5 md:pl-0'
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
                        disabled={goalReached()}
                        type='number'
                        step='any'
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
                          {tags.map((_, idx) => (
                            <SelectItem key={idx} value={_.name}>
                              {_.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='tag'
              />
              {form.watch('type') === 'others' &&
                campaign.beneficiary !== campaign.creator && (
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
                                  <TooltipTrigger className='hidden items-center gap-2 pb-2 md:flex'>
                                    <span>Creator fees (%)</span>
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

                              <Popover>
                                <PopoverTrigger className='flex items-center gap-2 pb-2 md:hidden'>
                                  <span>Creator fees (%)</span>
                                  <AiOutlineExclamationCircle />
                                </PopoverTrigger>
                                <PopoverContent>
                                  <p>
                                    Visit your{' '}
                                    <Link
                                      className='italic text-primary-default'
                                      href={`/dashboard/${address}/creator-fee`}
                                    >
                                      dashboard
                                    </Link>{' '}
                                    if you wish to change your creator fee
                                  </p>
                                </PopoverContent>
                              </Popover>
                            </>
                          </FormLabel>

                          <FormControl>
                            <Input
                              type='number'
                              step={0.00001}
                              disabled
                              value={user?.creatorFee}
                              // value={0.02}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
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
                      <Textarea
                        {...field}
                        placeholder='Enter campaign description'
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
                        <Input
                          {...field}
                          placeholder='Paste youtube video link'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name='ytLink'
                />
              </div>

              {/* <div className='flex flex-col gap-4 md:flex-row'>
                <div className='w-full'>
                  <Button
                    type='submit'
                    size='default'
                    className='disabled:pointer-events-auto disabled:cursor-not-allowed'
                    disabled={
                      !isDirty || isPending || isConfirmedTxn || updating
                    }
                  >
                    {isPending || isConfirmingTxn || updating
                      ? 'Loading...'
                      : 'Update campaign'}
                  </Button>
                </div>
                <div className='w-full'>
                  <DiscontinueCampaignBtn campaign={campaign} />
                </div>
              </div> */}
            </form>
          </Form>
        </div>
      </div>
      <div className='flex flex-col gap-4 md:flex-row md:justify-center'>
        <div className='mx-auto flex w-full justify-center px-4 md:justify-end md:px-0'>
          <Button
            type='submit'
            size='default'
            className='w-[12.5rem] disabled:pointer-events-auto disabled:cursor-not-allowed md:w-96'
            disabled={!isDirty || isPending || isConfirmedTxn || updating}
          >
            {isPending || isConfirmingTxn || updating
              ? 'Loading...'
              : 'Update campaign'}
          </Button>
        </div>
        <div className='flex w-full justify-center px-4 md:justify-start md:px-0'>
          <DiscontinueCampaignBtn campaign={campaign} />
        </div>
      </div>
    </div>
  );
};
