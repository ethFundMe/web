'use client';

import { REGEX_CODES } from '@/lib/constants';
import { useCreateCampaign } from '@/lib/hook';
import { CampaignTags } from '@/lib/types';
import {
  GET_CREATE_CAMPAIGN_FORM_SCHEMA,
  uploadToCloudinary,
} from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';
import { useDebounce } from 'usehooks-ts';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';
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

  const [bannerPreview, setBannerPreview] = useState<null | string>(null);
  const [imagesUploaded, setImagesUploaded] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const [otherImgsPrepared, setOtherImgsPrepared] = useState<unknown[] | null>(
    null
  );

  const getCampaignType = () => {
    const _ = searchParams.get('campaign-type');
    return _ === 'personal' || _ === 'others' ? _ : undefined;
  };

  const campaignType = getCampaignType();
  const formSchema = GET_CREATE_CAMPAIGN_FORM_SCHEMA(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      type: campaignType ?? 'personal',
      beneficiaryAddress: address,
      banner: undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const beneficiary = useDebounce(
    useWatch({
      control: form.control,
      name: 'beneficiaryAddress',
      defaultValue: address,
    }) as `0x${string}`,
    500
  );
  const description = useDebounce(
    useWatch({ control: form.control, name: 'description' }),
    500
  );
  const goal = useDebounce(
    useWatch({ control: form.control, name: 'goal', defaultValue: 0 }),
    500
  );
  const title = useDebounce(
    useWatch({ control: form.control, name: 'title' }),
    500
  );
  // const tag = useDebounce(
  //   useWatch({ control: form.control, name: 'tag' }),
  //   500
  // );

  const ytLink = useDebounce(
    useWatch({ control: form.control, name: 'ytLink' }),
    500
  );

  const mediaLinks = ytLink
    ? [...uploadedImageUrls, ytLink]
    : uploadedImageUrls;

  const {
    isLoadingCreateCampaign,
    isLoadingCreateCampaignTxn,
    isCreateCampaignTxnSuccess,
    isCreateCampaignError,
    writeCreateCampaign,
  } = useCreateCampaign({
    title,
    description,
    beneficiary,
    goal,
    mediaLinks,
  });

  const SubmitStatusList = [
    'Uploading banner',
    'Uploading other images',
    'Creating campaign',
  ] as const;

  const [submitStatus, setSubmitStatus] = useState<
    (typeof SubmitStatusList)[number] | null
  >(null);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    if (!isAddress(String(beneficiary))) {
      return toast.error(`Address not valid ${beneficiary}`);
    }

    if (isLoadingCreateCampaign || isLoadingCreateCampaignTxn) return;

    async function uploadBanner() {
      if (data.banner && !imagesUploaded[0]) {
        setSubmitStatus('Uploading banner');

        const bannerUploadUrl = await uploadToCloudinary(data.banner);

        if (bannerUploadUrl) {
          setSubmitStatus(null);
          setImagesUploaded([true, imagesUploaded[1]]);
          setUploadedImageUrls([...bannerUploadUrl, ...uploadedImageUrls]);
          toast.success('Banner uploaded');
          return true;
        } else {
          setSubmitStatus(null);
          setImagesUploaded([false, imagesUploaded[1]]);
          throw new Error('Failed to upload banner');
        }
      }
      return false;
    }

    async function uploadOtherImages() {
      if (otherImgsPrepared && !imagesUploaded[1]) {
        setSubmitStatus('Uploading other images');

        const OIUploadUrl = await uploadToCloudinary(
          otherImgsPrepared as unknown as FileList
        );

        if (OIUploadUrl) {
          setSubmitStatus(null);
          setImagesUploaded([imagesUploaded[0], true]);
          setUploadedImageUrls([
            ...uploadedImageUrls,
            ...(OIUploadUrl as string[]),
          ]);
          toast.success('Other images uploaded');
          return true;
        } else {
          setSubmitStatus(null);
          toast.error('Failed to upload other images');
          setImagesUploaded([imagesUploaded[0], false]);
          throw new Error('Could not upload other images');
        }
      }
      return false;
    }

    async function handleMediaLinksUpload() {
      const bannerUploaded = await uploadBanner();
      const otherImagesUploaded = await uploadOtherImages();
      return otherImgsPrepared
        ? bannerUploaded && otherImagesUploaded
        : bannerUploaded;
    }

    handleMediaLinksUpload()
      .then((uploaded) => {
        setSubmitStatus(null);
        if (uploaded) {
          setSubmitStatus('Creating campaign');
          writeCreateCampaign?.();
        }
      })
      .catch((e) => toast.error(e));
  };

  useEffect(() => {
    if (isCreateCampaignTxnSuccess) {
      toast.success('Campaign created.');
      setSubmitStatus(null);
      form.reset();
      setUploadedImageUrls([]);
      router.push('/campaigns');
      return;
    }
    if (isCreateCampaignError) {
      toast.error('Failed to create campaign.');
      setSubmitStatus(null);

      return;
    }
  }, [isCreateCampaignTxnSuccess, isCreateCampaignError, form, router]);

  // const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = () => {
  //   console.error(errors);
  // };

  // function onError(errors: z.infer<typeof formSchema>) {
  //   console.error(errors);
  // }

  const createUrl = (file: File) => {
    const newURL = URL.createObjectURL(file);
    return newURL;
  };

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
                  step={0.00001}
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
        </div>

        <Button
          type='submit'
          disabled={
            submitStatus !== null ||
            isLoadingCreateCampaign ||
            isLoadingCreateCampaignTxn
          }
          size='default'
          className='col-span-2 disabled:cursor-not-allowed'
        >
          {isLoadingCreateCampaign || isLoadingCreateCampaignTxn
            ? 'Creating campaign'
            : submitStatus ?? 'Create'}
        </Button>
      </form>
    </Form>
  );
}
