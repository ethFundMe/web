'use client';

import { REGEX_CODES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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

const formSchema = z.object({
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
    .max(100, { message: 'Amount cannot be less than 0.0001 ETH' }),
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

export default function CreateCampaignForm() {
  const searchParams = useSearchParams();

  const [bannerPreview, setBannerPreview] = useState<null | string>(null);
  const [otherImgsPreview, setOtherImgsPreview] = useState<string[]>([]);

  const getCampaignType = () => {
    const _ = searchParams.get('campaign-type');
    return _ === 'personal' || _ === 'others' ? _ : undefined;
  };

  const campaignType = getCampaignType();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: campaignType,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({ data });
    toast.success('Campaign successfully created');
  }

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
                  <FormLabel>Creator fees (ETH)</FormLabel>
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

        <Button className='col-span-2'>Submit</Button>
      </form>
    </Form>
  );
}
