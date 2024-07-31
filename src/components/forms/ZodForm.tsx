'use client';

import { handleIPFSPush } from '@/actions';
import { livepeer } from '@/app/campaigns/create/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES, TagsWithIds } from '@/lib/constants';
import { fetchCampaignTags } from '@/lib/queries';
import { CampaignTags } from '@/lib/types';
import {
  GET_CREATE_CAMPAIGN_FORM_SCHEMA,
  createUrl,
  uploadToCloudinary,
} from '@/lib/utils';
import { userStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';
import * as tus from 'tus-js-client';
import { isAddress, parseEther } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
  type BaseError,
} from 'wagmi';
import * as z from 'zod';
import { LinkPreview } from '../LinkPreview';
import { Button } from '../ui/button';
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

export default function CreateCampaignForm() {
  const searchParams = useSearchParams();
  const { address } = useAccount();
  const router = useRouter();
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  const { user } = userStore();

  const [bannerPreview, setBannerPreview] = useState<null | string>(null);
  const [imagesUploaded, setImagesUploaded] = useState<[string, string[]]>([
    '',
    [],
  ]);
  const [otherImgsPrepared, setOtherImgsPrepared] = useState<unknown[] | null>(
    null
  );
  const [eventCampaignId, setEventCampaignId] = useState<number>();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const getCampaignType = () => {
    const _ = searchParams.get('campaign-type');
    return _ === 'personal' || _ === 'others' ? _ : undefined;
  };

  const campaignType = getCampaignType();
  const formSchema = GET_CREATE_CAMPAIGN_FORM_SCHEMA(
    user ? user.isVerified : false
  );

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      type: campaignType ?? 'personal',
      beneficiaryAddress: address,
      banner: undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    data: hash,
    error,
    isError,
    isPending,
    // isSuccess,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log('Settled addCampaign', { data, error });
      },
    },
  });

  const queryClient = useQueryClient();

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  const SubmitStatusList = [
    'Uploading banner',
    'Uploading other images',
    'Creating campaign',
  ] as const;

  const [submitStatus, setSubmitStatus] = useState<
    (typeof SubmitStatusList)[number] | null
  >(null);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const {
      description,
      goal,
      title,
      banner,
      beneficiaryAddress,
      tag,
      ytLink,
      video_file,
    } = data;
    setSubmitStatus('Creating campaign');

    if (!isAddress(String(beneficiaryAddress))) {
      return toast.error(`Address not valid ${beneficiaryAddress}`);
    }

    let livepeerId: string;

    const files = video_file as FileList;
    if (files && files.length > 0) {
      const file = files[0];
      const videoFileName = file.name;

      const {
        tusEndpoint,
        asset: { playbackId },
      } = await livepeer(videoFileName);
      livepeerId = playbackId;

      const videoUpload = new tus.Upload(file, {
        endpoint: tusEndpoint,
        retryDelays: [0, 3000, 5000, 10000, 20000],

        onError: function (error) {
          console.log('Failed to upload video because: ' + error);
          return toast.error('Failed to upload video file.');
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + '%');
        },
        onSuccess: function () {
          console.log('Download %s from %s', videoUpload.file, videoUpload.url);
        },
      });

      videoUpload.start();
    }

    async function uploadBanner() {
      if (banner && !imagesUploaded[0]) {
        setSubmitStatus('Uploading banner');

        const bannerUploadUrl = await uploadToCloudinary(banner);

        if (bannerUploadUrl && bannerUploadUrl.length > 0) {
          setSubmitStatus(null);
          setImagesUploaded([bannerUploadUrl[0], imagesUploaded[1]]);
          // toast.success('Banner uploaded');
          return bannerUploadUrl;
        } else {
          setSubmitStatus(null);
          setImagesUploaded(['', imagesUploaded[1]]);
          throw new Error('Failed to upload banner');
        }
      }
      return [];
    }

    async function uploadOtherImages() {
      if (otherImgsPrepared && imagesUploaded[1].length === 0) {
        setSubmitStatus('Uploading other images');

        const OIUploadUrl = await uploadToCloudinary(
          otherImgsPrepared as unknown as FileList
        );

        if (OIUploadUrl && OIUploadUrl.length > 0) {
          setSubmitStatus(null);
          setImagesUploaded([imagesUploaded[0], OIUploadUrl]);
          // toast.success('Other images uploaded');
          return OIUploadUrl;
        } else {
          setSubmitStatus(null);
          toast.error('Failed to upload other images');
          setImagesUploaded([imagesUploaded[0], []]);
          throw new Error('Could not upload other images');
        }
      }
      return [];
    }

    async function handleMediaLinksUpload() {
      if (imagesUploaded[0] && imagesUploaded[1].length > 0) {
        return [imagesUploaded[0], ...imagesUploaded[1]];
      }
      if (imagesUploaded[0]) {
        return [imagesUploaded[0]];
      }

      const bannerUploaded = await uploadBanner();
      const otherImagesUploaded = await uploadOtherImages();

      return bannerUploaded.length > 0 &&
        otherImgsPrepared &&
        otherImgsPrepared.length > 0
        ? [...bannerUploaded, ...otherImagesUploaded]
        : bannerUploaded.length > 0
        ? bannerUploaded
        : [];
    }

    await handleMediaLinksUpload()
      .then((uploaded) => {
        setSubmitStatus(null);
        if (uploaded.length > 0) {
          setSubmitStatus('Creating campaign');

          const filterTag = tags.filter((_) => _.name === tag)[0];
          const preparedTag = TagsWithIds.filter(
            (i) => i.name === (filterTag.name || CampaignTags.Others)
          )[0].id;

          handleIPFSPush({
            title,
            description,
            youtubeLink: ytLink,
            bannerUrl: uploaded[0],
            mediaLinks: uploaded.filter((_, id) => id !== 0),
            tag: preparedTag,
            livepeerId,
          })
            .then((res) => {
              if (!res?.hash) throw new Error();
              const metadata_hash = res?.hash as `0x${string}`;
              writeContract({
                abi: EthFundMe,
                address: ethFundMeContractAddress,
                functionName: 'addCampaign',
                args: [
                  metadata_hash,
                  parseEther(String(goal)),
                  beneficiaryAddress as `0x${string}`,
                ],
                chainId: ethChainId,
              });
            })
            .catch(() => {
              toast.error('Failed to create campaign');
              setSubmitStatus(null);
            });
        }
      })
      .catch((e) => {
        setSubmitStatus(null);
        toast.error(e);
        toast.error('Failed to create campaign');
      });
  };

  useEffect(() => {
    if (isConfirmedTxn) {
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'unreadNotifications'],
      });
      toast.success('Campaign created.');
      setSubmitStatus(null);
      form.reset();
      router.refresh();
      if (eventCampaignId) {
        router.push(`/campaigns/${eventCampaignId}`);
      } else if (address) {
        router.push(`/dashboard/${address}`);
      } else {
        router.push('/campaigns');
      }
      return;
    }
  }, [isConfirmedTxn, router, form, eventCampaignId, address]);

  useEffect(() => {
    if (isError || error) {
      let errorMsg =
        (error as BaseError).shortMessage || (error as BaseError).message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to create campaign';
      }

      toast.error(errorMsg);
      setSubmitStatus(null);
    }
  }, [error, isError]);

  useEffect(() => {
    fetchCampaignTags().then((res) => {
      setTags(res);
    });
  }, []);

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
    if (address) {
      return form.setValue('beneficiaryAddress', address);
    }
  }, [address, form]);

  const validateFormData = () => {
    const { errors } = form.formState;
    if (Object.keys(errors).length > 0) {
      const currentError = Object.values(errors)[0];
      if (currentError) {
        toast.error(currentError?.message?.toString() || '', {
          position: 'top-right',
        });
      }
    }
  };

  useWatchContractEvent({
    abi: EthFundMe,
    address: ethFundMeContractAddress,
    eventName: 'CampaignCreated',
    onLogs(logs) {
      const campaignId = logs[0].args.campaign?.id.toString();
      if (campaignId) {
        setEventCampaignId(Number(campaignId));
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto mt-5 grid grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'
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
                  step={0.01}
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
                <Select onValueChange={field.onChange}>
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
                          <TooltipTrigger className='hidden items-center gap-2 pb-2 md:flex'>
                            <span>Creator fees (%)</span>
                            <AiOutlineExclamationCircle />
                          </TooltipTrigger>
                          <TooltipContent>
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
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Popover>
                        <PopoverTrigger
                          className='flex items-center gap-2 pb-2 md:hidden'
                          type='button'
                        >
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
                      step={0.1}
                      disabled
                      value={user?.creatorFee}
                      // value={0.02}
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
                              src={createUrl(item as File)}
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

          <div className='text-xs text-slate-500 dark:text-slate-400'>OR</div>

          <FormField
            name='video_file'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload video (Livepeer)</FormLabel>

                {videoPreview && (
                  <div>
                    <video width='320' height='240' controls src={videoPreview}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                <FormControl>
                  <Input
                    type='file'
                    accept='video/*'
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        if (file && file.type.slice(0, 5) === 'video') {
                          setVideoPreview(URL.createObjectURL(file));
                        }
                      } else {
                        setVideoPreview(null);
                      }
                      field.onChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          onClick={() => {
            validateFormData();
          }}
          disabled={
            submitStatus !== null || isPending || isConfirmingTxn || !address
          }
          size='default'
          className='col-span-2 disabled:pointer-events-auto disabled:cursor-not-allowed'
        >
          {isPending || isConfirmingTxn
            ? 'Creating campaign'
            : submitStatus ?? 'Create campaign'}
        </Button>
      </form>
    </Form>
  );
}
