'use client';

import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { REGEX_CODES } from '@/lib/constants';
import { formatWalletAddress } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import * as z from 'zod';

const formSchema = z.object({
  fullname: z
    .string({ required_error: 'Fullname is required' })
    .min(2)
    .max(250),
  bannerUrl: z.string().optional(),
  profileUrl: z.string().optional(),
  eth_address: z.string().regex(REGEX_CODES.walletAddress).optional(),
});

export default function UpdateProfileForm() {
  const { address } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: 'John Doe',
      eth_address: formatWalletAddress(address as `0x${string}`),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  const [bannerPreview, setBannerPreview] = useState<string | undefined | null>(
    null
  );

  const [pfpPreview, setPfpPreview] = useState<string | undefined | null>(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full space-y-4 py-10 md:py-4'
      >
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='eth_address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder='Your wallet address' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your fullname' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='profileUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile picture</FormLabel>

                <AnimatePresence mode='wait'>
                  {pfpPreview && (
                    <motion.div
                      key={pfpPreview}
                      animate={{ scale: [0, 1], opacity: [0, 1] }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className='h-auto w-full bg-slate-400'
                    >
                      <Image
                        className='h-auto max-h-72 w-full object-cover'
                        src={pfpPreview}
                        width={400}
                        height={400}
                        alt='pfp-preview'
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <FormControl
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;

                    if (!files || !files.item(0)) {
                      setPfpPreview(null);
                      return;
                    }

                    const newUrl = URL.createObjectURL(files[0]);

                    if (newUrl !== bannerPreview) {
                      setPfpPreview(newUrl);
                    }
                  }}
                >
                  <Input
                    type='file'
                    accept='image/*'
                    multiple={false}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bannerUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>

                <AnimatePresence mode='wait'>
                  {bannerPreview && (
                    <motion.div
                      key={bannerPreview}
                      animate={{ scale: [0, 1], opacity: [0, 1] }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className='h-auto w-full bg-slate-400'
                    >
                      <Image
                        className='h-auto max-h-72 w-full object-cover'
                        src={bannerPreview}
                        width={400}
                        height={400}
                        alt='banner-preview'
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <FormControl
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;

                    if (!files || !files.item(0)) {
                      setBannerPreview(null);
                      return;
                    }

                    const newUrl = URL.createObjectURL(files[0]);

                    if (newUrl !== bannerPreview) {
                      setBannerPreview(newUrl);
                    }
                  }}
                >
                  <Input
                    type='file'
                    accept='image/*'
                    multiple={false}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className='mx-auto block w-full md:w-52'>Save</Button>
      </form>
    </Form>
  );
}
