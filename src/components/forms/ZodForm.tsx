'use client';

import { REGEX_CODES } from '@/lib/constants';
import { useCreateCampaign } from '@/lib/hook';
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

function getFormSchema(verifiedAddress: boolean = false) {
  return z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(5, { message: 'Campaign title must be more than 4 characters' }),
    type: z.enum(['personal', 'others'] as const, {
      required_error: 'Type is required',
    }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(11, { message: 'Description must be more than 10 characters' }),
    goal: z
      .number({ required_error: 'Enter amount in ETH' })
      .min(0.00001, { message: 'Amount cannot be less than 0.00001 ETH' })
      .max(verifiedAddress ? 100000 : 2, {
        message: verifiedAddress
          ? 'Enter an amount less than 1000000 ETH'
          : 'Verify your creator account to exceed 2ETH limit',
      }),
    beneficiaryAddress: z
      .string({
        required_error: 'Beneficiary address is required',
      })
      .regex(REGEX_CODES.walletAddress, {
        message: 'Enter a valid wallet address',
      })
      .optional(),
    creatorFee: z
      .number({ required_error: 'Enter amount in ETH' })
      .min(0.00001, { message: 'Amount cannot be less than 0.0001 ETH' })
      .max(2, { message: 'Amount cannot be more than 2 ETH' })
      .optional(),
    banner: z.string().optional(),
    otherImages: z.string().optional(),
    ytLink: z
      .string()
      .regex(REGEX_CODES.ytLink, { message: 'Enter a valid youtube link' })
      .optional(),
  });
}

export default function CreateCampaignForm() {
  const searchParams = useSearchParams();
  const { address } = useAccount();
  const router = useRouter();

  const [bannerPreview, setBannerPreview] = useState<null | string>(null);
  const [otherImgsPreview, setOtherImgsPreview] = useState<string[]>([]);

  const getCampaignType = () => {
    const _ = searchParams.get('campaign-type');
    return _ === 'personal' || _ === 'others' ? _ : undefined;
  };

  const campaignType = getCampaignType();
  const formSchema = getFormSchema(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: campaignType ?? 'personal',
      beneficiaryAddress: address,
    },
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
  const links = useDebounce(
    useWatch({ control: form.control, name: 'ytLink' }),
    500
  );

  const {
    isLoadingCreateCampaign,
    isLoadingCreateCampaignTxn,
    isCreateCampaignTxnSuccess,
    writeCreateCampaign,
  } = useCreateCampaign({
    beneficiary,
    description,
    goal,
    links: [links as string],
    title,
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = () => {
    if (!isAddress(String(beneficiary))) {
      return toast.error(`Address not valid ${beneficiary}`);
    }

    return writeCreateCampaign?.();
  };

  useEffect(() => {
    if (isCreateCampaignTxnSuccess) {
      toast.success('Campaign created.');
      form.reset();
      router.push('/campaigns');
      return;
    }
  }, [isCreateCampaignTxnSuccess, form, router]);

  // const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = () => {
  //   console.error(errors);
  // };

  // function onError(errors: z.infer<typeof formSchema>) {
  //   console.error(errors);
  // }

  function handleImageUpload(
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

    // if (type === 'banner') {
    //   setBannerPreview('banner');
    //   toast('Upoaded');
    // }
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FormLabel className='flex items-center gap-2'>
                          <span>Creator fees (ETH)</span>
                          <AiOutlineExclamationCircle />
                        </FormLabel>
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
          render={() => (
            <FormItem className=''>
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
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  multiple={false}
                  accept='image/*'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='otherImages'
          control={form.control}
          render={() => (
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
                  onChange={(e) => handleImageUpload(e, 'others')}
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
          disabled={isLoadingCreateCampaign || isLoadingCreateCampaignTxn}
          size='default'
          className='col-span-2'
        >
          {isLoadingCreateCampaign || isLoadingCreateCampaignTxn
            ? 'Loading...'
            : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
