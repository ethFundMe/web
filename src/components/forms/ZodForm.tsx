'use client';

import { REGEX_CODES } from '@/lib/constants';
import { useCreateCampaign } from '@/lib/hook';
import { CampaignTags } from '@/lib/types';
import {
  GET_CREATE_CAMPAIGN_FORM_SCHEMA,
  uploadToCloudinary,
} from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
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
  const [otherImgsPreview, setOtherImgsPreview] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<
    null | 'error' | 'Uploading images' | 'Creating campaign'
  >(null);

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

  const mediaLinks = [
    ...uploadedImageUrls,
    useDebounce(
      useWatch({ control: form.control, name: 'ytLink' }),
      500
    ) as string,
  ];

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

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    if (!isAddress(String(beneficiary))) {
      return toast.error(`Address not valid ${beneficiary}`);
    }
    if (isLoadingCreateCampaign || isLoadingCreateCampaignTxn) return;

    async function handleMediaLinksUpload() {
      if (
        isLoadingCreateCampaign ||
        isLoadingCreateCampaignTxn ||
        uploadedImageUrls.length < 1
      ) {
        return;
      }
      if (data.banner) {
        uploadToCloudinary(data.banner)
          .then((res) => {
            setUploadedImageUrls((prev) => [...(res as string[]), ...prev]);
          })
          .then(() => {
            toast.success('Banner uploaded');
            setImagesUploaded([true, imagesUploaded[1]]);
          })
          .catch((e) => {
            toast.error(e.message);
            setFormStatus(null);
            setImagesUploaded([false, imagesUploaded[1]]);
            throw new Error('Could not upload banner');
          });
      }
      if (data.otherImages) {
        uploadToCloudinary(data.otherImages)
          .then((res) => {
            setUploadedImageUrls((prev) => [...prev, ...(res as string[])]);
          })
          .then(() => {
            setImagesUploaded([imagesUploaded[0], true]);
            toast.success('Other images uploaded');
          })
          .catch((e) => {
            toast.error(e.message);
            setFormStatus(null);
            setImagesUploaded([imagesUploaded[0], false]);
            throw new Error('Could not upload other images');
          });
      }
    }

    // setFormStatus('Uploading images');
    handleMediaLinksUpload()
      .then(() => {
        setUploadedImageUrls([]);
        setFormStatus(null);
        if (uploadedImageUrls.length > 1) {
          setFormStatus('Creating campaign');
          writeCreateCampaign?.();
        }
      })
      .then(() => {
        setFormStatus(null);
      });
  };

  useEffect(() => {
    if (isCreateCampaignTxnSuccess) {
      toast.success('Campaign created.');
      form.reset();
      router.push('/campaigns');
      setUploadedImageUrls([]);
      return;
    }
    if (isCreateCampaignError) {
      toast.error('Failed to create campaign.');
      setFormStatus(null);
      return;
    }
  }, [isCreateCampaignTxnSuccess, isCreateCampaignError, form, router]);

  // const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = () => {
  //   console.error(errors);
  // };

  // function onError(errors: z.infer<typeof formSchema>) {
  //   console.error(errors);
  // }

  function showImagePreview(
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'banner' | 'others'
  ) {
    const data = e.target.files;

    const createUrl = (file: File) => {
      const newURL = URL.createObjectURL(file);
      return newURL;
    };

    const handleBannerUpload = () => {
      if (data && data[0]) {
        setBannerPreview(createUrl(data[0]));
      } else {
        setBannerPreview(null);
      }
    };

    const handleOtherImgsUpload = () => {
      setOtherImgsPreview([]);

      if (data && data.length > 0) {
        Array.from(data).forEach((file) => {
          setOtherImgsPreview((prev) => [...prev, createUrl(file)]);
        });
      } else {
        setOtherImgsPreview([]);
      }
    };

    if (type === 'banner') {
      handleBannerUpload();
    } else {
      handleOtherImgsUpload();
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

                {/* <Input type='file' accept='image/*' {...fileRef} /> */}
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

              {otherImgsPreview.length > 0 && (
                <ScrollArea className='max-h-40'>
                  <div className='grid grid-cols-3 gap-2'>
                    {otherImgsPreview.map((item, idx) => (
                      <Image
                        key={idx}
                        className='h-16 w-full object-cover lg:h-20'
                        src={item}
                        width={300}
                        height={300}
                        alt='image-preview'
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}

              <FormControl>
                <Input
                  type='file'
                  onChange={(e) => {
                    showImagePreview(e, 'others');
                    field.onChange(e.target.files);
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
            isLoadingCreateCampaign ||
            isLoadingCreateCampaignTxn ||
            formStatus === 'Uploading images'
          }
          size='default'
          className='col-span-2 disabled:cursor-not-allowed'
        >
          {isLoadingCreateCampaign || isLoadingCreateCampaignTxn
            ? 'Creating campaign'
            : formStatus ?? 'Create'}
        </Button>
      </form>
    </Form>
  );
}
